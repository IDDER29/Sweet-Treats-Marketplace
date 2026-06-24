import { redirect } from "next/navigation";

export default function EditProductByIdPage({
  params,
}: {
  params: { id: string };
}) {
  redirect(`/business/dashboard/products/edit?id=${params.id}`);
}
