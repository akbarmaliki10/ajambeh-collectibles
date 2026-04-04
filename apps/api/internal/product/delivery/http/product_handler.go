package http

import (
	"fmt"
	"log/slog"
	"net/http"
	"path/filepath"
	"time"

	"ajambeh-api/internal/domain"
	"ajambeh-api/pkg/storage"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// ResponseError represent the response error struct
type ResponseError struct {
	Message string `json:"message"`
}

// ProductHandler represent the httphandler for product
type ProductHandler struct {
	PUsecase    domain.ProductUsecase
	PRepo       domain.ProductRepository
	Storage     *storage.SupabaseStorage
}

// NewProductHandler will initialize the products/ resources endpoint
func NewProductHandler(public *gin.RouterGroup, protected *gin.RouterGroup, us domain.ProductUsecase, repo domain.ProductRepository, stor *storage.SupabaseStorage) {
	handler := &ProductHandler{
		PUsecase: us,
		PRepo:    repo,
		Storage:  stor,
	}

	// Public routes
	public.GET("/products", handler.Fetch)
	public.GET("/products/:id", handler.GetByID)

	// Protected routes
	protected.POST("/products", handler.Store)
	protected.PUT("/products/:id", handler.Update)
	protected.DELETE("/products/:id", handler.Delete)
	protected.POST("/products/:id/images", handler.UploadImage)
	protected.DELETE("/products/:id/images/:imageId", handler.DeleteImage)
}

// Fetch will fetch products
func (p *ProductHandler) Fetch(c *gin.Context) {
	cursor := c.Query("cursor")

	listAr, nextCursor, err := p.PUsecase.Fetch(c.Request.Context(), cursor, 10)
	if err != nil {
		slog.Error("Fetch products failed",
			"method", c.Request.Method,
			"path", c.Request.URL.Path,
			"error", err,
		)
		c.JSON(http.StatusInternalServerError, ResponseError{Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data":        listAr,
		"next_cursor": nextCursor,
	})
}

// GetByID will get product by given id
func (p *ProductHandler) GetByID(c *gin.Context) {
	idParam := c.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		slog.Warn("GetByID: invalid UUID",
			"method", c.Request.Method,
			"path", c.Request.URL.Path,
			"id_param", idParam,
			"error", err,
		)
		c.JSON(http.StatusBadRequest, ResponseError{Message: domain.ErrBadParamInput.Error()})
		return
	}

	art, err := p.PUsecase.GetByID(c.Request.Context(), id)
	if err != nil {
		slog.Error("GetByID failed",
			"method", c.Request.Method,
			"path", c.Request.URL.Path,
			"product_id", id,
			"error", err,
		)
		c.JSON(http.StatusNotFound, ResponseError{Message: err.Error()})
		return
	}

	c.JSON(http.StatusOK, art)
}

// Store will store the product by given request body
func (p *ProductHandler) Store(c *gin.Context) {
	var product domain.Product
	err := c.Bind(&product)
	if err != nil {
		slog.Warn("Store: bind failed",
			"method", c.Request.Method,
			"path", c.Request.URL.Path,
			"error", err,
		)
		c.JSON(http.StatusUnprocessableEntity, ResponseError{Message: err.Error()})
		return
	}

	slog.Debug("Store: creating product",
		"name", product.Name,
		"sku", product.SKU,
		"condition_id", product.ConditionID,
		"category_ids", product.CategoryIDs,
		"price", product.Price,
		"stock", product.Stock,
	)

	err = p.PUsecase.Store(c.Request.Context(), &product)
	if err != nil {
		slog.Error("Store: usecase failed",
			"method", c.Request.Method,
			"path", c.Request.URL.Path,
			"product_name", product.Name,
			"error", err,
		)
		c.JSON(http.StatusInternalServerError, ResponseError{Message: err.Error()})
		return
	}

	slog.Info("Store: product created", "product_id", product.ID)

	// Re-fetch with all JOINs populated
	full, err := p.PUsecase.GetByID(c.Request.Context(), product.ID)
	if err != nil {
		slog.Warn("Store: re-fetch after create failed", "product_id", product.ID, "error", err)
		c.JSON(http.StatusCreated, product)
		return
	}
	c.JSON(http.StatusCreated, full)
}

// Update will update the product
func (p *ProductHandler) Update(c *gin.Context) {
	idParam := c.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		slog.Warn("Update: invalid UUID",
			"method", c.Request.Method,
			"path", c.Request.URL.Path,
			"id_param", idParam,
			"error", err,
		)
		c.JSON(http.StatusBadRequest, ResponseError{Message: domain.ErrBadParamInput.Error()})
		return
	}

	var product domain.Product
	err = c.Bind(&product)
	if err != nil {
		slog.Warn("Update: bind failed",
			"method", c.Request.Method,
			"path", c.Request.URL.Path,
			"product_id", id,
			"error", err,
		)
		c.JSON(http.StatusUnprocessableEntity, ResponseError{Message: err.Error()})
		return
	}

	product.ID = id
	err = p.PUsecase.Update(c.Request.Context(), &product)
	if err != nil {
		slog.Error("Update: usecase failed",
			"method", c.Request.Method,
			"path", c.Request.URL.Path,
			"product_id", id,
			"error", err,
		)
		c.JSON(http.StatusInternalServerError, ResponseError{Message: err.Error()})
		return
	}

	slog.Info("Update: product updated", "product_id", id)

	// Re-fetch with all JOINs populated
	full, err := p.PUsecase.GetByID(c.Request.Context(), id)
	if err != nil {
		slog.Warn("Update: re-fetch after update failed", "product_id", id, "error", err)
		c.JSON(http.StatusOK, product)
		return
	}
	c.JSON(http.StatusOK, full)
}

