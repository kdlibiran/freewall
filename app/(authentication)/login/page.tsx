import Link from "next/link";
import Messages from "./messages";

export default function Login() {
  return (
    <form
      className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      action="/auth/sign-in"
      method="post"
    >
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        className="rounded-md px-4 py-2 bg-inherit border mb-6"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      <button className="border rounded-md px-4 py-2 text-foreground mb-2">
        Sign In
      </button>
      <div className="text-center font-thin">
        Don't have an account?{" "}
        <Link href="/signup" className="font-extrabold">
          Sign Up
        </Link>{" "}
        Here
      </div>

      <Messages />
    </form>
  );
}
