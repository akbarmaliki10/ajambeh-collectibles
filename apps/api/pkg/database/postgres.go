package database

import (
	"database/sql"
	"fmt"
	"log"

	"net/url"

	_ "github.com/jackc/pgx/v5/stdlib"
)

// NewPostgresConnection creates a new connection to PostgreSQL database
func NewPostgresConnection(host, port, user, password, dbname string) *sql.DB {
	u := &url.URL{
		Scheme:   "postgres",
		User:     url.UserPassword(user, password),
		Host:     fmt.Sprintf("%s:%s", host, port),
		Path:     dbname,
		RawQuery: "sslmode=disable",
	}
	dsn := u.String()

	db, err := sql.Open("pgx", dsn)
	if err != nil {
		log.Fatalf("Failed to open database: %v", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	return db
}
