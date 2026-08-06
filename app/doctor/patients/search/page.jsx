"use client";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
function SearchPatientPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [queryTerm, setQueryTerm] = useState("");
  const { data: patients, isLoading, error } = useQuery({
    queryKey: ["patients", queryTerm],
    queryFn: async () => {
      const res = await apiFetch(`/api/patients${queryTerm ? `?query=${encodeURIComponent(queryTerm)}` : ""}`);
      if (!res.ok) throw new Error("Failed to fetch patients");
      return res.json();
    }
  });
  const handleSearch = (e) => {
    e.preventDefault();
    setQueryTerm(searchTerm);
  };
  return <div className="max-w-5xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search Patients</CardTitle>
          <CardDescription>Search by patient name or mobile number.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
    placeholder="Search name or mobile..."
    className="pl-10"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
            </div>
            <Button type="submit">Search</Button>
            {session?.user?.permissions?.canAddPatients !== false && <Button variant="outline" asChild>
                <Link href="/doctor/patients/add">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New
                </Link>
              </Button>}
          </form>
        </CardContent>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Age/Sex</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? Array.from({ length: 5 }).map((_, i) => <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
                </TableRow>) : error ? <TableRow>
                <TableCell colSpan={5} className="text-center text-red-500 h-24">
                  Failed to load patients.
                </TableCell>
              </TableRow> : patients?.length === 0 ? <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                  No patients found.
                </TableCell>
              </TableRow> : patients?.map((patient) => <TableRow key={patient._id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.mobile}</TableCell>
                  <TableCell>{patient.age} / {patient.sex}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{patient.address}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={`/doctor/patients/${patient._id}`}>View Profile</Link>
                    </Button>
                  </TableCell>
                </TableRow>)}
          </TableBody>
        </Table>
      </Card>
    </div>;
}
export {
  SearchPatientPage as default
};
