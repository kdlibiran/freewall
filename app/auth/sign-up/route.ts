import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const uname = String(formData.get("username"));
  const password = String(formData.get("password"));
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
      data: {
        username: uname,
      },
    },
  });
  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/signup?error=Could not authenticate user`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  return NextResponse.redirect(`${requestUrl.origin}/home`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
