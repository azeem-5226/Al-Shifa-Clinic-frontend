"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Stethoscope, ShieldCheck, Mail, Lock, KeyRound, Loader2, ArrowLeft, Eye, EyeOff } from "lucide-react";
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
  password: z.string().min(1, {
    message: "Password is required."
  }),
  otp: z.string().optional()
});
function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      otp: ""
    }
  });
  async function onSendOtp() {
    const { username, password } = form.getValues();
    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }
    setIsLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Invalid username or password");
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
  async function onSubmit(values) {
    if (step === 1) {
      await onSendOtp();
      return;
    }
    if (!values.otp) {
      toast.error("Please enter the OTP");
      return;
    }
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
        otp: values.otp
      });
      if (res?.error) {
        toast.error(res.error || "Invalid OTP");
      } else {
        router.push("/dashboard");
        router.refresh();
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
        {
    /* Background Layer */
  }
        <div className="absolute inset-0 bg-blue-900" />
        <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay transition-transform duration-1000 hover:scale-105"
    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551076805-e166946e0e15?q=80&w=2000&auto=format&fit=crop')" }}
  />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 via-transparent to-transparent" />

        {
    /* Top Content */
  }
        <div className="relative z-20 flex items-center text-3xl font-extrabold gap-3 tracking-tight">
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl text-white shadow-2xl border border-white/20">
            <Stethoscope className="h-8 w-8" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            ClinicOS
          </span>
        </div>

        {
    /* Bottom Content */
  }
        <div className="relative z-20 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm text-blue-100 text-sm font-medium mb-6">
            <ShieldCheck className="h-4 w-4" />
            Secure Healthcare Platform
          </div>
          <blockquote className="space-y-6">
            <p className="text-4xl font-semibold leading-tight text-white">
              Elevating patient care with modern, intelligent clinic management.
            </p>
            <footer className="pt-6 border-t border-white/20">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-lg font-bold shadow-lg border-2 border-white/20">
                  NA
                </div>
                <div>
                  <p className="text-xl font-bold text-white">Dr. Naeem Akhtar</p>
                  <p className="text-blue-200 font-medium tracking-wide text-sm mt-0.5">CHIEF PHYSICIAN</p>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>

      {
    /* Right Pane - Login Form */
  }
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="mx-auto w-full max-w-[420px]">
          {
    /* Mobile Header */
  }
          <div className="flex lg:hidden justify-center mb-8">
            <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-xl shadow-blue-600/20">
              <Stethoscope className="h-8 w-8" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 transition-all duration-300">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                ClinicOS
              </h1>
            </div>
            <div className="flex flex-col space-y-3 text-center mb-8">
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
                {step === 1 ? "Welcome back" : "Verify it's you"}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {step === 1 ? "Enter your email and password to securely sign in to your account." : "We've sent a secure 6-digit code to your email. Please enter it below."}
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
                    <FormField
    control={form.control}
    name="password"
    render={({ field }) => <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">Password</FormLabel>
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
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none"
    >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>}
  />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <input
    type="checkbox"
    id="remember"
    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 dark:border-slate-700 dark:bg-slate-900 dark:checked:bg-blue-600"
  />
                        <label
    htmlFor="remember"
    className="text-sm font-medium leading-none text-slate-600 dark:text-slate-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
                          Remember me
                        </label>
                      </div>
                      <Link
    href="/forgot-password"
    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
  >
                        Forgot password?
                      </Link>
                    </div>
                  </div>}

                {step === 2 && <div className="space-y-5 animate-in fade-in slide-in-from-right-8 duration-500">
                    <FormField
    control={form.control}
    name="otp"
    render={({ field }) => <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">One-Time Password</FormLabel>
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
                
                <div className="pt-2">
                  <Button
    type="submit"
    className="w-full h-12 text-base font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25 transition-all"
    disabled={isLoading}
  >
                    {isLoading ? <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Please wait...
                      </> : step === 1 ? "Secure Login" : "Verify & Enter"}
                  </Button>
                </div>

                {step === 2 && <Button
    type="button"
    variant="ghost"
    className="w-full h-11 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 mt-2"
    onClick={() => setStep(1)}
    disabled={isLoading}
  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to email entry
                  </Button>}
              </form>
            </Form>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 px-4">
            By signing in, you agree to our{" "}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline underline-offset-4 transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500 hover:underline underline-offset-4 transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>;
}
export {
  LoginPage as default
};
