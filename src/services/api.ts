const API_BASE_URL = import.meta.env.VITE_API_URL || `http://${window.location.hostname}:3001`;

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  let accessToken = localStorage.getItem('vibe_access_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // If 401 Unauthorized, attempt refresh token rotation once
  if (response.status === 401 && accessToken) {
    const refreshToken = localStorage.getItem('vibe_refresh_token');
    if (refreshToken) {
      try {
        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          localStorage.setItem('vibe_access_token', refreshData.accessToken);
          if (refreshData.refreshToken) {
            localStorage.setItem('vibe_refresh_token', refreshData.refreshToken);
          }

          // Retry original request with new token
          headers['Authorization'] = `Bearer ${refreshData.accessToken}`;
          response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
          });
        } else {
          // Token refresh failed, clear tokens
          localStorage.removeItem('vibe_access_token');
          localStorage.removeItem('vibe_refresh_token');
          localStorage.removeItem('vibe_user');
        }
      } catch (err) {
        console.error('Failed token refresh attempt', err);
      }
    }
  }

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = Array.isArray(errorData.message)
          ? errorData.message.join(', ')
          : errorData.message;
      }
    } catch (_) {}
    throw new Error(errorMessage);
  }

  return response.json();
}
