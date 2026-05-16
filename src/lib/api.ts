const normalizedApiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export const apiUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!normalizedApiBase) return normalizedPath;
  if (normalizedApiBase.endsWith('/api') && normalizedPath.startsWith('/api/')) {
    return `${normalizedApiBase}${normalizedPath.slice(4)}`;
  }

  return `${normalizedApiBase}${normalizedPath}`;
};

export const apiFetch = (path: string, init?: RequestInit) => fetch(apiUrl(path), init);
