import { stackClientApp } from '../stack/client';

// Base API functions for communicating with the Go backend

async function getAuthHeaders(): Promise<Record<string, string>> {
  try {
    const user = await stackClientApp.getUser();
    if (!user) return {};
    const { accessToken } = await user.getAuthJson();
    if (!accessToken) return {};
    return {
      'Authorization': `Bearer ${accessToken}`,
      'x-stack-access-token': accessToken,
    };
  } catch {
    return {};
  }
}

export async function apiFetch<T = unknown>(url: string, options: RequestInit = {}): Promise<T> {
  const authHeaders = await getAuthHeaders();
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...(options.headers as Record<string, string> || {}),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'Request failed');
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

export async function apiUpload<T = unknown>(url: string, formData: FormData): Promise<T> {
  const authHeaders = await getAuthHeaders();
  const response = await fetch(url, {
    method: 'POST',
    headers: authHeaders,
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'Upload failed');
  }

  return response.json();
}

// Types matching the Go domain model
export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Condition {
  id: string;
  name: string;
  abbreviation: string;
  sort_order: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  sort_order: number;
  is_primary: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  condition_id: string;
  condition?: Condition;
  sku: string;
  price: number;
  stock: number;
  is_published: boolean;
  collection?: string | null;
  rarity?: string | null;
  card_type?: string | null;
  graded_data?: string | null;
  category_ids?: string[];
  categories?: Category[];
  images: ProductImage[];
  created_at: string;
  updated_at: string;
}

// API functions
export const fetchCategories = () => apiFetch<{ data: Category[] }>('/api/v1/categories');
export const fetchConditions = () => apiFetch<{ data: Condition[] }>('/api/v1/conditions');
export const fetchProducts = (cursor?: string) =>
  apiFetch<{ data: Product[]; next_cursor: string }>(`/api/v1/products${cursor ? `?cursor=${cursor}` : ''}`);
export const fetchProduct = (id: string) => apiFetch<Product>(`/api/v1/products/${id}`);
export const createProduct = (data: Partial<Product>) =>
  apiFetch<Product>('/api/v1/products', { method: 'POST', body: JSON.stringify(data) });
export const updateProduct = (id: string, data: Partial<Product>) =>
  apiFetch<Product>(`/api/v1/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteProduct = (id: string) =>
  apiFetch(`/api/v1/products/${id}`, { method: 'DELETE' });
export const uploadProductImage = (productId: string, file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  return apiUpload<ProductImage>(`/api/v1/products/${productId}/images`, formData);
};
