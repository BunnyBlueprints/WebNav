function getApiBaseUrl() {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (configuredUrl) {
    return configuredUrl;
  }

  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return 'http://localhost:4000';
}

const API_BASE_URL = getApiBaseUrl();

async function parseJson(response: Response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }

  return data;
}

async function requestJson(input: string, init?: RequestInit) {
  try {
    const response = await fetch(input, init);
    return parseJson(response);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        `Unable to reach the server at ${API_BASE_URL}. Check VITE_API_URL and make sure the backend is deployed with CORS enabled.`
      );
    }

    throw error;
  }
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  twoFactorEnabled?: boolean;
  providers?: {
    google?: boolean;
    github?: boolean;
    password?: boolean;
  };
  activeSessions?: UserSession[];
}

export interface UserSession {
  id: string;
  userAgent: string;
  ipAddress?: string;
  createdAt: string;
  lastSeenAt: string;
  current?: boolean;
}

export async function registerWithEmail(payload: {
  name: string;
  email: string;
  password: string;
}) {
  return requestJson(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  }) as Promise<{ message: string; user: AuthUser }>;
}

export async function loginWithEmail(payload: { email: string; password: string; remember: boolean }) {
  return requestJson(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  }) as Promise<{ message: string; user: AuthUser }>;
}

export async function fetchCurrentUser() {
  return requestJson(`${API_BASE_URL}/api/auth/me`, {
    credentials: 'include',
  }) as Promise<{ user: AuthUser }>;
}

export async function logoutUser() {
  return requestJson(`${API_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

export async function updateProfile(payload: { name: string; email: string; bio: string }) {
  return requestJson(`${API_BASE_URL}/api/auth/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  }) as Promise<{ message: string; user: AuthUser }>;
}

export async function uploadAvatar(avatarDataUrl: string) {
  return requestJson(`${API_BASE_URL}/api/auth/profile/avatar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ avatarDataUrl }),
  }) as Promise<{ message: string; user: AuthUser }>;
}

export async function removeAvatar() {
  return requestJson(`${API_BASE_URL}/api/auth/profile/avatar`, {
    method: 'DELETE',
    credentials: 'include',
  }) as Promise<{ message: string; user: AuthUser }>;
}

export async function changePassword(payload: { currentPassword: string; newPassword: string }) {
  return requestJson(`${API_BASE_URL}/api/auth/profile/password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  }) as Promise<{ message: string; user: AuthUser }>;
}

export async function updateTwoFactor(enabled: boolean) {
  return requestJson(`${API_BASE_URL}/api/auth/profile/two-factor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ enabled }),
  }) as Promise<{ message: string; user: AuthUser }>;
}

export async function fetchActiveSessions() {
  return requestJson(`${API_BASE_URL}/api/auth/sessions`, {
    credentials: 'include',
  }) as Promise<{ sessions: UserSession[] }>;
}

export interface UploadActivityPayload {
  title: string;
  fileName: string;
  fileSizeKb: number;
  uploadedAt: string;
  date: string;
  time: string;
  urlCount: number;
  status: 'COMPLETED' | 'IN PROGRESS' | 'ARCHIVED';
}

export async function createUploadSession(payload: UploadActivityPayload) {
  return requestJson(`${API_BASE_URL}/api/uploads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  }) as Promise<{ message: string; upload: UploadActivityPayload & { id: string } }>;
}

export async function fetchUploadSessions() {
  return requestJson(`${API_BASE_URL}/api/uploads`, {
    credentials: 'include',
  }) as Promise<{ uploads: Array<UploadActivityPayload & { id: string }> }>;
}

export function startGoogleLogin() {
  window.location.href = `${API_BASE_URL}/api/auth/google`;
}

export function startGitHubLogin() {
  window.location.href = `${API_BASE_URL}/api/auth/github`;
}
