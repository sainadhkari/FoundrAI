export interface FoundrUser {
  name: string;
  email: string;
  isAuthenticated: boolean;
  loginTime: number;
}

export function getUser(): FoundrUser | null {
  try {
    const raw = localStorage.getItem("foundrai_user");
    if (!raw) return null;
    const user = JSON.parse(raw);
    if (!user?.isAuthenticated) return null;
    return user;
  } catch {
    return null;
  }
}

export function login(name: string, email: string): FoundrUser {
  const user: FoundrUser = {
    name,
    email,
    isAuthenticated: true,
    loginTime: Date.now(),
  };
  localStorage.setItem("foundrai_user", JSON.stringify(user));
  return user;
}

export function logout(): void {
  localStorage.removeItem("foundrai_user");
}
