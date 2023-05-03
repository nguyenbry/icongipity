import { type NextPageWithLayout } from "~/pages/_app";
import MySignOutButton from "../auth/MySignOutButton";
import MySignInButton from "../auth/MySignInButton";

type GetLayoutFn = NonNullable<NextPageWithLayout["getLayout"]>;

const MainLayout: GetLayoutFn = (page) => {
  console.log("main layout hit");

  return (
    <>
      <nav className="flex items-center justify-between px-10 py-12 lg:px-20 2xl:px-72">
        <h1 className="cursor-default bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-3xl font-semibold tracking-tighter text-transparent transition-transform hover:translate-x-2">
          Icon GiPiTy
        </h1>
        <MySignOutButton />
        <MySignInButton />
        {/* <IconButton>
        <IconClockFilled size={18} />
      </IconButton> */}
      </nav>
      <main className="flex grow flex-col">{page}</main>
    </>
  );
};

export default MainLayout;
