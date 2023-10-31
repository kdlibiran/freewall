import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const content = String(formData.get("reply"));
  const wall_id = String(formData.get("wall_id"));
  const post_id = String(formData.get("post_id"));
  const parent_reply_id = String(formData.get("parent_reply_id"));
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (parent_reply_id === "") {
    const { error } = await supabase.from("replies").insert({
      content: content,
      post_id: post_id,
      wall_id: wall_id,
    });
    if (error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/wall/${wall_id}?error=${error.message}`,
        {
          // a 301 status is required to redirect from a POST to a GET route
          status: 301,
        }
      );
    }
  } else if (post_id === "") {
    const { error } = await supabase.from("replies").insert({
      content: content,
      wall_id: wall_id,
      parent_reply_id: parent_reply_id,
    });
    if (error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/wall/${wall_id}?error=${error.message}`,
        {
          // a 301 status is required to redirect from a POST to a GET route
          status: 301,
        }
      );
    }
  }
  return NextResponse.redirect(`${requestUrl.origin}/wall/${wall_id}`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
