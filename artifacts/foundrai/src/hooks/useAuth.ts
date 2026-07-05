export interface FoundrUser {
  name: string;
  email: string;
  role: string;
  isAuthenticated: boolean;
  loginTime: number;
}

const DEMO_USERS = [
  { email: "founder@foundrai.ai", password: "FoundrAI@2026", name: "Founder", role: "Founder" },
  { email: "investor@foundrai.ai", password: "VC@FoundrAI2026", name: "Investor", role: "Investor" },
  { email: "admin@foundrai.ai", password: "Admin@FoundrAI2026", name: "Admin", role: "Admin" },
];

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

export function validateCredentials(email: string, password: string): FoundrUser | null {
  const match = DEMO_USERS.find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password
  );
  if (!match) return null;
  const user: FoundrUser = {
    name: match.name,
    email: match.email,
    role: match.role,
    isAuthenticated: true,
    loginTime: Date.now(),
  };
  localStorage.setItem("foundrai_user", JSON.stringify(user));
  return user;
}

export function getDemoAccounts() {
  return DEMO_USERS.map((u) => ({
    label: `${u.role} Access`,
    email: u.email,
    password: u.password,
    role: u.role,
  }));
}

export function logout(): void {
  localStorage.removeItem("foundrai_user");
}
