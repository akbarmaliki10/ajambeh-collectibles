package storage

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
)

// SupabaseStorage is a thin wrapper over the Supabase Storage REST API.
type SupabaseStorage struct {
	baseURL    string
	serviceKey string
	client     *http.Client
}

// NewSupabaseStorage creates a new Supabase Storage client.
func NewSupabaseStorage(baseURL, serviceKey string) *SupabaseStorage {
	return &SupabaseStorage{
		baseURL:    baseURL,
		serviceKey: serviceKey,
		client:     &http.Client{},
	}
}

// Upload uploads a file to a Supabase Storage bucket and returns the public URL.
func (s *SupabaseStorage) Upload(bucket, path, contentType string, data io.Reader) (string, error) {
	body, err := io.ReadAll(data)
	if err != nil {
		return "", fmt.Errorf("failed to read upload data: %w", err)
	}

	url := fmt.Sprintf("%s/storage/v1/object/%s/%s", s.baseURL, bucket, path)

	req, err := http.NewRequest("POST", url, bytes.NewReader(body))
	if err != nil {
		return "", fmt.Errorf("failed to create upload request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+s.serviceKey)
	req.Header.Set("Content-Type", contentType)
	req.Header.Set("x-upsert", "true")

	resp, err := s.client.Do(req)
	if err != nil {
		return "", fmt.Errorf("upload request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		respBody, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("supabase storage error (%d): %s", resp.StatusCode, string(respBody))
	}

	publicURL := fmt.Sprintf("%s/storage/v1/object/public/%s/%s", s.baseURL, bucket, path)
	return publicURL, nil
}

// Delete removes a file from a Supabase Storage bucket.
func (s *SupabaseStorage) Delete(bucket, path string) error {
	url := fmt.Sprintf("%s/storage/v1/object/%s/%s", s.baseURL, bucket, path)

	req, err := http.NewRequest("DELETE", url, nil)
	if err != nil {
		return fmt.Errorf("failed to create delete request: %w", err)
	}

	req.Header.Set("Authorization", "Bearer "+s.serviceKey)

	resp, err := s.client.Do(req)
	if err != nil {
		return fmt.Errorf("delete request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		respBody, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("supabase storage delete error (%d): %s", resp.StatusCode, string(respBody))
	}

	return nil
}
