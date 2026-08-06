"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { ArrowLeft, UserPlus, Mail, Lock, User, Building2, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().email("Must be a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  clinicName: z.string().min(2, "Clinic name must be at least 2 characters"),
  qualifications: z.string().min(2, "Qualifications must be at least 2 characters")
});
function AddDoctorPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      clinicName: "",
      qualifications: ""
    }
  });
  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const response = await apiFetch(`/api/auth/add-doctor`, {
        method: "POST",
        body: JSON.stringify(values)
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Failed to add doctor");
        return;
      }
      toast.success(data.message || "Doctor added successfully!");
      router.push("/admin/doctors");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  return <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/doctors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Add New Doctor</h2>
          <p className="text-muted-foreground">Register a new doctor for the SaaS platform.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Doctor Registration</CardTitle>
          <CardDescription>
            An email with the manually provided password will be sent automatically to the provided address.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
    control={form.control}
    name="name"
    render={({ field }) => <FormItem>
                    <FormLabel>Doctor's Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Dr. John Doe" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>}
  />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
    control={form.control}
    name="clinicName"
    render={({ field }) => <FormItem>
                      <FormLabel>Clinic Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="City Clinic" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>}
  />

                <FormField
    control={form.control}
    name="qualifications"
    render={({ field }) => <FormItem>
                      <FormLabel>Qualifications</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input placeholder="M.B.B.S, MD" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>}
  />
              </div>
              <FormField
    control={form.control}
    name="username"
    render={({ field }) => <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="doctor@example.com" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The doctor will use this email to log in and receive their OTPs.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>}
  />
              
              <FormField
    control={form.control}
    name="password"
    render={({ field }) => <FormItem>
                    <FormLabel>Temporary Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Enter a secure temporary password" type="text" className="pl-10" {...field} />
                      </div>
                    </FormControl>
                    <FormDescription>
                      The doctor will use this password to log in initially.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>}
  />
              
              <div className="pt-4 flex justify-end">
                <Button type="button" variant="outline" className="mr-4" onClick={() => router.back()} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="mr-2 h-4 w-4" />
                  {isLoading ? "Registering..." : "Register Doctor"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>;
}
export {
  AddDoctorPage as default
};
