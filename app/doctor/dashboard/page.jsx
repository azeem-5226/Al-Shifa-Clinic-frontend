"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Users, UserPlus, Search, Wallet, IndianRupee, Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import * as React from "react";
import { apiFetch } from "@/lib/api";

export default function DoctorDashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Doctor";
  const [isPendingOpen, setIsPendingOpen] = React.useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await apiFetch(`/api/earnings?type=dashboard`);
      if (!res.ok) throw new Error("Failed to load dashboard stats");
      return res.json();
    }
  });

  if (!session || session.user.role !== "doctor") return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, {userName}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-t-4 border-t-blue-500 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Today's Patients</CardTitle>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mt-2">
              {isLoading ? <Skeleton className="h-8 w-16" /> : data?.todaysPatients || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Registered today</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-t-4 border-t-purple-500 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Today's Visits</CardTitle>
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
              <Stethoscope className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mt-2">
              {isLoading ? <Skeleton className="h-8 w-16" /> : data?.todaysVisits || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Consultations today</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-green-500 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Today's Earnings</CardTitle>
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
              <Wallet className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mt-2">
              {isLoading ? <Skeleton className="h-8 w-24" /> : `₹${data?.todaysEarnings || 0}`}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Revenue today</p>
          </CardContent>
        </Card>
        
        <Dialog open={isPendingOpen} onOpenChange={setIsPendingOpen}>
          <Card
            className="shadow-sm border-t-4 border-t-red-500 cursor-pointer hover:-translate-y-1 hover:shadow-md hover:border-red-600 transition-all group"
            onClick={() => setIsPendingOpen(true)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-red-600 dark:text-red-400">Pending Balances</CardTitle>
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full group-hover:scale-110 transition-transform">
                <Wallet className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                {isLoading ? <Skeleton className="h-8 w-24" /> : `₹${data?.totalPendingBalance || 0}`}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Click to view details</p>
            </CardContent>
          </Card>

          <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Pending Balances</DialogTitle>
              <DialogDescription>
                List of patients with unpaid consultation fees.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto mt-4">
              {data?.pendingVisitsList?.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Patient</TableHead>
                      <TableHead>Mobile</TableHead>
                      <TableHead className="text-right">Balance Due</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.pendingVisitsList.map((visit) => (
                      <TableRow key={visit._id}>
                        <TableCell>{format(new Date(visit.visitDate), "dd MMM yyyy")}</TableCell>
                        <TableCell className="font-medium">{visit.patient?.name || "Unknown"}</TableCell>
                        <TableCell>{visit.patient?.mobile}</TableCell>
                        <TableCell className="text-right font-bold text-red-600">
                          ₹{visit.fee - (visit.amountPaid ?? visit.fee)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No pending balances found! Everyone has paid in full.
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {session?.user?.permissions?.canAddPatients !== false && (
          <Card className="shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                Add Patient
              </CardTitle>
              <CardDescription className="pt-2">Register a new patient and record consultation.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full font-medium" size="lg" asChild>
                <Link href="/doctor/patients/add">Add New Patient</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                <Search className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              Search Patient
            </CardTitle>
            <CardDescription className="pt-2">Find existing patients quickly.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full font-medium" variant="secondary" size="lg" asChild>
              <Link href="/doctor/patients/search">Search Patients</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                <IndianRupee className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              View Earnings
            </CardTitle>
            <CardDescription className="pt-2">Track daily and monthly revenue reports.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full font-medium" variant="outline" size="lg" asChild>
              <Link href="/doctor/earnings">View Earnings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
