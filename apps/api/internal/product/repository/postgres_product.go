package repository

import (
	"context"
	"database/sql"
	"fmt"
	"strings"
	"time"

	"ajambeh-api/internal/domain"

	"github.com/google/uuid"
)

type postgresProductRepository struct {
	Conn *sql.DB
}

// NewPostgresProductRepository creates a new product repository
func NewPostgresProductRepository(conn *sql.DB) domain.ProductRepository {
	return &postgresProductRepository{Conn: conn}
}

// ──────────────────────────────────────────────
// READ
// ──────────────────────────────────────────────

func (m *postgresProductRepository) Fetch(ctx context.Context, cursor string, num int64) ([]domain.Product, string, error) {
	var args []interface{}
	query := `
		SELECT p.id, p.name, p.description, p.condition_id, p.sku, p.price, p.is_published,
		       p.collection, p.rarity, p.card_type, p.graded_data, p.created_at, p.updated_at,
		       c.id, c.name, c.abbreviation, c.sort_order,
		       COALESCE(ps.quantity, 0)
		FROM products p
		JOIN conditions c ON p.condition_id = c.id
		LEFT JOIN product_stock ps ON ps.product_id = p.id`

	if cursor != "" {
		parsedCursor, err := time.Parse(time.RFC3339Nano, cursor)
		if err != nil {
			return nil, "", domain.ErrBadParamInput
		}
		args = append(args, parsedCursor)
		query += fmt.Sprintf(` WHERE p.created_at < $%d`, len(args))
	}

	args = append(args, num)
	query += fmt.Sprintf(` ORDER BY p.created_at DESC LIMIT $%d`, len(args))

	rows, err := m.Conn.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, "", err
	}
	defer rows.Close()

	var products []domain.Product
	for rows.Next() {
		var p domain.Product
		var cond domain.Condition
		err := rows.Scan(
			&p.ID, &p.Name, &p.Description, &p.ConditionID, &p.SKU, &p.Price, &p.IsPublished,
			&p.Collection, &p.Rarity, &p.CardType, &p.GradedData, &p.CreatedAt, &p.UpdatedAt,
			&cond.ID, &cond.Name, &cond.Abbreviation, &cond.SortOrder,
			&p.Stock,
		)
		if err != nil {
			return nil, "", err
		}
		p.Condition = &cond
		products = append(products, p)
	}
	if err := rows.Err(); err != nil {
		return nil, "", err
	}

	// Batch-load categories and images for all products
	if err := m.loadRelations(ctx, products); err != nil {
		return nil, "", err
	}

	// Build next cursor
	var nextCursor string
	if len(products) == int(num) {
		nextCursor = products[len(products)-1].CreatedAt.Format(time.RFC3339Nano)
	}

	return products, nextCursor, nil
}

func (m *postgresProductRepository) GetByID(ctx context.Context, id uuid.UUID) (domain.Product, error) {
	query := `
		SELECT p.id, p.name, p.description, p.condition_id, p.sku, p.price, p.is_published,
		       p.collection, p.rarity, p.card_type, p.graded_data, p.created_at, p.updated_at,
		       c.id, c.name, c.abbreviation, c.sort_order,
		       COALESCE(ps.quantity, 0)
		FROM products p
		JOIN conditions c ON p.condition_id = c.id
		LEFT JOIN product_stock ps ON ps.product_id = p.id
		WHERE p.id = $1`

	var p domain.Product
	var cond domain.Condition
	err := m.Conn.QueryRowContext(ctx, query, id).Scan(
		&p.ID, &p.Name, &p.Description, &p.ConditionID, &p.SKU, &p.Price, &p.IsPublished,
		&p.Collection, &p.Rarity, &p.CardType, &p.GradedData, &p.CreatedAt, &p.UpdatedAt,
		&cond.ID, &cond.Name, &cond.Abbreviation, &cond.SortOrder,
		&p.Stock,
	)
	if err == sql.ErrNoRows {
		return domain.Product{}, domain.ErrNotFound
	}
	if err != nil {
		return domain.Product{}, err
	}
	p.Condition = &cond

	// Load categories
	cats, err := m.fetchCategoriesForProduct(ctx, p.ID)
	if err != nil {
		return domain.Product{}, err
	}
	p.Categories = cats

	// Load images
	imgs, err := m.fetchImagesForProduct(ctx, p.ID)
	if err != nil {
		return domain.Product{}, err
	}
	p.Images = imgs

	return p, nil
}

// ──────────────────────────────────────────────
// WRITE
// ──────────────────────────────────────────────

