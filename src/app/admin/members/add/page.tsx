import { redirect } from "next/navigation";

export default function AdminMembersAddRedirect() {
  redirect("/admin/members/new");
}
