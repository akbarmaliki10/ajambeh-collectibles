package domain

import (
	"context"
	"time"

	"github.com/google/uuid"
)

// ProductImage represents an image attached to a product
type ProductImage struct {
	ID        uuid.UUID `json:"id"`
	ProductID uuid.UUID `json:"product_id"`
	URL       string    `json:"url"`
	SortOrder int       `json:"sort_order"`
	IsPrimary bool      `json:"is_primary"`
	CreatedAt time.Time `json:"created_at"`
}

// Product represents the core product entity
type Product struct {
	ID          uuid.UUID  `json:"id"`
	Name        string     `json:"name"`
	Description string     `json:"description"`
	ConditionID uuid.UUID  `json:"condition_id"`
	Condition   *Condition `json:"condition,omitempty"`
	SKU         string     `json:"sku"`
	Price       int64      `json:"price"`
	Stock       int        `json:"stock"`
	IsPublished bool       `json:"is_published"`

	// Optional card metadata (nullable)
	Collection *string `json:"collection"`
	Rarity     *string `json:"rarity"`
	CardType   *string `json:"card_type"`
	GradedData *string `json:"graded_data"`

	// Relational data
	CategoryIDs []uuid.UUID    `json:"category_ids,omitempty"`
	Categories  []Category     `json:"categories,omitempty"`
	Images      []ProductImage `json:"images"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// ProductRepository defines the data access contract for products
type ProductRepository interface {
	Fetch(ctx context.Context, cursor string, num int64) ([]Product, string, error)
	GetByID(ctx context.Context, id uuid.UUID) (Product, error)
	Store(ctx context.Context, p *Product) error
	Update(ctx context.Context, p *Product) error
	Delete(ctx context.Context, id uuid.UUID) error
	StoreImage(ctx context.Context, img *ProductImage) error
	DeleteImage(ctx context.Context, id uuid.UUID) error
}

// ProductUsecase defines the business logic contract for products
type ProductUsecase interface {
	Fetch(ctx context.Context, cursor string, num int64) ([]Product, string, error)
	GetByID(ctx context.Context, id uuid.UUID) (Product, error)
	Store(ctx context.Context, p *Product) error
	Update(ctx context.Context, p *Product) error
	Delete(ctx context.Context, id uuid.UUID) error
}
