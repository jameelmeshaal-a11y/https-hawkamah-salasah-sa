import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { lazy, Suspense, ReactNode } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ModuleItemPage from "./pages/ModuleItemPage";
import ModuleOverviewPage from "./pages/ModuleOverviewPage";
import LoginPage from "./pages/LoginPage";

const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const AdminUsersPage = lazy(() => import("./pages/AdminUsersPage"));
const AdminPermissionsPage = lazy(() => import("./pages/AdminPermissionsPage"));

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">جاري التحميل...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">جاري التحميل...</div>;
  if (user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-muted-foreground">جاري التحميل...</div>}>
    <Routes>
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute><AdminUsersPage /></ProtectedRoute>} />
      <Route path="/admin/permissions" element={<ProtectedRoute><AdminPermissionsPage /></ProtectedRoute>} />
      <Route path="/module/:moduleId" element={<ProtectedRoute><ModuleOverviewPage /></ProtectedRoute>} />
      <Route path="/module/:moduleId/:itemSlug" element={<ProtectedRoute><ModuleItemPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
