package usecase

import (
	"context"
	"time"

	"ajambeh-api/internal/domain"

	"github.com/google/uuid"
)

type categoryUsecase struct {
	categoryRepo   domain.CategoryRepository
	contextTimeout time.Duration
}

// NewCategoryUsecase creates a new category usecase
func NewCategoryUsecase(r domain.CategoryRepository, timeout time.Duration) domain.CategoryUsecase {
	return &categoryUsecase{categoryRepo: r, contextTimeout: timeout}
}

func (u *categoryUsecase) FetchAll(c context.Context) ([]domain.Category, error) {
	ctx, cancel := context.WithTimeout(c, u.contextTimeout)
	defer cancel()
	return u.categoryRepo.FetchAll(ctx)
}

type conditionUsecase struct {
	conditionRepo  domain.ConditionRepository
	contextTimeout time.Duration
}

// NewConditionUsecase creates a new condition usecase
func NewConditionUsecase(r domain.ConditionRepository, timeout time.Duration) domain.ConditionUsecase {
	return &conditionUsecase{conditionRepo: r, contextTimeout: timeout}
}

func (u *conditionUsecase) FetchAll(c context.Context) ([]domain.Condition, error) {
	ctx, cancel := context.WithTimeout(c, u.contextTimeout)
	defer cancel()
	return u.conditionRepo.FetchAll(ctx)
}

// Compile-time interface checks
var _ domain.CategoryUsecase = (*categoryUsecase)(nil)
var _ domain.ConditionUsecase = (*conditionUsecase)(nil)
var _ = uuid.Nil // keep uuid import for consistency
