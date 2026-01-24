import { useMutation, useQuery } from "@tanstack/react-query";

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
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    password: string;
  }) => {
    const response = await api.post("/auth/admin/register", data);
    return response.data;
  },

  loginSuperAdmin: async (data: { email: string; password: string }) => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  login: async (data: { email: string; password: string }) => {
    console.log("data", data);
    const response = await api.post("/admin/login", data);
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

export interface UserResponse {
  user_id: string;
  email: string;
  role: UserRole;
  first_name?: string;
  last_name?: string;
}

interface LoginResponse {
  success: string;
  message: string;
  otp_sent: boolean;
}

export interface OTPResponse {
  success: boolean;
  token: string;
  user: UserResponse | null;
}

interface RegisterResponse {
  status: string;
  message: string;
}

export default function useAuthMutation() {
  //   const queryClient = useQueryClient();
  const { login } = useAuthStore();

  const navigate = useNavigate();

  // supeer Admin register
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
      if (data.status == "201") {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
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
          navigate("/dashboard");
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
    onSuccess: (data: OTPResponse) => {
      if (data.success) {
        login(data.user, data.token); // 🔥 STORE IN ZUSTAND
        if (data.user?.role === "bank_admin") {
          navigate("/admin/dashboard");
        } else if (data.user?.role === "client") {
          navigate("/client/dashboard");
        } else {
          navigate("/login");
        }

        toast.success("OTP verified successfully");
      }
    },
  });

  const { mutateAsync: resendOTP, isPending: resendOTPPending } = useMutation({
    mutationKey: ["auth", "resend-otp"],
    mutationFn: authApi.resendOtp,
  });

  // get users
  const { data: paginatedClients, isLoading: clientsLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.get("/admin/get-clients").then((res) => res.data),
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
    paginatedClients,
    clientsLoading,
  };
}
