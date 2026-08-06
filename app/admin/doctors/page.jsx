"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { UserPlus, Users, Trash2, ShieldAlert, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
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
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
function DoctorsPage() {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await apiFetch(`/api/users/doctors/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete doctor");
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Doctor deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: (error2) => {
      toast.error(error2.message || "Something went wrong");
    }
  });
  const updatePermissionsMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await apiFetch(`/api/users/doctors/${id}/permissions`, {
        method: "PUT",
        body: JSON.stringify(data)
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to update permissions");
      return resData;
    },
    onSuccess: () => {
      toast.success("Doctor permissions updated");
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
    onError: (error2) => {
      toast.error(error2.message || "Failed to update permissions");
    }
  });
  const { data: doctors, isLoading, error } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await apiFetch(`/api/users/doctors`);
      if (!res.ok) throw new Error("Failed to load doctors");
      return res.json();
    }
  });
  return <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-8 w-8 text-blue-600" />
            Manage Doctors
          </h2>
          <p className="text-muted-foreground mt-1">
            Super Admin dashboard to manage all registered doctors on the SaaS platform.
          </p>
        </div>
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/admin/doctors/add">
            <UserPlus className="mr-2 h-5 w-5" />
            Add Doctor
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registered Doctors</CardTitle>
          <CardDescription>All doctors currently active in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email (Username)</TableHead>
                <TableHead>Joined On</TableHead>
                <TableHead>Account Status</TableHead>
                <TableHead>Add Patient Perm.</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? Array.from({ length: 3 }).map((_, i) => <TableRow key={i}>
                    <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-md" /></TableCell>
                  </TableRow>) : error ? <TableRow>
                  <TableCell colSpan={5} className="text-center text-red-500 h-24">
                    Failed to load doctors. Ensure you have Super Admin privileges.
                  </TableCell>
                </TableRow> : doctors?.length === 0 ? <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                    No doctors found.
                  </TableCell>
                </TableRow> : doctors?.map((doctor) => <TableRow key={doctor._id}>
                    <TableCell className="font-medium">{doctor.username}</TableCell>
                    <TableCell>{format(new Date(doctor.createdAt), "dd MMM yyyy")}</TableCell>
                    
                    <TableCell>
                      <button
    onClick={() => updatePermissionsMutation.mutate({
      id: doctor._id,
      data: { isActive: !doctor.isActive }
    })}
    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${doctor.isActive ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"}`}
  >
                        {doctor.isActive ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {doctor.isActive ? "Active" : "Disabled"}
                      </button>
                    </TableCell>

                    <TableCell>
                      <button
    onClick={() => updatePermissionsMutation.mutate({
      id: doctor._id,
      data: { permissions: { canAddPatients: !doctor.permissions?.canAddPatients } }
    })}
    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${doctor.permissions?.canAddPatients !== false ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
  >
                        {doctor.permissions?.canAddPatients !== false ? <CheckCircle className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                        {doctor.permissions?.canAddPatients !== false ? "Allowed" : "Blocked"}
                      </button>
                    </TableCell>

                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger render={<Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>} />
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Doctor</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete <strong>{doctor.username}</strong>? This action cannot be undone and will remove all their associated patients, visits, and earnings data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogPrimitive.Close render={<AlertDialogAction
    className="bg-red-600 hover:bg-red-700 text-white border-transparent"
    onClick={() => deleteMutation.mutate(doctor._id)}
  >
                                {deleteMutation.isPending ? "Deleting..." : "Delete"}
                              </AlertDialogAction>} />
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>;
}
export {
  DoctorsPage as default
};
