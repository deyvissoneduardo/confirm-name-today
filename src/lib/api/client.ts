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
  const raw = await response.text();
  let data: unknown = raw;

  if (isJson && raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw;
    }
  }

  if (!response.ok) {
    if (response.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    }

    let message = response.statusText || 'Request failed';
    let errors: Record<string, string[]> | undefined;

    if (isJson && data && typeof data === 'object') {
      const maybeError = data as Partial<ApiError> & {
        error?: string;
        detail?: string;
      };
      message =
        maybeError.message || maybeError.error || maybeError.detail || message;
      errors = maybeError.errors;
    } else if (typeof data === 'string' && data.trim()) {
      message = data;
    }

    const error: ApiError = {
      message,
      errors,
    };
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

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  const baseUrl = API_BASE_URL.endsWith('/')
    ? API_BASE_URL.slice(0, -1)
    : API_BASE_URL;

  let fullUrl: string;
  if (baseUrl.startsWith('http://') || baseUrl.startsWith('https://')) {
    fullUrl = `${baseUrl}/${cleanEndpoint}`;
  } else {
    if (typeof window !== 'undefined') {
      fullUrl = `${window.location.origin}${baseUrl}/${cleanEndpoint}`;
    } else {
      fullUrl = `${baseUrl}/${cleanEndpoint}`;
    }
  }

  let url: URL;
  try {
    url = new URL(fullUrl);
  } catch {
    if (typeof window !== 'undefined') {
      url = new URL(fullUrl, window.location.origin);
    } else {
      url = new URL(`http://localhost${fullUrl}`);
    }
  }

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    ...fetchOptions,
    headers,
  };

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

    if (process.env.NODE_ENV === 'development') {
      console.log('[API Response]', {
        url: url.toString(),
        status: response.status,
        ok: response.ok,
      });
    }

    return handleResponse<T>(response);
  } catch (error) {
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
