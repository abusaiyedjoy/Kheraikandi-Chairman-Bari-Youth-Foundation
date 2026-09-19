export type UserRole = "admin" | "member";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  memberId?: string;
  designation?: string;
}

export const MOCK_USERS: AuthUser[] = [
  {
    id: "user-admin-1",
    name: "মুহাম্মদ আবু সাঈদ",
    email: "admin@example.com",
    phone: "01700000001",
    role: "admin",
    memberId: "KCBYW-001",
    designation: "সভাপতি / অ্যাডমিন",
  },
  {
    id: "user-member-1",
    name: "মাহমুদুল হাসান রনি",
    email: "member@example.com",
    phone: "01700000002",
    role: "member",
    memberId: "KCBYW-002",
    designation: "সাধারণ সদস্য",
  },
];

const AUTH_STORAGE_KEY = "kcbyw_auth_user";

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser | null): void {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch {
    // ignore
  }
}
