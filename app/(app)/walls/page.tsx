import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Walls() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("walls").select();
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="gap-2 flex flex-1 flex-col">
      {data.map((wall: any) => (
        <div key={wall.wall_id}>
          <Link href={`/wall/${wall.wall_id}`}>{wall.wall_name}</Link>
        </div>
      ))}
    </div>
  );
}
