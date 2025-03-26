import supabase from "./supabase";

export async function getCabins() {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("There was an error connecting to an API");

  return cabins;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

export async function duplicateCubin(cabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabin])
    .select();

  if (error) throw new Error(error.message);

  return data;
}
