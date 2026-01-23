import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import MainLayout from "./components/layout/MainLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "sonner";
import { LoginPage } from "./pages/auth/LoginPage";
import { SuperAdminLoginPage } from "./pages/auth/SuperAdminLoginPage";
import SuperAdminRegisterPage from "./pages/auth/SuperAdminRegisterPage";
import { SuperAdminDashboard } from "./pages/super-admin/SuperAdminDashboard";
import OTPVerification from "./pages/auth/VerifyOTP";
// import { DashboardLayout } from "./components/layout/DashboardLayout";

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
            <Route path="/super-admin" element={<SuperAdminDashboard />} />

            {/* <Route element={<DashboardLayout allowedRoles={["super_admin"]} />}>
              <Route path="/super-admin" element={<SuperAdminDashboard />} />
            </Route> */}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
