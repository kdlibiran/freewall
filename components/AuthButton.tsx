import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";
export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-3">
      <p className="hidden sm:block">hey, {user.email?.split("@")[0]}!</p>
      <div className="w-8 h-8 bg-white rounded-full text-center flex flex-1 justify-center flex-col text-black sm:hidden font-extrabold text-xl">
        {user.email?.split("")[0].toUpperCase()}
      </div>
      <form action="/auth/sign-out" method="post">
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          <Image
            src="assets/icons/log-out.svg"
            alt="Logout"
            height={18}
            width={18}
            className="md:hidden icon"
          />
          <p className="hidden md:block">Logout</p>
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      <Image
        src="assets/icons/log-in.svg"
        alt="Login"
        height={18}
        width={18}
        className="md:hidden icon"
      />
      <p className="hidden md:block">Login</p>
    </Link>
  );
}
