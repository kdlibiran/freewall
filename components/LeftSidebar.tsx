import { sidebarLinks } from "@/constants/index";
import Link from "next/link";
import Image from "next/image";

export const LeftSidebar = () => {
  return (
    <section className="fixed left-0 flex-col md:w-64 h-full w-30 sm:flex hidden pt-5 justify-center items-center">
      <div className="flex w-full flex-1 flex-col gap-10 px-6 pt-2">
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
              style={{ filter: "invert(100%)" }}
            />
            <p className="hidden md:block">{link.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
