import { redirect } from "next/navigation";
function PatientsPage() {
  redirect("/doctor/patients/search");
}
export {
  PatientsPage as default
};
