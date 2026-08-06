"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Stethoscope, ShieldCheck, Mail, KeyRound, Lock, Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Email/Username must be at least 2 characters."
  }),
  otp: z.string().optional(),
  password: z.string().optional(),
  confirmPassword: z.string().optional()
}).refine((data) => {
  if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      otp: "",
      password: "",
      confirmPassword: ""
    }
  });
  async function onSendOtp() {
    const { username } = form.getValues();
    if (!username) {
      toast.error("Please enter your email address");
      return;
    }
    setIsLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === "production" ? "https://al-shifa-clinic-backend.onrender.com" : "http://localhost:5000");
      const res = await fetch(`${API_URL}/api/auth/forgot-password-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "An error occurred");
      } else {
        toast.success(data.message || "OTP sent successfully!");
        setStep(2);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  async function onVerifyOtp() {
    const { otp } = form.getValues();
    if (!otp || otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
    setStep(3);
  }
  async function onSubmit(values) {
    if (step === 1) {
      await onSendOtp();
      return;
    }
    if (step === 2) {
      await onVerifyOtp();
      return;
    }
    if (!values.password || values.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setIsLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === "production" ? "https://al-shifa-clinic-backend.onrender.com" : "http://localhost:5000");
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          otp: values.otp,
          newPassword: values.password
        })
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to reset password");
      } else {
        toast.success("Password reset successfully! You can now login.");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  return <div className="w-full min-h-screen grid lg:grid-cols-2 bg-slate-50 dark:bg-slate-950">
      {
    /* Left Pane - Branding & Visuals */
  }
      <div className="relative hidden lg:flex flex-col text-white p-12 overflow-hidden justify-between">
        <div className="absolute inset-0 bg-blue-900" />
        <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay transition-transform duration-1000 hover:scale-105"
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?q=80&w=2070&auto=format&fit=crop')" }}
  />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-transparent to-transparent" />

        <div className="relative z-20 flex items-center text-3xl font-extrabold gap-3 tracking-tight">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl text-white shadow-2xl border border-white/20">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="rounded" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            ClinicOS
          </span>
        </div>

        <div className="relative z-20 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm text-blue-100 text-sm font-medium mb-6">
            <ShieldCheck className="h-4 w-4" />
            Secure Account Recovery
          </div>
          <blockquote className="space-y-6">
            <p className="text-4xl font-semibold leading-tight text-white">
              We ensure your data is always safe and accessible when you need it.
            </p>
          </blockquote>
        </div>
      </div>

      {
    /* Right Pane - Form */
  }
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="mx-auto w-full max-w-[420px]">
          <div className="flex lg:hidden justify-center mb-8">
            <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-xl shadow-blue-600/20">
              <Image src="/logo.png" alt="Logo" width={32} height={32} className="rounded" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 transition-all duration-300">
            <div className="flex flex-col space-y-3 text-center mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {step === 1 ? "Forgot password" : step === 2 ? "Verify it's you" : "Set new password"}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {step === 1 ? "Enter your email address and we'll send you a recovery code." : step === 2 ? "We've sent a secure 6-digit code to your email." : "Please enter your new password below."}
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {step === 1 && <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <FormField
    control={form.control}
    name="username"
    render={({ field }) => <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Mail className="h-5 w-5" />
                              </div>
                              <Input
      placeholder="name@example.com"
      className="h-12 pl-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-blue-600"
      {...field}
    />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>}
  />
                  </div>}

                {step === 2 && <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
                    <FormField
    control={form.control}
    name="otp"
    render={({ field }) => <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">Recovery Code (OTP)</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                                <KeyRound className="h-5 w-5" />
                              </div>
                              <Input
      placeholder="000000"
      className="h-14 pl-10 text-xl tracking-widest text-center font-bold bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 rounded-xl focus-visible:ring-blue-600"
      maxLength={6}
      {...field}
    />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>}
  />
                  </div>}

                {step === 3 && <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
                    <FormField
    control={form.control}
    name="password"
    render={({ field }) => <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">New Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Lock className="h-5 w-5" />
                              </div>
                              <Input
      type={showPassword ? "text" : "password"}
      placeholder="••••••••"
      className="h-12 pl-10 pr-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-blue-600"
      {...field}
    />
                              <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
    >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>}
  />
                    <FormField
    control={form.control}
    name="confirmPassword"
    render={({ field }) => <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <Lock className="h-5 w-5" />
                              </div>
                              <Input
      type={showConfirmPassword ? "text" : "password"}
      placeholder="••••••••"
      className="h-12 pl-10 pr-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-blue-600"
      {...field}
    />
                              <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
    >
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>}
  />
                  </div>}
                
                <div className="pt-2">
                  <Button
    type="submit"
    className="w-full h-12 text-base font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 transition-all"
    disabled={isLoading}
  >
                    {isLoading ? <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Please wait...
                      </> : step === 1 ? "Send Recovery Code" : step === 2 ? "Verify Code" : "Reset Password"}
                  </Button>
                </div>

                <Button
    type="button"
    variant="ghost"
    className="w-full h-11 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mt-2"
    onClick={() => {
      if (step > 1) setStep((prev) => prev - 1);
      else router.push("/login");
    }}
    disabled={isLoading}
  >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {step > 1 ? "Back" : "Back to login"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>;
}
export {
  ForgotPasswordPage as default
};
