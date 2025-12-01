import { useState } from "react";
import { contactService } from "@/services/contactService";
import { ContactType, ContactResponse } from "@/types/contactType";

export const useContact = () => {
  const [data, setData] = useState<ContactResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
