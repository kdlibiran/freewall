import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type wall = {
  wall_id: string;
  wall_name: string;
  wall_desc: string;
};

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const name = String(formData.get("name"));
  const desc = String(formData.get("desc"));
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = (await supabase
    .from("walls")
    .insert({ wall_name: name, wall_desc: desc })
    .select()) as { data: wall[]; error: any };

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/wall/create?error=${error.message}`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    );
  }

  return NextResponse.redirect(`${requestUrl.origin}/wall/${data[0].wall_id}`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
