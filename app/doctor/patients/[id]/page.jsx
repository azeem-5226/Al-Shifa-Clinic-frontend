"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { Printer, Trash2, Stethoscope, Pill, ClipboardType, Wallet } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { apiFetch } from "@/lib/api";
const formSchema = z.object({
  visitDate: z.string(),
  complaint: z.string().optional(),
  advice: z.string().optional(),
  medicines: z.string().optional(),
  fee: z.coerce.number().min(0),
  amountPaid: z.coerce.number().min(0)
});
function PatientProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedVisitId, setExpandedVisitId] = useState(null);
  const { data: patient, isLoading: isPatientLoading } = useQuery({
    queryKey: ["patient", id],
    queryFn: async () => {
      const res = await apiFetch(`/api/patients/${id}`);
      if (!res.ok) throw new Error("Failed to load patient");
      return res.json();
    }
  });
  const { data: visits, isLoading: isVisitsLoading } = useQuery({
    queryKey: ["visits", id],
    queryFn: async () => {
      const res = await apiFetch(`/api/visits?patientId=${id}`);
      if (!res.ok) throw new Error("Failed to load visits");
      return res.json();
    }
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      visitDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      complaint: "",
      advice: "",
      medicines: "",
      fee: 0,
      amountPaid: 0
    }
  });
  async function onSubmit(values) {
    setIsSubmitting(true);
    try {
      const response = await apiFetch(`/api/visits`, {
        method: "POST",
        body: JSON.stringify({ ...values, patient: id, doctorId: session?.user?.id })
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Failed to add visit");
        return;
      }
      toast.success("Visit added successfully!");
      router.push(`/doctor/visits/${data.visitId}/print`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }
  async function handleDeleteVisit(visitId) {
    try {
      const res = await apiFetch(`/api/visits/${visitId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete visit");
      toast.success("Visit deleted");
      queryClient.invalidateQueries({ queryKey: ["visits", id] });
    } catch (error) {
      toast.error("Failed to delete visit");
    }
  }
  if (isPatientLoading) {
    return <div className="space-y-6"><Skeleton className="h-[200px] w-full" /><Skeleton className="h-[400px] w-full" /></div>;
  }
  if (!patient) {
    return <div>Patient not found.</div>;
  }
  return <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">{patient.name}</CardTitle>
            <CardDescription>{patient.age} Yrs • {patient.sex} • {patient.mobile}</CardDescription>
          </div>
          {
    /* We could add an Edit Patient button here later */
  }
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            <strong>Address: </strong>{patient.address}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {
    /* Visit History */
  }
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visit History</CardTitle>
            </CardHeader>
            <CardContent>
              {isVisitsLoading ? <Skeleton className="h-40 w-full" /> : visits?.length === 0 ? <div className="text-center text-muted-foreground py-8">No visits recorded yet.</div> : <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Complaint</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visits?.map((visit) => <React.Fragment key={visit._id}>
                        <TableRow
    className="cursor-pointer hover:bg-muted/50"
    onClick={() => setExpandedVisitId(expandedVisitId === visit._id ? null : visit._id)}
  >
                          <TableCell className="font-medium whitespace-nowrap">
                            {format(new Date(visit.visitDate), "dd MMM yyyy")}
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">{visit.complaint || "-"}</TableCell>
                          <TableCell>₹{visit.fee}</TableCell>
                          <TableCell className="text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/doctor/visits/${visit._id}/print`} title="Print Receipt">
                                <Printer className="h-4 w-4" />
                              </Link>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "text-red-500" })}>
                                  <Trash2 className="h-4 w-4" />
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Visit?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this visit? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteVisit(visit._id)} className="bg-red-500 hover:bg-red-600">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                        {expandedVisitId === visit._id && <TableRow className="bg-slate-50 dark:bg-slate-900/20 hover:bg-slate-50 dark:hover:bg-slate-900/20">
                            <TableCell colSpan={4} className="p-0 border-b-0">
                              <div className="p-4 mx-4 my-2 border border-border shadow-inner rounded-xl bg-muted/30">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-4">
                                    <div className="bg-background p-4 rounded-lg border shadow-sm">
                                      <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                                        <Stethoscope className="h-4 w-4" /> Complaint
                                      </h4>
                                      <p className="text-sm whitespace-pre-wrap text-foreground/90">{visit.complaint || "No complaint recorded."}</p>
                                    </div>
                                    <div className="bg-background p-4 rounded-lg border shadow-sm">
                                      <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                                        <Pill className="h-4 w-4" /> Medicines
                                      </h4>
                                      <p className="text-sm whitespace-pre-wrap text-foreground/90">{visit.medicines || "No medicines prescribed."}</p>
                                    </div>
                                  </div>
                                  <div className="space-y-4">
                                    <div className="bg-background p-4 rounded-lg border shadow-sm">
                                      <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                                        <ClipboardType className="h-4 w-4" /> Advice
                                      </h4>
                                      <p className="text-sm whitespace-pre-wrap text-foreground/90">{visit.advice || "No advice recorded."}</p>
                                    </div>
                                    <div className="bg-background p-4 rounded-lg border shadow-sm">
                                      <h4 className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-2 flex items-center gap-2">
                                        <Wallet className="h-4 w-4" /> Payment Details
                                      </h4>
                                      <div className="space-y-2 text-sm mt-3">
                                        <div className="flex justify-between items-center">
                                          <span className="text-muted-foreground">Consultation Fee:</span>
                                          <span className="font-medium">₹{visit.fee}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                          <span className="text-muted-foreground">Amount Paid:</span>
                                          <span className="font-medium">₹{visit.amountPaid ?? visit.fee}</span>
                                        </div>
                                        <div className="border-t pt-2 mt-2 flex justify-between items-center font-bold">
                                          <span>Balance Due:</span>
                                          {visit.fee - (visit.amountPaid ?? visit.fee) > 0 ? <span className="text-red-500 bg-red-100 dark:bg-red-500/10 px-2 py-0.5 rounded-md">
                                              ₹{visit.fee - (visit.amountPaid ?? visit.fee)}
                                            </span> : <span className="text-green-500 bg-green-100 dark:bg-green-500/10 px-2 py-0.5 rounded-md">
                                              Paid in Full
                                            </span>}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>}
                      </React.Fragment>)}
                  </TableBody>
                </Table>}
            </CardContent>
          </Card>
        </div>

        {
    /* Add New Visit Form */
  }
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add New Visit</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
    render={({ field }) => <FormItem>
                        <FormLabel>Complaint</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Patient's complaints..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>}
  />
                  <FormField
    control={form.control}
    name="advice"
    render={({ field }) => <FormItem>
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
    render={({ field }) => <FormItem>
                        <FormLabel>Medicines</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Prescribed medicines..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>}
  />
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Visit & Print"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
}
export {
  PatientProfilePage as default
};
