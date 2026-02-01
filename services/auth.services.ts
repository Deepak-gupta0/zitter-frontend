"use server";

import api from "@/lib/axios";
import { registerSchema } from "@/schemas/register.schema";

export interface FormDataProps {
  username: string;
  email: string;
  password: string;
}

export const RegiterService = async (
  _: null,
  { username, email, password }: FormDataProps,
) => {
  console.log("service: ", { username, email, password });

  const result: any = await registerSchema.safeParseAsync({ username, email, password });

  if (!result.success) {
    return {errors: result.error.flatten().fieldErrors}
  }


  const res = await api.post("/users/register", result.data)
  console.log(res.data)
};

export const LoginService = async (
  _state: null,
  { username, email, password }: FormDataProps,
) => {
  console.log("service: ", { username, email, password });
};
