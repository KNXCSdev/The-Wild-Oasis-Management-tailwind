import supabase from "./supabase";

export async function getBookings() {
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*,cabins(name),guests(fullName,email)");

  if (error) throw new Error("There was an error connecting to an API");

  return bookings;
}
