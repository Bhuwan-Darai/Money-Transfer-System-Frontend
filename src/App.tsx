// import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import MainLayout from "./components/layout/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { LoginPage } from "./pages/auth/LoginPage";
import { SuperAdminLoginPage } from "./pages/auth/SuperAdminLoginPage";
import SuperAdminRegisterPage from "./pages/auth/SuperAdminRegisterPage";
import { SuperAdminDashboard } from "./pages/admin/SuperAdminDashboard";
import OTPVerification from "./pages/auth/VerifyOTP";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ClientDashboard } from "./pages/client/ClientDashboard";
import ManageUsers from "./pages/admin/MangeUser";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify-otp" element={<OTPVerification />} />

            <Route path="/login/superadmin" element={<SuperAdminLoginPage />} />
            <Route
              path="/register/superadmin"
              element={<SuperAdminRegisterPage />}
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
            {/* <Route path="/" element={<MainLayout />} /> */}
            {/* <Route path="/super-admin" element={<SuperAdminDashboard />} /> */}

            <Route element={<ProtectedRoute allowedRoles={["bank_admin"]} />}>
              <Route element={<DashboardLayout title="Bank Admin " />}>
                <Route
                  path="/admin/dashboard"
                  element={<SuperAdminDashboard />}
                />
                <Route path="/admin/users" element={<ManageUsers />} />
              </Route>
            </Route>
            <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
              <Route element={<DashboardLayout title="Client " />}>
                <Route path="/client/dashboard" element={<ClientDashboard />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
