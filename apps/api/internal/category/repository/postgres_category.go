package repository

import (
	"context"
	"database/sql"

	"ajambeh-api/internal/domain"
)

type postgresCategoryRepository struct {
	Conn *sql.DB
}

// NewPostgresCategoryRepository creates a new category repository
func NewPostgresCategoryRepository(conn *sql.DB) domain.CategoryRepository {
	return &postgresCategoryRepository{Conn: conn}
}

func (r *postgresCategoryRepository) FetchAll(ctx context.Context) ([]domain.Category, error) {
	query := `SELECT id, name, slug, created_at FROM categories ORDER BY name`

	rows, err := r.Conn.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var categories []domain.Category
	for rows.Next() {
		var c domain.Category
		if err := rows.Scan(&c.ID, &c.Name, &c.Slug, &c.CreatedAt); err != nil {
			return nil, err
		}
		categories = append(categories, c)
	}

	return categories, rows.Err()
}
