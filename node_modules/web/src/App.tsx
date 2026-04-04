import { StackHandler, StackProvider, StackTheme } from "@stackframe/react";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useUser } from "@stackframe/react";
import { stackClientApp } from "./stack/client";
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminLayout from './components/AdminLayout';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminAddProductPage from './pages/AdminAddProductPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminEditProductPage from './pages/AdminEditProductPage';

// Handler for Stack Auth OAuth callbacks
function HandlerRoutes() {
  const location = useLocation();
  return (
    <StackHandler app={stackClientApp} location={location.pathname} fullPage />
  );
}

// Route guard: redirects unauthenticated users to /admin/login
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useUser();
  if (user === null) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}

function App() {
  return (
    <Suspense fallback={
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-on-surface-variant text-sm font-body animate-pulse">Loading...</div>
      </div>
    }>
      <BrowserRouter>
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <Routes>
              {/* Public Application Routes wrapped in MainLayout */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
              </Route>
              
              {/* Admin Dashboard Routes - Protected & wrapped in AdminLayout */}
              <Route element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/products" element={<AdminProductsPage />} />
                <Route path="/admin/product/add" element={<AdminAddProductPage />} />
                <Route path="/admin/product/edit/:id" element={<AdminEditProductPage />} />
              </Route>
              
              {/* Fullscreen Standalone Route(s) */}
              <Route path="/admin/login" element={<AdminLoginPage />} />

              {/* Stack Auth handler routes (needed for OAuth callbacks) */}
              <Route path="/handler/*" element={<HandlerRoutes />} />
            </Routes>
          </StackTheme>
        </StackProvider>
      </BrowserRouter>
    </Suspense>
  )
}

export default App;
