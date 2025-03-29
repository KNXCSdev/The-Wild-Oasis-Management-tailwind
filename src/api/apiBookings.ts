import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

interface GetBookingsProps {
  page: number;
  status: string | null;
  sort: string | null;
}

export async function getBookings({ page, status, sort }: GetBookingsProps) {
  let query = supabase
    .from("bookings")
    .select("*,cabins(name),guests(fullName,email)", { count: "exact" });

  if (status) {
    query = query.eq("status", status);
  }

  if (page) {
    const from = PAGE_SIZE * (page - 1);
    const to = from + PAGE_SIZE - 1;

    query = query.range(from, to);
  }

  if (sort) {
    const [field, direction] = sort.split("-");

    query = query.order(field, {
      ascending: direction === "asc",
    });
  }

  //COUNT IS A BOOKINGS LENGTH BEFORE RANGE()
  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count: count ?? 0 };
}
