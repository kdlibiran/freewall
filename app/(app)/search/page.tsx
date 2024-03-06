"use client";
import WallDisplay from "@/components/WallDisplay";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

type Wall = {
  wall_id: string;
  wall_name: string;
  wall_desc: string;
  follows: any[];
};

export default function Search() {
  const supabase = createClient();
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([] as Wall[]);

  const getWalls = async () => {
    const { data, error } = await supabase
      .from("walls")
      .select("*,follows(*)")
      .ilike("wall_name", `%${search}%`);
    if (error) {
      console.log(error);
    }
    setResults(data as Wall[]);
  };

  useEffect(() => {
    getWalls();
  }, [search]);
  const getUser = async () => {
    const { data: user, error } = await supabase.auth.getUser();
    if (error) {
      console.log(error);
    }
    return user;
  };

  return (
    <div className="mt-4 flex w-[90vw] flex-1 flex-col gap-2 sm:w-[60vw]">
      <input
        placeholder="Search for walls"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-radius-2xl text-foreground search mb-2 w-full rounded-xl border px-4 py-2 text-xs"
      ></input>
      {results.map((wall: Wall) => (
        <div
          key={wall.wall_id}
          className="text-foreground mb-2 w-full rounded-md border px-4 py-2 text-xs"
        >
          <WallDisplay wall={wall} />
        </div>
      ))}
    </div>
  );
}
