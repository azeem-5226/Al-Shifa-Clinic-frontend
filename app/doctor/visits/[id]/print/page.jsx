"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
function PrintVisitPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { data: visit, isLoading, error } = useQuery({
    queryKey: ["visit", id],
    queryFn: async () => {
      const res = await apiFetch(`/api/visits/${id}`);
      if (!res.ok) throw new Error("Failed to load visit");
      return res.json();
    }
  });
  const handlePrint = () => {
    window.print();
  };
  if (isLoading) {
    return <div className="p-8 max-w-2xl mx-auto"><Skeleton className="h-[600px] w-full" /></div>;
  }
  if (error || !visit) {
    return <div className="p-8 text-center text-red-500">Failed to load prescription.</div>;
  }
  const { patient } = visit;
  return <div className="max-w-3xl mx-auto bg-background min-h-screen relative">
      
      {
    /* Non-printable Action Bar */
  }
      <div className="print:hidden flex justify-between items-center mb-8 bg-muted p-4 rounded-md">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <Button onClick={handlePrint}>
          <Printer className="h-4 w-4 mr-2" /> Print Prescription
        </Button>
      </div>

      {
    /* Printable Area */
  }
      <div className="print:block p-8 border rounded-lg print:border-none print:p-0 bg-white text-black">
        {
    /* Header */
  }
        <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-wider text-blue-800 print:text-black">
              {session?.user?.clinicName || "Clinic Name"}
            </h1>
            <p className="text-sm font-medium mt-1">{session?.user?.name || "Doctor Name"}</p>
            <p className="text-xs text-gray-600 print:text-black">{session?.user?.qualifications || "Qualifications"}</p>
          </div>
          <div className="text-right text-sm">
            <p><strong>Date:</strong> {format(new Date(visit.visitDate), "dd MMM yyyy")}</p>
            <p><strong>Time:</strong> {format(new Date(visit.createdAt), "hh:mm a")}</p>
          </div>
        </div>

        {
    /* Patient Info */
  }
        <div className="flex flex-wrap justify-between bg-gray-50 print:bg-transparent p-4 rounded-md mb-6 border print:border-none">
          <div className="w-1/2 md:w-1/3 mb-2">
            <span className="text-xs text-gray-500 print:text-black uppercase tracking-wide block">Patient Name</span>
            <span className="font-semibold text-base">{patient.name}</span>
          </div>
          <div className="w-1/2 md:w-1/6 mb-2">
            <span className="text-xs text-gray-500 print:text-black uppercase tracking-wide block">Age/Sex</span>
            <span className="font-semibold text-base">{patient.age} / {patient.sex}</span>
          </div>
          <div className="w-1/2 md:w-1/3 mb-2">
            <span className="text-xs text-gray-500 print:text-black uppercase tracking-wide block">Mobile</span>
            <span className="font-semibold text-base">{patient.mobile}</span>
          </div>
          <div className="w-full mt-2">
            <span className="text-xs text-gray-500 print:text-black uppercase tracking-wide block">Address</span>
            <span className="font-semibold text-base">{patient.address}</span>
          </div>
        </div>

        {
    /* Clinical Details */
  }
        <div className="grid grid-cols-1 gap-6 min-h-[400px]">
          
          <div className="space-y-6">
            {visit.complaint && <div>
                <h3 className="font-bold border-b border-dashed border-gray-300 pb-1 mb-2 text-lg">C/O (Complaints)</h3>
                <p className="whitespace-pre-wrap">{visit.complaint}</p>
              </div>}
            
            {visit.medicines && <div>
                <h3 className="font-bold border-b border-dashed border-gray-300 pb-1 mb-2 text-lg flex items-center">
                  <span className="text-2xl mr-2 font-serif">Rx</span> Medicines
                </h3>
                <p className="whitespace-pre-wrap">{visit.medicines}</p>
              </div>}

            {visit.advice && <div>
                <h3 className="font-bold border-b border-dashed border-gray-300 pb-1 mb-2 text-lg">Advice / Remarks</h3>
                <p className="whitespace-pre-wrap">{visit.advice}</p>
              </div>}
          </div>
        </div>

        {
    /* Footer */
  }
        <div className="mt-12 pt-4 border-t-2 border-black flex justify-between items-end text-sm">
          <div className="space-y-1 text-base">
            <p><strong>Consultation Fee:</strong> ₹{visit.fee}</p>
            {visit.fee - visit.amountPaid === 0 ? <p className="text-green-600 font-bold">Total Paid: ₹{visit.amountPaid}</p> : <>
                <p><strong>Amount Paid:</strong> ₹{visit.amountPaid}</p>
                <p className="text-red-600 font-bold text-lg mt-2 pt-2 border-t border-gray-300">
                  Balance Due: ₹{visit.fee - visit.amountPaid}
                </p>
              </>}
          </div>
          <div className="text-center">
            <p className="mt-8 border-t border-black pt-1 px-4 inline-block">Doctor's Signature</p>
          </div>
        </div>
      </div>
    </div>;
}
export {
  PrintVisitPage as default
};
