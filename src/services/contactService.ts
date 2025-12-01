import axios from "axios";
import { ContactType } from "@/types/contactType";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://portfolio-npg63vrm6-francomorales0001-5459s-projects.vercel.app/";

const ROUTE = `${BASE_URL}/api/contact`;

export const contactService = {
  create: async (con: ContactType): Promise<{ ok: boolean; error: string | null }> => {
    try {
      const res = await axios.post(ROUTE, con);

      return { ok: res.status >= 200 && res.status < 300, error: null };

    } catch (err: unknown) {
      return { ok: false, error: "Error al enviar el formulario" };
    }
  },
};