func (m *postgresProductRepository) Store(ctx context.Context, p *domain.Product) error {
	tx, err := m.Conn.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	// 1. Insert product
	_, err = tx.ExecContext(ctx, `
		INSERT INTO products (id, name, description, condition_id, sku, price, is_published,
		                      collection, rarity, card_type, graded_data, created_at, updated_at)
		VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
		p.ID, p.Name, p.Description, p.ConditionID, p.SKU, p.Price, p.IsPublished,
		p.Collection, p.Rarity, p.CardType, p.GradedData, p.CreatedAt, p.UpdatedAt,
	)
	if err != nil {
		return err
	}

	// 2. Insert product stock
	_, err = tx.ExecContext(ctx,
		`INSERT INTO product_stock (product_id, quantity) VALUES ($1, $2)`,
		p.ID, p.Stock,
	)
	if err != nil {
		return err
	}

	// 3. Insert initial stock movement
	if p.Stock > 0 {
		_, err = tx.ExecContext(ctx,
			`INSERT INTO stock_movements (product_id, change_amount, reason) VALUES ($1, $2, $3)`,
			p.ID, p.Stock, "initial_stock",
		)
		if err != nil {
			return err
		}
	}

	// 4. Insert product categories
	if err := insertCategories(ctx, tx, p.ID, p.CategoryIDs); err != nil {
		return err
	}

	return tx.Commit()
}

func (m *postgresProductRepository) Update(ctx context.Context, p *domain.Product) error {
	tx, err := m.Conn.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	// 1. Update product
	res, err := tx.ExecContext(ctx, `
		UPDATE products
		SET name=$2, description=$3, condition_id=$4, sku=$5, price=$6, is_published=$7,
		    collection=$8, rarity=$9, card_type=$10, graded_data=$11
		WHERE id = $1`,
		p.ID, p.Name, p.Description, p.ConditionID, p.SKU, p.Price, p.IsPublished,
		p.Collection, p.Rarity, p.CardType, p.GradedData,
	)
	if err != nil {
		return err
	}
	affected, _ := res.RowsAffected()
	if affected == 0 {
		return domain.ErrNotFound
	}

	// 2. Update stock
	_, err = tx.ExecContext(ctx,
		`UPDATE product_stock SET quantity = $2 WHERE product_id = $1`,
		p.ID, p.Stock,
	)
	if err != nil {
		return err
	}

	// 3. Insert initial stock movement
	if p.Stock > 0 {
		_, err = tx.ExecContext(ctx,
			`INSERT INTO stock_movements (product_id, change_amount, reason) VALUES ($1, $2, $3)`,
			p.ID, p.Stock, "update_stock",
		)
		if err != nil {
			return err
		}
	}

	// 4. Reconcile categories (delete + re-insert)
	_, err = tx.ExecContext(ctx,
		`DELETE FROM product_categories WHERE product_id = $1`, p.ID)
	if err != nil {
		return err
	}
	if err := insertCategories(ctx, tx, p.ID, p.CategoryIDs); err != nil {
		return err
	}

	return tx.Commit()
}

func (m *postgresProductRepository) Delete(ctx context.Context, id uuid.UUID) error {
	res, err := m.Conn.ExecContext(ctx, `DELETE FROM products WHERE id = $1`, id)
	if err != nil {
		return err
	}
	affected, _ := res.RowsAffected()
	if affected == 0 {
		return domain.ErrNotFound
	}
	return nil
}

// ──────────────────────────────────────────────
// IMAGES
// ──────────────────────────────────────────────

func (m *postgresProductRepository) StoreImage(ctx context.Context, img *domain.ProductImage) error {
	_, err := m.Conn.ExecContext(ctx, `
		INSERT INTO product_images (id, product_id, url, sort_order, is_primary, created_at)
		VALUES ($1, $2, $3, $4, $5, $6)`,
		img.ID, img.ProductID, img.URL, img.SortOrder, img.IsPrimary, img.CreatedAt,
	)
	return err
}

func (m *postgresProductRepository) DeleteImage(ctx context.Context, id uuid.UUID) error {
	_, err := m.Conn.ExecContext(ctx, `DELETE FROM product_images WHERE id = $1`, id)
	return err
}

// ──────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────

func insertCategories(ctx context.Context, tx *sql.Tx, productID uuid.UUID, categoryIDs []uuid.UUID) error {
	if len(categoryIDs) == 0 {
		return nil
	}
	var sb strings.Builder
	sb.WriteString(`INSERT INTO product_categories (product_id, category_id) VALUES `)
	args := []interface{}{productID}
	for i, catID := range categoryIDs {
		if i > 0 {
			sb.WriteString(", ")
		}
		args = append(args, catID)
		sb.WriteString(fmt.Sprintf("($1, $%d)", len(args)))
	}
	_, err := tx.ExecContext(ctx, sb.String(), args...)
	return err
}

func (m *postgresProductRepository) loadRelations(ctx context.Context, products []domain.Product) error {
	if len(products) == 0 {
		return nil
	}
	for i := range products {
		cats, err := m.fetchCategoriesForProduct(ctx, products[i].ID)
		if err != nil {
			return err
		}
		products[i].Categories = cats

		imgs, err := m.fetchImagesForProduct(ctx, products[i].ID)
		if err != nil {
			return err
		}
		products[i].Images = imgs
	}
	return nil
}

func (m *postgresProductRepository) fetchCategoriesForProduct(ctx context.Context, productID uuid.UUID) ([]domain.Category, error) {
	rows, err := m.Conn.QueryContext(ctx, `
		SELECT cat.id, cat.name, cat.slug, cat.created_at
		FROM product_categories pc
		JOIN categories cat ON pc.category_id = cat.id
		WHERE pc.product_id = $1
		ORDER BY cat.name`, productID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var cats []domain.Category
	for rows.Next() {
		var c domain.Category
		if err := rows.Scan(&c.ID, &c.Name, &c.Slug, &c.CreatedAt); err != nil {
			return nil, err
		}
		cats = append(cats, c)
	}
	if cats == nil {
		cats = []domain.Category{}
	}
	return cats, rows.Err()
}

func (m *postgresProductRepository) fetchImagesForProduct(ctx context.Context, productID uuid.UUID) ([]domain.ProductImage, error) {
	rows, err := m.Conn.QueryContext(ctx, `
		SELECT id, product_id, url, sort_order, is_primary, created_at
		FROM product_images
		WHERE product_id = $1
		ORDER BY sort_order`, productID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var imgs []domain.ProductImage
	for rows.Next() {
		var img domain.ProductImage
		if err := rows.Scan(&img.ID, &img.ProductID, &img.URL, &img.SortOrder, &img.IsPrimary, &img.CreatedAt); err != nil {
			return nil, err
		}
		imgs = append(imgs, img)
	}
	if imgs == nil {
		imgs = []domain.ProductImage{}
	}
	return imgs, rows.Err()
}
