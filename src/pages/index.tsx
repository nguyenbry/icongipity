import { type NextPageWithLayout } from "./_app";
import { useUser } from "@clerk/nextjs";
import { Button } from "~/components/atoms/Button";
import { IconInfoCircle } from "@tabler/icons-react";
import MainLayout from "~/components/layouts/MainLayout";

const Home: NextPageWithLayout = () => {
  const user = useUser();

  console.log("user", user);

  return (
    <div className="mt-[10dvh] grid place-content-center gap-32 md:mt-[20dvh] lg:mt-[28dvh] lg:gap-12">
      <h2 className="leading-12 text-center text-5xl font-semibold tracking-tighter dark:text-white sm:text-7xl">
        AI-generated icons
      </h2>
      <div className="flex justify-center gap-3">
        <Button className="">Try free now</Button>
        <Button color="transparent" className="inline-flex gap-1">
          <IconInfoCircle className="inline" size={20} />
          <span>Learn More</span>
        </Button>
      </div>
    </div>
  );
};

Home.getLayout = MainLayout;
Home.protected = false;

export default Home;
