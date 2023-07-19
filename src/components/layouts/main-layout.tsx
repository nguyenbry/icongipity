import { type NextPageWithLayout } from "~/types/next-page-with-layout";
import { Navbar } from "../nav/navbar";

const MainLayout: NonNullable<NextPageWithLayout["getLayout"]> = (page) => {
  return (
    <>
      <Navbar />
      <main className="flex grow flex-col items-center">{page}</main>
    </>
  );
};

export default MainLayout;
