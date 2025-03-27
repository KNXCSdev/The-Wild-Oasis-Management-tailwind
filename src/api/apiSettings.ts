import supabase from "./supabase";

export async function getSettings() {
  const { data: settings, error } = await supabase
    .from("settings")
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return settings;
}

export async function updateSetting(newSetting: Record<string, string>) {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .select();

  if (error) throw new Error(error.message);

  return data;
}
