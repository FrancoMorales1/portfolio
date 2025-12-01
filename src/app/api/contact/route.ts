import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";
import { contactSchema } from "@/schemas/contactSchema";
export async function POST(req: Request) {
  try {
    const body = await req.json();

    await contactSchema.validate(body, { abortEarly: false });

    const { name, email, subject, message } = body;

    const { data, error } = await supabase
      .from("contact")
      .insert([{ name, email, subject, message }])
      .select()
      .single();

    if (error) {
      console.error(error);
      return NextResponse.json(
        { success: false, message: "Error al guardar en Supabase" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Mensaje guardado", data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error del servidor" },
      { status: 500 }
    );
  }
}