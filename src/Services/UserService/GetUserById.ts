import httpClient from "../../httpClient/httpClient";
import { apiLinks } from "../MainService";

interface signal {
  signal: AbortSignal;
  id: string | undefined | null;
}

export const GetUserByIdService = async ({ signal, id }: signal) => {
  try {
    const response = await httpClient.get({
      url: `${apiLinks.User.GETUserById}/${id}`,
      signal: signal,
    });

    const Userdata = response.data;
    return {
      Userdata: Userdata,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Get User failed:", error.message);
    } else {
      console.error("Unexpected error", error);
    }
    throw error;
  }
};
