import { useState } from "react";
import { contactService } from "@/services/contactService";
import ContactType from "@/types/contactType";

export const useContact = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const send = async (payload: ContactType) => {
    setLoading(true);
    const { data, error } = await contactService.create(payload);

    setData(data);
    setError(error);
    setLoading(false);

    return { data, error };
  };

  return { send, data, error, loading };
};
