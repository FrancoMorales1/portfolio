import axios from "axios";
import ContactType from "@/types/contactType";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "";

const ROUTE = `${BASE_URL}/api/contact`;

export const contactService = {
  create: async (
    con: ContactType
  ): Promise<{ data: any; error: any }> => {
    try {
      const res = await axios.post(ROUTE, con);
      return { data: res.data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },
};
