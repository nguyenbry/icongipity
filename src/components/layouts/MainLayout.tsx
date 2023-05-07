import { type NextPageWithLayout } from "~/pages/_app";
import MySignOutButton from "../auth/MySignOutButton";
import MySignInButton from "../auth/MySignInButton";
import Link from "next/link";
import { Button } from "../atoms/Button";
import { IconMoodSmileBeam } from "@tabler/icons-react";

type GetLayoutFn = NonNullable<NextPageWithLayout["getLayout"]>;

const MainLayout: GetLayoutFn = (page) => (
  <>
    <nav className="sticky top-0 z-10 flex items-center justify-between px-10 py-12 backdrop-blur-md lg:px-20 2xl:px-72">
      <div className="flex items-center gap-3">
        <Link href={"/"}>
          <h1 className="cursor-pointer bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-3xl font-semibold tracking-tighter text-transparent transition-transform hover:translate-x-2">
            Icon GiPiTy
          </h1>
        </Link>
        <IconMoodSmileBeam className="animate-spin dark:text-white" />
      </div>

      <div className="flex gap-3">
        <Link href={"/jobs"}>
          <Button color="transparent">My Icons</Button>
        </Link>

        <MySignOutButton />
        <MySignInButton />
      </div>
    </nav>
    <main className="flex grow flex-col">{page}</main>
  </>
);

export default MainLayout;
