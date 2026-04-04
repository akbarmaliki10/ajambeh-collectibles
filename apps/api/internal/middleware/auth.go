package middleware

import (
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"strings"

	"github.com/MicahParks/keyfunc/v3"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

// StackAuthMiddleware checks for a valid Bearer token from the frontend.
// It fetches the Stack Auth JWKS to verify the token signature and claims securely.
func StackAuthMiddleware(projectID string) gin.HandlerFunc {
	if projectID == "" {
		log.Fatal("STACK_PROJECT_ID is empty, cannot initialize JWT middleware")
	}

	jwksURL := fmt.Sprintf("https://api.stack-auth.com/api/v1/projects/%s/.well-known/jwks.json", projectID)

	// Fetch JWKS in the background with auto-refresh
	jwks, err := keyfunc.NewDefault([]string{jwksURL})
	if err != nil {
		log.Fatalf("Failed to create JWKS from resource at the given URL: %v", err)
	}

	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header required"})
			c.Abort()
			return
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization header format"})
			c.Abort()
			return
		}

		tokenString := parts[1]

		// Parse the JWT token using the JWKS for strict verification
		token, err := jwt.Parse(tokenString, jwks.Keyfunc)
		if err != nil {
			slog.Warn("JWT parse failed",
				"method", c.Request.Method,
				"path", c.Request.URL.Path,
				"error", err,
			)
			c.JSON(http.StatusUnauthorized, gin.H{"error": fmt.Sprintf("Invalid token: %v", err)})
			c.Abort()
			return
		}

		if !token.Valid {
			slog.Warn("JWT token marked invalid",
				"method", c.Request.Method,
				"path", c.Request.URL.Path,
			)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Token is invalid"})
			c.Abort()
			return
		}

		if claims, ok := token.Claims.(jwt.MapClaims); ok {
			// Ensure audience matches our project for security
			if aud, exists := claims["aud"]; exists {
				var audienceMatched bool
				
				switch audVal := aud.(type) {
				case string:
					audienceMatched = (audVal == projectID)
				case []interface{}:
					for _, a := range audVal {
						if aStr, ok := a.(string); ok && aStr == projectID {
							audienceMatched = true
							break
						}
					}
				}

				if !audienceMatched {
					slog.Warn("JWT audience mismatch",
						"method", c.Request.Method,
						"path", c.Request.URL.Path,
						"token_aud", aud,
						"expected_project_id", projectID,
					)
					c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid audience in token"})
					c.Abort()
					return
				}
			}

			// Stack Auth tokens usually contain "sub" as the user ID
			if sub, exists := claims["sub"]; exists {
				c.Set("userID", sub)
			}
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token claims"})
			c.Abort()
			return
		}

		c.Next()
	}
}