// Delete will delete product by given param
func (p *ProductHandler) Delete(c *gin.Context) {
	idParam := c.Param("id")
	id, err := uuid.Parse(idParam)
	if err != nil {
		slog.Warn("Delete: invalid UUID",
			"method", c.Request.Method,
			"path", c.Request.URL.Path,
			"id_param", idParam,
			"error", err,
		)
		c.JSON(http.StatusBadRequest, ResponseError{Message: domain.ErrBadParamInput.Error()})
		return
	}

	err = p.PUsecase.Delete(c.Request.Context(), id)
	if err != nil {
		slog.Error("Delete: usecase failed",
			"method", c.Request.Method,
			"path", c.Request.URL.Path,
			"product_id", id,
			"error", err,
		)
		c.JSON(http.StatusInternalServerError, ResponseError{Message: err.Error()})
		return
	}

	slog.Info("Delete: product deleted", "product_id", id)
	c.Status(http.StatusNoContent)
}

// UploadImage handles multipart image upload for a product
func (p *ProductHandler) UploadImage(c *gin.Context) {
	productIDParam := c.Param("id")
	productID, err := uuid.Parse(productIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, ResponseError{Message: domain.ErrBadParamInput.Error()})
		return
	}

	file, header, err := c.Request.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, ResponseError{Message: "image file is required"})
		return
	}
	defer file.Close()

	// Validate content type
	contentType := header.Header.Get("Content-Type")
	allowed := map[string]bool{
		"image/jpeg": true, "image/png": true,
		"image/webp": true, "image/avif": true,
	}
	if !allowed[contentType] {
		c.JSON(http.StatusBadRequest, ResponseError{Message: "only JPEG, PNG, WebP, and AVIF images are allowed"})
		return
	}

	// Generate unique path
	ext := filepath.Ext(header.Filename)
	storagePath := fmt.Sprintf("%s/%s%s", productID.String(), uuid.New().String(), ext)

	// Upload to Supabase Storage
	slog.Debug("UploadImage: uploading to storage",
		"product_id", productID,
		"storage_path", storagePath,
		"content_type", contentType,
	)
	publicURL, err := p.Storage.Upload("product-images", storagePath, contentType, file)
	if err != nil {
		slog.Error("UploadImage: storage upload failed",
			"product_id", productID,
			"storage_path", storagePath,
			"error", err,
		)
		c.JSON(http.StatusInternalServerError, ResponseError{Message: "failed to upload image: " + err.Error()})
		return
	}

	// Determine if this is the primary image (first image = primary)
	existing, _ := p.PUsecase.GetByID(c.Request.Context(), productID)
	isPrimary := len(existing.Images) == 0

	// Store image record in database
	img := &domain.ProductImage{
		ID:        uuid.New(),
		ProductID: productID,
		URL:       publicURL,
		SortOrder: len(existing.Images),
		IsPrimary: isPrimary,
		CreatedAt: time.Now(),
	}

	err = p.PRepo.StoreImage(c.Request.Context(), img)
	if err != nil {
		slog.Error("UploadImage: db store failed",
			"product_id", productID,
			"image_id", img.ID,
			"error", err,
		)
		c.JSON(http.StatusInternalServerError, ResponseError{Message: err.Error()})
		return
	}

	slog.Info("UploadImage: image stored", "image_id", img.ID, "product_id", productID, "is_primary", isPrimary)
	c.JSON(http.StatusCreated, img)
}

// DeleteImage handles deleting a product image
func (p *ProductHandler) DeleteImage(c *gin.Context) {
	imageIDParam := c.Param("imageId")
	imageID, err := uuid.Parse(imageIDParam)
	if err != nil {
		c.JSON(http.StatusBadRequest, ResponseError{Message: domain.ErrBadParamInput.Error()})
		return
	}

	err = p.PRepo.DeleteImage(c.Request.Context(), imageID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ResponseError{Message: err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
}
