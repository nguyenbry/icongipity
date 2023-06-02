import { type NextPageWithLayout } from "~/types/NextPageWithLayout";
import { Navbar } from "../nav/navbar";

const MainLayout: NonNullable<NextPageWithLayout["getLayout"]> = (page) => {
  return (
    <>
      <Navbar />
      <main className="flex grow flex-col">{page}</main>
    </>
  );
};

export default MainLayout;
