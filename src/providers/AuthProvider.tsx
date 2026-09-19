"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthUser, UserRole, MOCK_USERS, getStoredUser, setStoredUser } from "@/lib/auth";

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    identifier: string,
    password?: string,
    rememberMe?: boolean
  ) => Promise<{ success: boolean; user?: AuthUser; error?: string }>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = getStoredUser();
    if (saved) {
      setUser(saved);
    }
    setIsLoading(false);
  }, []);

  const login = async (
    identifier: string,
    _password?: string,
    _rememberMe: boolean = true
  ): Promise<{ success: boolean; user?: AuthUser; error?: string }> => {
    // Artificial small delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 600));

    const trimmed = identifier.trim().toLowerCase();

    // Match admin demo
    if (
      trimmed === "admin@example.com" ||
      trimmed === "01700000001" ||
      trimmed === "admin"
    ) {
      const adminUser = MOCK_USERS[0];
      setUser(adminUser);
      setStoredUser(adminUser);
      return { success: true, user: adminUser };
    }

    // Match member demo
    if (
      trimmed === "member@example.com" ||
      trimmed === "01700000002" ||
      trimmed === "member"
    ) {
      const memberUser = MOCK_USERS[1];
      setUser(memberUser);
      setStoredUser(memberUser);
      return { success: true, user: memberUser };
    }

    // General fallback: if entered any valid email or phone, treat as member demo for convenience
    if (trimmed.includes("@") || trimmed.length >= 10) {
      const dynamicUser: AuthUser = {
        id: `user-${Date.now()}`,
        name: trimmed.includes("@") ? trimmed.split("@")[0] : "সম্মানিত সদস্য",
        email: trimmed.includes("@") ? trimmed : "member@example.com",
        phone: !trimmed.includes("@") ? trimmed : "01700000000",
        role: "member",
        memberId: "KCBYW-025",
        designation: "সাধারণ সদস্য",
      };
      setUser(dynamicUser);
      setStoredUser(dynamicUser);
      return { success: true, user: dynamicUser };
    }

    return {
      success: false,
      error: "সঠিক ইমেইল বা মোবাইল নম্বর দিন। ডেমো লগইনের জন্য নিচের বাটন ব্যবহার করুন।",
    };
  };

  const logout = () => {
    setUser(null);
    setStoredUser(null);
  };

  const switchRole = (role: UserRole) => {
    const target = MOCK_USERS.find((u) => u.role === role) || MOCK_USERS[0];
    setUser(target);
    setStoredUser(target);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
