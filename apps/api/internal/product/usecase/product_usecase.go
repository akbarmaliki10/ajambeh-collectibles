package usecase

import (
	"context"
	"time"

	"ajambeh-api/internal/domain"

	"github.com/google/uuid"
)

type productUsecase struct {
	productRepo    domain.ProductRepository
	contextTimeout time.Duration
}

// NewProductUsecase creates a new product usecase
func NewProductUsecase(p domain.ProductRepository, timeout time.Duration) domain.ProductUsecase {
	return &productUsecase{
		productRepo:    p,
		contextTimeout: timeout,
	}
}

func (pu *productUsecase) Fetch(c context.Context, cursor string, num int64) ([]domain.Product, string, error) {
	ctx, cancel := context.WithTimeout(c, pu.contextTimeout)
	defer cancel()
	return pu.productRepo.Fetch(ctx, cursor, num)
}

func (pu *productUsecase) GetByID(c context.Context, id uuid.UUID) (domain.Product, error) {
	ctx, cancel := context.WithTimeout(c, pu.contextTimeout)
	defer cancel()
	return pu.productRepo.GetByID(ctx, id)
}

func (pu *productUsecase) Store(c context.Context, m *domain.Product) error {
	ctx, cancel := context.WithTimeout(c, pu.contextTimeout)
	defer cancel()

	m.ID = uuid.New()
	now := time.Now()
	m.CreatedAt = now
	m.UpdatedAt = now

	return pu.productRepo.Store(ctx, m)
}

func (pu *productUsecase) Update(c context.Context, m *domain.Product) error {
	ctx, cancel := context.WithTimeout(c, pu.contextTimeout)
	defer cancel()

	m.UpdatedAt = time.Now()
	return pu.productRepo.Update(ctx, m)
}

func (pu *productUsecase) Delete(c context.Context, id uuid.UUID) error {
	ctx, cancel := context.WithTimeout(c, pu.contextTimeout)
	defer cancel()

	_, err := pu.productRepo.GetByID(ctx, id)
	if err != nil {
		return err
	}

	return pu.productRepo.Delete(ctx, id)
}
