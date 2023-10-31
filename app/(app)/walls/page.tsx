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

  const { data, error } = await supabase
    .from("follows")
    .select("*,walls(*,follows(*))");
  const walls = data?.map((follow: any) => follow.walls);
  if (error) {
    return <div>{error.message}</div>;
  }
  if (walls && walls.length === 0) {
    return (
      <div className="flex flex-1 flex-row items-center h-[80vh]">
        <div className="mt-4 sm:w-[50vw] w-[90vw] gap-2 flex flex-1 flex-col items-center">
          <p className="text-foreground text-2xl font-thin text-center">
            You are not following any walls.
          </p>
          <p className="text-foreground text-xl font-thin text-center">
            <Link href="/search" className="font-extrabold">
              Click here
            </Link>{" "}
            to find walls to follow.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="gap-2 flex flex-1 flex-col mt-4 sm:w-[60vw] w-[90vw]">
      {walls?.map((wall: Wall) => (
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
