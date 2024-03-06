import WallDisplay from "@/components/WallDisplay";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

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
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    if (error) {
      return <div>{error.message}</div>;
    }
    if (walls && walls.length === 0) {
      return (
        <div className="flex h-[80vh] flex-1 flex-row items-center">
          <div className="mt-4 flex w-[90vw] flex-1 flex-col items-center gap-2 sm:w-[50vw]">
            <p className="text-foreground text-center text-2xl font-thin">
              You are not following any walls.
            </p>
            <p className="text-foreground text-center text-xl font-thin">
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
      <div className="mt-4 flex w-[90vw] flex-1 flex-col gap-2 sm:w-[60vw]">
        {walls?.map((wall: Wall) => (
          <div
            key={wall.wall_id}
            className="text-foreground mb-2 rounded-md border px-4 py-2 text-xs"
          >
            <WallDisplay wall={wall} />
          </div>
        ))}
      </div>
    );
  } else {
    return redirect("/");
  }
}
