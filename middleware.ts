import { NextResponse, NextRequest } from "next/server";
import { supabase } from "./src/lib/supabaseClient";

export async function middleware(req: NextRequest) {
  console.log("request", req);

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.log("user detectado en el middleware", user);
    console.log("erro detectado en el middleware", error);

    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  console.log("user detectado en el middleware", user);

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
