"use client";
import { SetStateAction, useState } from "react";

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
  const handleAdd = () => {
    if (input.length === 0) {
      const newInput = [1];
      setInput(newInput);
    } else {
      const newInput: SetStateAction<number[]> = [];
      setInput(newInput);
    }
  };

  return (
    <div>
      <button onClick={() => handleAdd()}>Reply</button>

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
