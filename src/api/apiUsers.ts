import supabase, { supabaseUrl } from "./supabase";

interface UserSubmitProps {
  fullName?: string;
  email: string;
  password: string;
}

export async function signUpUser(userData: UserSubmitProps) {
  console.log(userData);
  const { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        fullName: userData.fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signInUser(userData: UserSubmitProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userData.email,
    password: userData.password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function updateUser({
  password,
  avatar,
  fullName,
}: {
  password?: string;
  avatar?: File | undefined;
  fullName?: string;
}) {
  let updateData: { password?: string; data?: { fullName?: string } } = {};

  if (password) updateData = { password: password };

  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  const fileName = `avatar=${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
