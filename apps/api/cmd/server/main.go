package main

import (
	"fmt"
	"log"
	"log/slog"
	"os"
	"time"

	"ajambeh-api/internal/middleware"
	categoryRepo "ajambeh-api/internal/category/repository"
	conditionRepo "ajambeh-api/internal/condition/repository"
	lookupHandler "ajambeh-api/internal/lookup/delivery/http"
	lookupUsecase "ajambeh-api/internal/lookup/usecase"
	productHandler "ajambeh-api/internal/product/delivery/http"
	productRepo "ajambeh-api/internal/product/repository"
	productUsecase "ajambeh-api/internal/product/usecase"
	"ajambeh-api/pkg/config"
	"ajambeh-api/pkg/database"
	"ajambeh-api/pkg/storage"

	"github.com/gin-gonic/gin"
)

func main() {
	// 0. Setup structured logger (text format to stdout)
	logger := slog.New(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
		Level: slog.LevelDebug,
	}))
	slog.SetDefault(logger)

	slog.Info("=== Ajambeh API starting ===")

	// 1. Load Configuration
	cfg := config.LoadConfig()
	slog.Info("Config loaded",
		"app_port", cfg.AppPort,
		"db_host", cfg.DBHost,
		"db_port", cfg.DBPort,
		"db_name", cfg.DBName,
		"db_user", cfg.DBUser,
	)

	// 2. Setup Database Connection
	slog.Info("Connecting to database...",
		"host", cfg.DBHost,
		"port", cfg.DBPort,
		"name", cfg.DBName,
	)
	dbConn := database.NewPostgresConnection(cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPassword, cfg.DBName)
	defer dbConn.Close()
	slog.Info("Database connected successfully")

	// 3. Setup Supabase Storage
	slog.Info("Initializing Supabase storage", "url", cfg.SupabaseURL)
	supabaseStorage := storage.NewSupabaseStorage(cfg.SupabaseURL, cfg.SupabaseServiceKey)
	slog.Info("Supabase storage initialized")

	// 4. Setup Gin Router
	router := gin.Default()

	// 4a. CORS — must come before any route or middleware
	router.Use(middleware.CORSMiddleware(cfg.AllowedOrigins))

	// 5. Setup Layers
	timeoutContext := time.Duration(10) * time.Second

	// Category
	catRepo := categoryRepo.NewPostgresCategoryRepository(dbConn)
	catUsecase := lookupUsecase.NewCategoryUsecase(catRepo, timeoutContext)

	// Condition
	condRepo := conditionRepo.NewPostgresConditionRepository(dbConn)
	condUsecase := lookupUsecase.NewConditionUsecase(condRepo, timeoutContext)

	// Product
	prodRepo := productRepo.NewPostgresProductRepository(dbConn)
	prodUsecase := productUsecase.NewProductUsecase(prodRepo, timeoutContext)

	// 6. Setup Router Groups & Middleware
	public := router.Group("/api/v1")

	protected := router.Group("/api/v1")
	protected.Use(middleware.StackAuthMiddleware(cfg.StackProjectID))

	// 7. Register HTTP Handlers
	lookupHandler.NewLookupHandler(public, catUsecase, condUsecase)
	productHandler.NewProductHandler(public, protected, prodUsecase, prodRepo, supabaseStorage)

	// 8. Start Server
	bindAddress := fmt.Sprintf(":%s", cfg.AppPort)
	slog.Info("Server listening", "address", bindAddress)
	log.Printf("Starting Server at %s\n", bindAddress)
	router.Run(bindAddress)
}
