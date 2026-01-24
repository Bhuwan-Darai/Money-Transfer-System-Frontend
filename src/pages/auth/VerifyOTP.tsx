import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";
import useAuthMutation from "@/hooks/auth/useAuth";
import { useOtpStore } from "@/store/otpStore";

export default function OTPVerification() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState<number>(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { VerifyOTP, VerifyOTPPending, resendOTP, resendOTPPending } =
    useAuthMutation();
  const email = useOtpStore((state) => state.email);

  useEffect(() => {
    let interval: number | null = null;
    if (timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval !== null) {
        window.clearInterval(interval);
      }
    };
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, idx) => {
      if (idx < 6) {
        newOtp[idx] = char;
      }
    });
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6 && email) {
      VerifyOTP({ email, otp: otpValue });
    }
  };

  const handleResend = () => {
    console.log("Resending OTP for email:", email);
    resendOTP({ email });
    setTimer(59);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center shadow-md">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              OTP Verification
            </CardTitle>
            <CardDescription className="mt-2 text-gray-600">
              One Time Password (OTP) has been sent via Email to{" "}
              <span className="font-semibold text-gray-800">
                rebecca@email.com
              </span>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Enter the OTP below to verify it
            </p>

            <div className="flex justify-center gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all"
                />
              ))}
            </div>

            <div className="text-center text-sm text-gray-600">
              Resend OTP in{" "}
              <span className="font-semibold text-indigo-600">
                00:{timer.toString().padStart(2, "0")}
              </span>
            </div>
          </div>

          <Button
            onClick={handleVerify}
            disabled={!isComplete || !email || VerifyOTPPending}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {VerifyOTPPending ? "Verifying..." : "Verify OTP"}
          </Button>

          {timer === 0 && (
            <button
              onClick={handleResend}
              className="w-full text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors"
            >
              Resend OTP
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
