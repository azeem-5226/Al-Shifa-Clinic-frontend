"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format, subDays, startOfMonth } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/api";
function EarningsPage() {
  const [startDate, setStartDate] = useState(format(startOfMonth(/* @__PURE__ */ new Date()), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState(format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"));
  const [fetchStart, setFetchStart] = useState(startDate);
  const [fetchEnd, setFetchEnd] = useState(endDate);
  const { data, isLoading, error } = useQuery({
    queryKey: ["earnings", fetchStart, fetchEnd],
    queryFn: async () => {
      const res = await apiFetch(`/api/earnings?startDate=${fetchStart}&endDate=${fetchEnd}`);
      if (!res.ok) throw new Error("Failed to load earnings");
      return res.json();
    }
  });
  const handleApplyFilter = (e) => {
    e.preventDefault();
    setFetchStart(startDate);
    setFetchEnd(endDate);
  };
  const setPreset = (preset) => {
    const end = /* @__PURE__ */ new Date();
    let start = /* @__PURE__ */ new Date();
    if (preset === "week") {
      start = subDays(end, 7);
    } else if (preset === "month") {
      start = startOfMonth(end);
    }
    const formattedStart = format(start, "yyyy-MM-dd");
    const formattedEnd = format(end, "yyyy-MM-dd");
    setStartDate(formattedStart);
    setEndDate(formattedEnd);
    setFetchStart(formattedStart);
    setFetchEnd(formattedEnd);
  };
  const processChartData = () => {
    if (!data?.earnings) return [];
    const grouped = data.earnings.reduce((acc, curr) => {
      const dateStr = format(new Date(curr.date), "dd MMM");
      if (!acc[dateStr]) {
        acc[dateStr] = { date: dateStr, amount: 0 };
      }
      acc[dateStr].amount += curr.amount;
      return acc;
    }, {});
    return Object.values(grouped);
  };
  const chartData = processChartData();
  return <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Earnings</h2>
          <p className="text-muted-foreground">View and manage clinic revenue.</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setPreset("today")}>Today</Button>
          <Button variant="outline" size="sm" onClick={() => setPreset("week")}>This Week</Button>
          <Button variant="outline" size="sm" onClick={() => setPreset("month")}>This Month</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Range</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleApplyFilter} className="flex flex-wrap items-end gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
    id="startDate"
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
  />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
    id="endDate"
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
  />
            </div>
            <Button type="submit">Apply Filter</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-24" /> : `\u20B9${data?.total || 0}`}
            </div>
            <p className="text-xs text-muted-foreground">
              For selected date range
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Daily earnings for the selected period.</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          {isLoading ? <Skeleton className="h-full w-full" /> : chartData.length === 0 ? <div className="h-full flex items-center justify-center text-muted-foreground">
              No earnings data for this period.
            </div> : <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
    formatter={(value) => [`\u20B9${value}`, "Revenue"]}
    cursor={{ fill: "var(--accent)" }}
  />
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>}
        </CardContent>
      </Card>
    </div>;
}
export {
  EarningsPage as default
};
