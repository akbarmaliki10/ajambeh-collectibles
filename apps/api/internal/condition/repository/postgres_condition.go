package repository

import (
	"context"
	"database/sql"

	"ajambeh-api/internal/domain"
)

type postgresConditionRepository struct {
	Conn *sql.DB
}

// NewPostgresConditionRepository creates a new condition repository
func NewPostgresConditionRepository(conn *sql.DB) domain.ConditionRepository {
	return &postgresConditionRepository{Conn: conn}
}

func (r *postgresConditionRepository) FetchAll(ctx context.Context) ([]domain.Condition, error) {
	query := `SELECT id, name, abbreviation, sort_order, created_at FROM conditions ORDER BY sort_order`

	rows, err := r.Conn.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var conditions []domain.Condition
	for rows.Next() {
		var c domain.Condition
		if err := rows.Scan(&c.ID, &c.Name, &c.Abbreviation, &c.SortOrder, &c.CreatedAt); err != nil {
			return nil, err
		}
		conditions = append(conditions, c)
	}

	return conditions, rows.Err()
}
