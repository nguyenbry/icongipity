import type { NextPageWithLayout } from "~/pages/_app";
import Navbar from "./_navbar";

type LayoutFn = NonNullable<NextPageWithLayout["getLayout"]>;

export const getNavbarLayout: LayoutFn = (page) => {
  return (
    <div className="flex min-h-screen">
      <Navbar />
      {page}
    </div>
  );
};
