package http

import (
	"net/http"

	"ajambeh-api/internal/domain"

	"github.com/gin-gonic/gin"
)

// LookupHandler serves category and condition lookup data
type LookupHandler struct {
	CategoryUC  domain.CategoryUsecase
	ConditionUC domain.ConditionUsecase
}

// NewLookupHandler registers lookup routes
func NewLookupHandler(public *gin.RouterGroup, catUC domain.CategoryUsecase, condUC domain.ConditionUsecase) {
	h := &LookupHandler{CategoryUC: catUC, ConditionUC: condUC}

	public.GET("/categories", h.FetchCategories)
	public.GET("/conditions", h.FetchConditions)
}

func (h *LookupHandler) FetchCategories(c *gin.Context) {
	categories, err := h.CategoryUC.FetchAll(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": categories})
}

func (h *LookupHandler) FetchConditions(c *gin.Context) {
	conditions, err := h.ConditionUC.FetchAll(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": conditions})
}
