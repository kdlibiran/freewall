"use client";
import { createClient } from "@/utils/supabase/client";
import { Separator } from "@/components/ui/separator";
import moment from "moment";
type Post = {
  post_id: string;
  wall_id: string;
  content: string;
  timestamp: string;
};
type Wall = {
  wall_id: string;
  wall_name: string;
  wall_desc: string;
  follows: any[];
};
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PostDisplay({
  post,
  wall,
}: {
  post: Post;
  wall: Wall;
}) {
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
    //refresh
    location.reload();
  };
  return (
    <Link href={`/post/${post.post_id}`}>
      <div>
        <button
          className=" border text-xxs rounded-md px-2 py-1 text-foreground mb-2 absolute right-[8vw] sm:right-[28vw]"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
        >
          <span>{isFollowing ? "Unfollow" : "Follow"}</span>
        </button>

        <div className="flex flex-row gap-2 mb-2 justify-between">
          <div className="flex flex-row gap-3 mb-2 place-items-center">
            <div className="w-5 h-5 bg-white rounded-full flex flex-col text-center justify-center text-black font-extrabold text-xl">
              {wall.wall_name.split("")[0].toUpperCase()}
            </div>
            <h1 className="text-xs align-middle">{wall.wall_name}</h1>
            <span className="text-xxs text-gray-400 md:block hidden">
              By anonymous {moment(new Date(post.timestamp)).fromNow()}
            </span>
            <span className="text-xxs text-gray-400 md:hidden">Anon</span>
          </div>
        </div>
        <Separator className="mb-3 w-full" />
        <p className="text-sm break-all">{post.content}</p>
      </div>
    </Link>
  );
}
