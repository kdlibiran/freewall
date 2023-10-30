"use client";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
type Wall = {
  wall_id: string;
  wall_name: string;
  wall_desc: string;
  follows: any[];
};
import { useEffect, useState } from "react";

export default function WallDisplay({ wall }: { wall: Wall }) {
  const supabase = createClient();
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    if (wall.follows) {
      setIsFollowing(wall.follows.length > 0);
    } else {
      setIsFollowing(false);
    }
  }, []);
  const handleClick = async () => {
    if (isFollowing) {
      await supabase.from("follows").delete().match({ wall_id: wall.wall_id });
    } else {
      await supabase.from("follows").insert({ wall_id: wall.wall_id });
    }
    setIsFollowing(!isFollowing);
  };
  return (
    <div>
      <button
        className=" border rounded-md px-4 py-2 text-foreground mb-2 absolute right-[8vw] sm:right-[23vw]"
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
      <Link href={`/wall/${wall.wall_id}`}>
        <div className="flex flex-row gap-2 mb-2 justify-between">
          <div className="flex flex-row gap-2 mb-2 align-middle">
            <div className="w-8 h-8 bg-white rounded-full flex flex-col text-center justify-center text-black font-extrabold text-xl">
              {wall?.wall_name.split("")[0].toUpperCase()}
            </div>
            <h1 className="text-lg mb-2">{wall.wall_name}</h1>
          </div>
        </div>
        <p className="text-sm">{wall.wall_desc}</p>
      </Link>
    </div>
  );
}
