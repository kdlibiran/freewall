import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants/index";
export default function Bottombar() {
  return (
    <section className="w-screen h-16 bottom-0 left-0 fixed flex row sm:hidden items-center justify-center bg-background">
      <div className="flex w-full flex-1 flex-row gap-10 items-center justify-center">
        {sidebarLinks.map((link) => (
          <Link
            href={link.route}
            key={link.label}
            className="flex flex-row gap-3"
          >
            <Image
              src={link.imgURL}
              alt={link.label}
              width={24}
              height={24}
              className="icon"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
