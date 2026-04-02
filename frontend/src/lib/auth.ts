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
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  return parseJson(response) as Promise<{ message: string; user: AuthUser }>;
}

export async function loginWithEmail(payload: { email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  return parseJson(response) as Promise<{ message: string; user: AuthUser }>;
}

export async function fetchCurrentUser() {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    credentials: 'include',
  });

  return parseJson(response) as Promise<{ user: AuthUser }>;
}

export async function logoutUser() {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  return parseJson(response);
}

export async function updateProfile(payload: { name: string; email: string; bio: string }) {
  const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  return parseJson(response) as Promise<{ message: string; user: AuthUser }>;
}

export async function uploadAvatar(avatarDataUrl: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/profile/avatar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ avatarDataUrl }),
  });

  return parseJson(response) as Promise<{ message: string; user: AuthUser }>;
}

export async function removeAvatar() {
  const response = await fetch(`${API_BASE_URL}/api/auth/profile/avatar`, {
    method: 'DELETE',
    credentials: 'include',
  });

  return parseJson(response) as Promise<{ message: string; user: AuthUser }>;
}

export async function changePassword(payload: { currentPassword: string; newPassword: string }) {
  const response = await fetch(`${API_BASE_URL}/api/auth/profile/password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  return parseJson(response) as Promise<{ message: string; user: AuthUser }>;
}

export async function updateTwoFactor(enabled: boolean) {
  const response = await fetch(`${API_BASE_URL}/api/auth/profile/two-factor`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ enabled }),
  });

  return parseJson(response) as Promise<{ message: string; user: AuthUser }>;
}

export async function fetchActiveSessions() {
  const response = await fetch(`${API_BASE_URL}/api/auth/sessions`, {
    credentials: 'include',
  });

  return parseJson(response) as Promise<{ sessions: UserSession[] }>;
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
  const response = await fetch(`${API_BASE_URL}/api/uploads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  return parseJson(response) as Promise<{ message: string; upload: UploadActivityPayload & { id: string } }>;
}

export async function fetchUploadSessions() {
  const response = await fetch(`${API_BASE_URL}/api/uploads`, {
    credentials: 'include',
  });

  return parseJson(response) as Promise<{ uploads: Array<UploadActivityPayload & { id: string }> }>;
}

export function startGoogleLogin() {
  window.location.href = `${API_BASE_URL}/api/auth/google`;
}

export function startGitHubLogin() {
  window.location.href = `${API_BASE_URL}/api/auth/github`;
}
