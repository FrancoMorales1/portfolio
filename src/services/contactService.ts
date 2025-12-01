import axios, { AxiosError } from "axios";
import { ContactType, ContactResponse } from "@/types/contactType";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "";

const ROUTE = `${BASE_URL}/api/contact`;

export const contactService = {
  create: async (con: ContactType): Promise<{
    data: ContactResponse | null;
    error: string | null;
  }> => {
    try {
      const res = await axios.post<ContactResponse>(ROUTE, con);

      return {
        data: res.data,
        error: null,
      };
    } catch (err) {
      const axiosError = err as AxiosError;

      return {
        data: null,
        error: axiosError.message,
      };
    }
  },
};
