"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { Users, UserPlus, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import * as React from "react";
import { apiFetch } from "@/lib/api";

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Admin";
  const { data, isLoading } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await apiFetch(`/api/admin/dashboard-stats`);
      if (!res.ok) throw new Error("Failed to load admin stats");
      return res.json();
    }
  });

  if (!session || session.user.role !== "admin") return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, {userName}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm border-t-4 border-t-blue-500 hover:shadow-md transition-all">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">Total Registered Doctors</CardTitle>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mt-2">
              {isLoading ? <Skeleton className="h-8 w-16" /> : data?.totalDoctors || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active accounts on the platform</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              Onboard New Doctor
            </CardTitle>
            <CardDescription className="pt-2">Add a new doctor to the platform and send credentials.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full font-medium" size="lg" asChild>
              <Link href="/admin/doctors/add">Add Doctor</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                <Search className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              Manage Doctors
            </CardTitle>
            <CardDescription className="pt-2">View registered doctors and manage accounts.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full font-medium" variant="secondary" size="lg" asChild>
              <Link href="/admin/doctors">Manage Doctors</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recently Onboarded Doctors</CardTitle>
          <CardDescription>The latest doctors to join the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email (Username)</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">Loading...</TableCell>
                </TableRow>
              ) : data?.recentDoctors?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">No doctors found.</TableCell>
                </TableRow>
              ) : (
                data?.recentDoctors?.map((doc) => (
                  <TableRow key={doc._id}>
                    <TableCell className="font-medium">{doc.username}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {doc.role}
                      </span>
                    </TableCell>
                    <TableCell>{format(new Date(doc.createdAt), "dd MMM yyyy")}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
