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
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action="/auth/sign-out" method="post">
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          <Image
            src="assets/icons/log-out.svg"
            alt="Logout"
            height={18}
            width={18}
            className="md:hidden"
            style={{ filter: "invert(100%)" }}
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
        className="md:hidden"
        style={{ filter: "invert(100%)" }}
      />
      <p className="hidden md:block">Login</p>
    </Link>
  );
}
