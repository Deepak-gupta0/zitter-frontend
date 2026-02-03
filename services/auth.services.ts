"use server";

import api from "@/lib/axios";
import { registerSchema } from "@/schemas/register.schema";
import axios, { AxiosResponse } from "axios";

export interface FormDataProps {
  username: string;
  email: string;
  password: string;
}

export const RegiterService = async (
  _: null,
  { username, email, password }: FormDataProps,
) => {
  const result: any = await registerSchema.safeParseAsync({
    username,
    email,
    password,
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    const res: AxiosResponse = await api.post("/users/register", result.data);
    // console.log("axios", res.data);

    if (!res.data.success) {
      return;
    }
    return { success: res.data.success };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      if (error.response) {
        // console.log(error.response.status);
      }
    }
    // console.log(error)
    return;
  }
};

