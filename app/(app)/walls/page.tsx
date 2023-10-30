import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

type Wall = {
  wall_id: string;
  wall_name: string;
  wall_desc: string;
};

export default async function Walls() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("walls").select();
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="gap-2 flex flex-1 flex-col mt-4 w-full max-w-[60vw]">
      {data.map((wall: Wall) => (
        <Link
          href={`/wall/${wall.wall_id}`}
          key={wall.wall_id}
          className="border rounded-md px-4 py-2 text-foreground mb-2 text-xs"
        >
          <div className="flex flex-row gap-2 mb-2 align-middle">
            <div className="w-8 h-8 bg-white rounded-full flex flex-col text-center justify-center text-black font-extrabold text-xl">
              {wall?.wall_name.split("")[0].toUpperCase()}
            </div>
            <h1 className="text-lg mb-2">{wall.wall_name}</h1>
          </div>
          <p className="text-sm break-before">{wall.wall_desc}</p>
        </Link>
      ))}
    </div>
  );
}
