import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  // 1️⃣ Root route handling
  if (path === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/register" replace />;
    }

    return user?.role === "admin"
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/student/dashboard" replace />;
  }

  // 2️⃣ Not authenticated → block protected routes
  if (
    !isAuthenticated &&
    !path.startsWith("/auth")
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  // 3️⃣ Authenticated → block auth pages
  if (
    isAuthenticated &&
    path.startsWith("/auth")
  ) {
    return user?.role === "admin"
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/student/dashboard" replace />;
  }

  // 4️⃣ Admin-only routes protection
  if (
    isAuthenticated &&
    path.startsWith("/admin") &&
    user?.role !== "admin"
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 5️⃣ Student-only routes protection
  if (
    isAuthenticated &&
    path.startsWith("/student") &&
    user?.role !== "student"
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

export default CheckAuth;
