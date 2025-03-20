import { Supabase } from "./Supabase";

export const getAllData = async () => {
  const data = await Supabase.from("study-record").select("*");
  return data.data;
};

export const setNewData = async (title, time) => {
  try {
    const { error } = await Supabase.from("study-record").insert({ title: title, time: time });
    if (error) {
      throw error;
    }
  } catch (err) {
    console.error(err);
  }
};
