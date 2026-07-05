import { Navigate } from "react-router-dom";
import { getUser } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = getUser();
  if (!user?.isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
}
