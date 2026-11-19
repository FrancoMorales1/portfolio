import { NextResponse, type NextRequest } from "next/server";

/** `/` -> `/es` o `/en` según el idioma preferido del navegador (por defecto español). */
export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept-language") ?? "";
  const first = accept.split(",")[0]?.trim().toLowerCase() ?? "";
  const lang = first.startsWith("en") ? "en" : "es";
  return NextResponse.redirect(new URL(`/${lang}`, request.url), 307);
}

export const config = { matcher: "/" };
