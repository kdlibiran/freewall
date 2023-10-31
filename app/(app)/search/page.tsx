"use client";
import WallDisplay from "@/components/WallDisplay";
import { createClient } from "@/utils/supabase/client";
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

  return (
    <div className="gap-2 flex flex-1 flex-col mt-4 sm:w-[60vw] w-[90vw]">
      <input
        placeholder="Search for walls"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-xl w-full border-radius-2xl px-4 py-2 text-foreground mb-2 text-xs"
      ></input>
      {results.map((wall: Wall) => (
        <div
          key={wall.wall_id}
          className="border rounded-md px-4 py-2 text-foreground mb-2 text-xs w-full"
        >
          <WallDisplay wall={wall} />
        </div>
      ))}
    </div>
  );
}
