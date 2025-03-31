import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface User {
  credential: { [key: string]: string|undefined };
}

export const LoginwithGoogle = async ({ credential }: User) => {
  try {
    const response = await httpClient.post({
      url: apiLinks.Auth.Loginwithgoogle,
      data: credential,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Login request failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};
