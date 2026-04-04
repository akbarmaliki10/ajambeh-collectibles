package domain

import (
	"context"
	"time"

	"github.com/google/uuid"
)

// Category represents a card category/type (e.g. Holo, VMAX, GX)
type Category struct {
	ID        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	Slug      string    `json:"slug"`
	CreatedAt time.Time `json:"created_at"`
}

// CategoryRepository defines the data access contract for categories
type CategoryRepository interface {
	FetchAll(ctx context.Context) ([]Category, error)
}

// CategoryUsecase defines the business logic contract for categories
type CategoryUsecase interface {
	FetchAll(ctx context.Context) ([]Category, error)
}
