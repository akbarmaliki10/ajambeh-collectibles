package domain

import (
	"context"
	"time"

	"github.com/google/uuid"
)

// Condition represents a card condition grade (e.g. Mint, Near Mint)
type Condition struct {
	ID           uuid.UUID `json:"id"`
	Name         string    `json:"name"`
	Abbreviation string    `json:"abbreviation"`
	SortOrder    int       `json:"sort_order"`
	CreatedAt    time.Time `json:"created_at"`
}

// ConditionRepository defines the data access contract for conditions
type ConditionRepository interface {
	FetchAll(ctx context.Context) ([]Condition, error)
}

// ConditionUsecase defines the business logic contract for conditions
type ConditionUsecase interface {
	FetchAll(ctx context.Context) ([]Condition, error)
}
