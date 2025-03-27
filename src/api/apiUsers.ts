import supabase from "./supabase";

interface UserSubmitProps {
  fullName: string;
  email: string;
  password: string;
}

export async function signUpUser(userData: UserSubmitProps) {
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
