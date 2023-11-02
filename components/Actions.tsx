"use client";
import { SetStateAction, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
export default function Reply({
  post_id,
  wall_id,
  parent_reply_id,
}: {
  post_id: string | null;
  wall_id: string;
  parent_reply_id: string | null;
}) {
  const [input, setInput] = useState<number[]>([]);
  const [reply, setReply] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const supabase = createClient();

  const getSaved = async () => {
    const { data, error } = await supabase
      .from("saves")
      .select("*")
      .eq("post_id", post_id);
    if (error) {
      console.log(error);
    } else {
      if (data.length > 0) {
        setIsSaved(true);
      }
    }
  };

  const handleAdd = () => {
    if (input.length === 0) {
      const newInput = [1];
      setInput(newInput);
    } else {
      const newInput: SetStateAction<number[]> = [];
      setInput(newInput);
    }
  };

  useEffect(() => {
    getSaved();
  }, []);

  const handleSave = async () => {
    if (isSaved) {
      const { data, error } = await supabase
        .from("saves")
        .delete()
        .eq("post_id", post_id);
      if (error) {
        console.log(error);
      } else {
        setIsSaved(false);
      }
    } else {
      const { data, error } = await supabase
        .from("saves")
        .insert([{ post_id: post_id }]);
      if (error) {
        console.log(error);
      } else {
        setIsSaved(true);
      }
    }
  };

  return (
    <div className="text-xs text-gray-400">
      <span className="flex flex-row flex-1 gap-3">
        <button onClick={() => handleAdd()}>Reply</button>
        {parent_reply_id === null && (
          <span className="flex flex-row flex-1 gap-3">
            <button>Like</button>
            <button onClick={() => handleSave()}>
              {isSaved ? "Unsave" : "Save"}
            </button>
          </span>
        )}
      </span>
      {input.map((i) => (
        <form
          key={i}
          className="w-full mt-2 flex flex-1 flex-row gap-2"
          action="/api/create/reply"
          method="post"
        >
          <input
            type="hidden"
            name="parent_reply_id"
            value={parent_reply_id ?? ""}
          />
          <input type="hidden" name="post_id" value={post_id ?? ""} />
          <input type="hidden" name="wall_id" value={wall_id} />
          <textarea
            value={reply}
            placeholder="Write a reply here."
            name="reply"
            onChange={(e) => setReply(e.target.value)}
            className="border-2 border-gray-300 break-all w-full background-transparent resize-y reply"
          />
          <input type="submit" value="Reply" />
        </form>
      ))}
    </div>
  );
}