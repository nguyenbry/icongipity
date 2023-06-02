import { SignedIn } from "@clerk/nextjs";
import { IconMoodSmileBeam } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "../atoms/Button";
import { Hambuger } from "./Hamburger";
import MySignOutButton from "../auth/MySignOutButton";
import MySignInButton from "../auth/MySignInButton";
import { links } from "./nav-links";
import classNames from "classnames";

export const Navbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-[1] flex items-center justify-between px-6 py-4 backdrop-blur-md md:py-10 lg:px-20 2xl:px-72">
      <div className="flex items-center gap-3">
        <Link href={"/"}>
          <h1 className="cursor-pointer bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-xl font-semibold tracking-tighter text-transparent transition-transform hover:translate-x-2 md:text-3xl">
            Object GiPiTy
          </h1>
        </Link>
        <IconMoodSmileBeam className="animate-spin dark:text-white" />
      </div>

      <div className="flex">
        <SignedIn>
          {links.map(({ label, url }, i) => (
            <Link
              key={label}
              href={url}
              className={classNames("hidden md:inline", {
                "mr-2": i === links.length - 1,
              })}
            >
              <Button color="transparent">{label}</Button>
            </Link>
          ))}
          <Hambuger />
        </SignedIn>
        <MySignOutButton />
        <MySignInButton />
      </div>
    </nav>
  );
};
