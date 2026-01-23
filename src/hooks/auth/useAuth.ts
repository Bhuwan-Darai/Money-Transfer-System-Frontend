import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";
import type { User, UserRole } from "@/types/types";
import { useNavigate } from "react-router-dom";

// interface RegisterSuperAdminData {
//   name: string;
//   email: string;
//   password: string;
// }

const authApi = {
  registerSuperAdmin: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await api.post("/api/admin/register", data);
    return response.data;
  },

  loginSuperAdmin: async (data: { email: string; password: string }) => {
    const response = await api.post("/api/admin/login", data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    console.log("data", data);
    const response = await api.post("/auth/login", data);
    console.log("response", response);
    return response.data;
  },

  resendOtp: async (data: { email: string }) => {
    console.log("data", data);
    const response = await api.post("/auth/resend-otp", data);
    console.log("response", response);
    return response.data;
  },

  verifyOtp: async (data: { email: string; otp: string }) => {
    console.log("data", data);
    const response = await api.post("/verify-otp", data);
    console.log("response", response);
    return response.data;
  },
};

interface LoginResponse {
  success: string;
  message: string;
  otp_sent: boolean;
}

interface RegisterResponse {
  id: string;
  email: string;
}

export default function useAuthMutation() {
  //   const queryClient = useQueryClient();
  // const { register } = useAuthStore();
  const navigate = useNavigate();

  // supear Admin register
  const {
    mutateAsync: superAdminRegister,
    isPending: superAdminRegisterPending,
  } = useMutation({
    mutationKey: ["auth", "register", "super_admin"],
    mutationFn: authApi.registerSuperAdmin,
    onSuccess: (data: RegisterResponse) => {
      // queryClient.invalidateQueries({
      //   queryKey: ["register"],
      // });
      if (data) {
        toast.success("register success");
      }
    },
  });

  // super admin login
  const { mutateAsync: superAdminLogin, isPending: superAdminLoginPending } =
    useMutation({
      mutationKey: ["auth", "login", "super_admin"],
      mutationFn: authApi.loginSuperAdmin,
      onSuccess: (data: LoginResponse) => {
        if (data.message && data.success) {
          // queryClient.invalidateQueries({
          //   queryKey: ["login"],
          // });
          // Map API user to User type, casting role to UserRole
          navigate("/verify-otp");
          // register(user, data.token); // ✅ save to store

          toast.success("login success");
        }
      },
    });

  // gym-admin,client and employee login
  const { mutateAsync: Login, isPending: LoginPending } = useMutation({
    mutationKey: ["auth", "login", "gym_admin", "client", "employee"],
    mutationFn: authApi.login,
    onSuccess: (data: LoginResponse) => {
      if (data.otp_sent) {
        navigate("/verify-otp");
        toast.success("OTP sent successfully");
      }
    },
  });

  // verify otp
  const { mutateAsync: VerifyOTP, isPending: VerifyOTPPending } = useMutation({
    mutationKey: ["auth", "verify-otp"],
    mutationFn: authApi.verifyOtp,
    onSuccess: (data: LoginResponse) => {
      if (data.success) {
        navigate("/dashboard");
        toast.success("OTP verified successfully");
      }
    },
  });

  const { mutateAsync: resendOTP, isPending: resendOTPPending } = useMutation({
    mutationKey: ["auth", "resend-otp"],
    mutationFn: authApi.resendOtp,
  });

  return {
    superAdminRegister,
    superAdminRegisterPending,
    superAdminLogin,
    superAdminLoginPending,
    Login,
    LoginPending,
    VerifyOTP,
    VerifyOTPPending,
    resendOTP,
    resendOTPPending,
  };
}
