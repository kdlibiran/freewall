import WallDisplay from "@/components/WallDisplay";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";

type Wall = {
  wall_id: string;
  wall_name: string;
  wall_desc: string;
  follows: any[];
};

export default async function Walls() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("walls").select("*,follows(*)");
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <div className="gap-2 flex flex-1 flex-col mt-4 sm:w-[60vw] w-[90vw]">
      {data.map((wall: Wall) => (
        <div
          key={wall.wall_id}
          className="border rounded-md px-4 py-2 text-foreground mb-2 text-xs"
        >
          <WallDisplay wall={wall} />
        </div>
      ))}
    </div>
  );
}
