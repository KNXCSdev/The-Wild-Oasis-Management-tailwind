import supabase, { supabaseUrl } from "./supabase";

export async function getCabins({ status }: { status: string | null }) {
  let query = supabase.from("cabins").select("*");

  if (status === "with-discount") query = query.gt("discount", 0);
  if (status === "no-discount") query = query.eq("discount", 0);

  const { data: cabins, error } = await query;

  if (error) throw new Error("There was an error connecting to an API");

  return cabins;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error(error.message);
}

interface Cabin {
  discount: number;
  description: string;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

export async function duplicateCubin(cabin: Cabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabin])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

interface NewCabin {
  discount: number;
  description: string;
  image: File;
  maxCapacity: number;
  name: string;
  regularPrice: number;
}

export async function addNewCabin(newCabin: NewCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) throw new Error(error.message);

  const { error: error2 } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (error2)
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created",
    );

  return data;
}
