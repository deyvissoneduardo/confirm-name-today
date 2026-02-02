/**
 * API Client Base Configuration
 * Centralized HTTP client for API requests
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export type ApiError = {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
};

export class ApiClientError extends Error {
  status?: number;
  errors?: Record<string, string[]>;

  constructor(
    message: string,
    status?: number,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiClientError';
    this.status = status;
    this.errors = errors;
  }
}

type RequestOptions = RequestInit & {
  params?: Record<string, string | number | boolean>;
};

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    // Tratar erros específicos
    if (response.status === 401) {
      // Token expirado ou inválido
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    }

    const error: ApiError = isJson
      ? data
      : { message: data || response.statusText };
    error.status = response.status;
    throw new ApiClientError(error.message, error.status, error.errors);
  }

  return data as T;
}

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;

  // Build URL with query parameters
  // Remove leading slash from endpoint if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  // Normalize base URL
  const baseUrl = API_BASE_URL.endsWith('/')
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  // Construct full URL
  // If baseUrl is absolute (starts with http:// or https://), use it directly
  // Otherwise, it's a relative path and we need to prepend the origin in browser
  let fullUrl: string;
  if (baseUrl.startsWith('http://') || baseUrl.startsWith('https://')) {
    // Absolute URL
    fullUrl = `${baseUrl}/${cleanEndpoint}`;
  } else {
    // Relative URL - need origin in browser context
    if (typeof window !== 'undefined') {
      fullUrl = `${window.location.origin}${baseUrl}/${cleanEndpoint}`;
    } else {
      // Server-side: use baseUrl as-is (Next.js will handle it)
      fullUrl = `${baseUrl}/${cleanEndpoint}`;
    }
  }

  // Create URL object - ensure it's absolute
  let url: URL;
  try {
    url = new URL(fullUrl);
  } catch {
    // If URL construction fails, try with window.location.origin as base
    if (typeof window !== 'undefined') {
      url = new URL(fullUrl, window.location.origin);
    } else {
      // Fallback: construct manually
      url = new URL(`http://localhost${fullUrl}`);
    }
  }

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  // Default headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...fetchOptions.headers,
  };

  // Adicionar token ao header se disponível
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...fetchOptions,
    headers,
  };

  // Debug: log da requisição em desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('[API Client]', {
      method: config.method || 'GET',
      url: url.toString(),
      hasToken: !!token,
      body: config.body,
    });
  }

  try {
    const response = await fetch(url.toString(), config);

    // Debug: log da resposta em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.log('[API Response]', {
        url: url.toString(),
        status: response.status,
        ok: response.ok,
      });
    }

    return handleResponse<T>(response);
  } catch (error) {
    // Debug: log de erro em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.error('[API Error]', {
        url: url.toString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    if (error instanceof ApiClientError) {
      throw error;
    }
    throw new ApiClientError(
      error instanceof Error ? error.message : 'An unexpected error occurred'
    );
  }
}

// Convenience methods
export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),
  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  patch: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: 'DELETE' }),
};
