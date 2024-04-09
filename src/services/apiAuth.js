import { AuthError } from "@supabase/supabase-js";
import supabase from "./Supabase";
import toast from "react-hot-toast";

export async function apiLogin({ email, password }) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
            if (error instanceof AuthError) {
                  toast.error("Invalid credentials.", { duration: "1000" });
                  return;
            }
            toast.error(error);
            console.log(error);
      }
      return { data };
}

export async function apiGetUser() {
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error) {
            toast.error(error);
            console.log(error)
      }
      if (!sessionData.session) {
            return;
      }
      const { data: userData, error: getUserError } = await supabase.auth.getUser();
      if (getUserError) {
            toast.error(getUserError);
            console.log(getUserError);
            return;
      }
      return { ...userData, ...sessionData };
}

export async function getSession() {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
            toast.error(error);
            console.log(error);
      }
      return { data };
}
export async function apiGetLogout() {
      const { error } = await supabase.auth.signOut();
      if (error) {
            console.log(error);
      }
}

export async function apiSignUp({ name, email, password }) {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
      if (error) {
            toast.error(error);
            console.log(error);
            return;
      }
      return { data, error };
}