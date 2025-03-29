import { PAGE_SIZE } from "../utils/constants";
import supabase from "./supabase";

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*,cabins(*),guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be loaded");
  }

  return data;
}

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

export async function deleteBooking(id: number) {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

interface UpdateBookingPayload {
  status?: string;
  isPaid?: boolean;
}

export async function updateBooking(id: number, obj: UpdateBookingPayload) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  return data;
}
