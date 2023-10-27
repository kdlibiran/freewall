"use client";
import Typewriter from "typewriter-effect";

export default function TypeWriter() {
  return (
    <div>
      <Typewriter
        options={{
          strings: ["Anything", "Anytime", "Anywhere"],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
}
