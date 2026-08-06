"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { ShieldAlert } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  age: z.coerce.number().min(0, "Age must be valid").max(150, "Age must be valid"),
  sex: z.enum(["Male", "Female", "Other"]),
  mobile: z.string().regex(/^\d{10}$/, "Mobile must be a 10-digit number"),
  address: z.string().min(2, "Address is required"),
  // First visit details
  visitDate: z.string().optional(),
  complaint: z.string().optional(),
  advice: z.string().optional(),
  medicines: z.string().optional(),
  fee: z.coerce.number().min(0, "Fee cannot be negative"),
  amountPaid: z.coerce.number().min(0, "Amount paid cannot be negative")
});
function AddPatientPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 0,
      sex: "Male",
      mobile: "",
      address: "",
      visitDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      // YYYY-MM-DD
      complaint: "",
      advice: "",
      medicines: "",
      fee: 0,
      amountPaid: 0
    }
  });
  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const response = await apiFetch(`/api/patients`, {
        method: "POST",
        body: JSON.stringify({ ...values, doctorId: session?.user?.id })
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Failed to add patient");
        return;
      }
      toast.success("Patient and initial visit added successfully!");
      router.push(`/doctor/visits/${data.visitId}/print`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }
  if (session?.user?.permissions?.canAddPatients === false) {
    return <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <ShieldAlert className="h-16 w-16 text-red-500" />
        <h2 className="text-2xl font-bold">Access Denied</h2>
        <p className="text-muted-foreground text-center max-w-md">
          You do not have permission to add new patients. Please contact your administrator if you believe this is a mistake.
        </p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>;
  }
  return <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Patient</CardTitle>
          <CardDescription>
            Register a new patient and record their initial visit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium border-b pb-2">Patient Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
    control={form.control}
    name="name"
    render={({ field }) => <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>}
  />
                  <FormField
    control={form.control}
    name="mobile"
    render={({ field }) => <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input placeholder="10-digit number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>}
  />
                  <FormField
    control={form.control}
    name="age"
    render={({ field }) => <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>}
  />
                  <FormField
    control={form.control}
    name="sex"
    render={({ field }) => <FormItem>
                        <FormLabel>Sex</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select sex" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>}
  />
                  <FormField
    control={form.control}
    name="address"
    render={({ field }) => <FormItem className="md:col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Patient's address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>}
  />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium border-b pb-2">Initial Visit Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
    control={form.control}
    name="visitDate"
    render={({ field }) => <FormItem>
                        <FormLabel>Visit Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>}
  />
                  <FormField
    control={form.control}
    name="fee"
    render={({ field }) => <FormItem>
                        <FormLabel>Consultation Fee (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" list="fee-preset-options" {...field} />
                        </FormControl>
                        <datalist id="fee-preset-options">
                          <option value="100" />
                          <option value="150" />
                          <option value="200" />
                          <option value="250" />
                          <option value="300" />
                          <option value="350" />
                          <option value="400" />
                          <option value="450" />
                          <option value="500" />
                        </datalist>
                        <FormMessage />
                      </FormItem>}
  />
                  <FormField
    control={form.control}
    name="amountPaid"
    render={({ field }) => <FormItem>
                        <FormLabel>Amount Paid (₹)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>}
  />
                  <FormField
    control={form.control}
    name="complaint"
    render={({ field }) => <FormItem className="md:col-span-2">
                        <FormLabel>Complaint</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Chief complaints..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>}
  />
                  <FormField
    control={form.control}
    name="advice"
    render={({ field }) => <FormItem className="md:col-span-2">
                        <FormLabel>Advice</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Medical advice..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>}
  />
                  <FormField
    control={form.control}
    name="medicines"
    render={({ field }) => <FormItem className="md:col-span-2">
                        <FormLabel>Medicines</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Prescribed medicines..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>}
  />
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t">
                <Button type="button" variant="outline" className="mr-4" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Patient & Visit"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>;
}
export {
  AddPatientPage as default
};
