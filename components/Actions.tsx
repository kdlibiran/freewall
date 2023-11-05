"use client";
import { SetStateAction, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
export default function Reply({
  post_id,
  wall_id,
  parent_reply_id,
  user_id,
}: {
  post_id: string | null;
  wall_id: string;
  parent_reply_id: string | null;
  user_id: string;
}) {
  const [uid, setUid] = useState("");
  const [input, setInput] = useState<number[]>([]);
  const [reply, setReply] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const supabase = createClient();
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      setUid(user.id);
    }
  };
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

  const getLikes = async () => {
    const { data: likes, error: likeserror } = await supabase
      .from("likes")
      .select("*")
      .eq("post_id", post_id);
    if (likeserror) {
      console.log(likeserror);
    }
    if (likes) {
      setLikes(likes.length);
    }
    const { data, error } = await supabase
      .from("my_likes")
      .select("*")
      .eq("post_id", post_id);
    if (error) {
      console.log(error);
    } else {
      if (data.length > 0) {
        setIsLiked(true);
      }
    }
  };

  useEffect(() => {
    getSaved();
    getUser();
    getLikes();
  }, []);

  const handleAdd = () => {
    if (input.length === 0) {
      const newInput = [1];
      setInput(newInput);
    } else {
      const newInput: SetStateAction<number[]> = [];
      setInput(newInput);
    }
  };

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

  const handleDelete = async () => {
    if (post_id === null) {
      const { data, error } = await supabase
        .from("replies")
        .delete()
        .eq("reply_id", parent_reply_id);
    } else {
      const { data, error } = await supabase
        .from("posts")
        .delete()
        .eq("post_id", post_id);
    }
    window.location.reload();
  };

  const handleLike = async () => {
    if (isLiked) {
      const { data, error } = await supabase
        .from("likes")
        .delete()
        .eq("post_id", post_id);
      if (error) {
        console.log(error);
      } else {
        setIsLiked(false);
        setLikes(likes - 1);
      }
    } else {
      const { data, error } = await supabase
        .from("likes")
        .insert([{ post_id: post_id }]);
      if (error) {
        console.log(error);
      } else {
        setIsLiked(true);
        setLikes(likes + 1);
      }
    }
  };

  return (
    <div className="text-xs text-gray-400">
      <span className="flex flex-row flex-1 gap-3">
        <button onClick={() => handleAdd()}>Reply</button>
        {uid === user_id ? (
          <button onClick={() => handleDelete()}>Delete</button>
        ) : null}
        {parent_reply_id === null && (
          <span className="flex flex-row flex-1 gap-3">
            <button onClick={() => handleLike()}>
              {isLiked ? "Unlike" : "Like"} ({likes})
            </button>
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
