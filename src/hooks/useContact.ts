import { useState } from "react";
import { contactService } from "@/services/contactService";
import { ContactType } from "@/types/contactType";

export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = async (payload: ContactType) => {
    setLoading(true);
    const res = await contactService.create(payload);

    setError(res.error);
    setLoading(false);

    return res.ok;
  };

  return { send, loading, error };
};
