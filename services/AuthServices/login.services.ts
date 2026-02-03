
import api from "@/lib/axios";
import { loginSchema } from "@/schemas/login.schema";
import { extractErrorMessage } from "@/utils/errorMessage";
import { FormDataProps } from "../auth.services";
import axios from "axios";

export const LoginService = async ({
  username,
  email,
  password,
}: FormDataProps) => {
  console.log("service: ", { username, email, password });

  const result = await loginSchema.safeParseAsync({
    username,
    email,
    password,
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }
  // console.log(result.data)
  try {
    const res = await api.post("/users/login", result.data);
    // console.log("axios", res);

    if (!res.data.success) {
      return;
    }
    // console.log(res.data)
    // console.log(res.headers)
    return { success: res.data.success };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
      if (error.response) {
        // console.log(error.response.status);
      }
    }
    const errMsg: string | null = extractErrorMessage(error.data);
    return { errors: { password: [errMsg] } };
  }
};
