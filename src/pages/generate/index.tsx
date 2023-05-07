import MainLayout from "~/components/layouts/MainLayout";
import { type NextPageWithLayout } from "../_app";
import { useState, type PropsWithChildren } from "react";
import { Input } from "~/components/atoms/Input";
import { Button } from "~/components/atoms/Button";
import { api } from "~/utils/api";
// import Image from "next/image";
import { useRouter } from "next/router";

const GenerateFormSection: React.FC<
  PropsWithChildren<{ header: string; number: number }>
> = ({ header, number, children }) => {
  return (
    <div className="flex gap-5">
      {/* number and line  */}
      <div className="flex flex-col items-center">
        <div className="grid aspect-square w-8 place-content-center rounded-full bg-neutral-200">
          <span className="text-md font-bold text-neutral-500">{number}</span>
        </div>
        <div className="mt-2 w-[1px] grow bg-neutral-200" />
      </div>

      {/* right box  */}
      <div className="inline-flex grow flex-col gap-6 pb-8 pt-2">
        <h2 className="text-xl font-semibold tracking-tight">{header}</h2>

        {children}
      </div>
    </div>
  );
};

const COLOR_MAP = {
  fuchsia: "bg-fuchsia-600 ring-fuchsia-900 hover:ring-fuchsia-700",
  blue: "bg-blue-600 ring-blue-900 hover:ring-blue-700",
  green: "bg-green-600 ring-green-900 hover:ring-green-700",
  teal: "bg-teal-600 ring-teal-900 hover:ring-teal-700",
  red: "bg-red-600 ring-red-900 hover:ring-red-700",
  orange: "bg-orange-600 ring-orange-900 hover:ring-orange-700",
  yellow: "bg-yellow-600 ring-yellow-900 hover:ring-yellow-700",
  indigo: "bg-indigo-600 ring-indigo-900 hover:ring-indigo-700",
  purple: "bg-purple-600 ring-purple-900 hover:ring-purple-700",
  pink: "bg-pink-600 ring-pink-900 hover:ring-pink-700",
  gray: "bg-gray-600 ring-gray-900 hover:ring-gray-700",
} as const;

const ColorSquare: React.FC<{
  color: keyof typeof COLOR_MAP;
  onClick?: React.ComponentProps<"div">["onClick"];
}> = ({ color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`col-span-1 aspect-square w-20 cursor-pointer rounded-md ring-1  ring-white ring-offset-4 ring-offset-neutral-900 md:w-32 ${COLOR_MAP[color]}`}
    ></div>
  );
};

const GeneratePage: NextPageWithLayout = () => {
  const [prompt, setPrompt] = useState("");
  const generateMut = api.generate.icon.useMutation();

  const router = useRouter();

  return (
    <div className="mt-10 px-4 dark:text-white xl:px-72">
      <h1 className="text-2xl font-bold tracking-tighter">
        Let&apos;s Generate Your Icon
      </h1>
      {/* <Image
        alt="icon"
        src={
          "https://oaidalleapiprodscus.blob.core.windows.net/private/org-CyreJ9k6aOKyaJ1P0aBkd09r/user-dsFP52F2aNyNLhoRgw5Zg5jR/img-8YRzQsQaNKWH9ohK8j79qSkD.png?st=2023-05-03T23%3A25%3A59Z&se=2023-05-04T01%3A25%3A59Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-03T12%3A06%3A25Z&ske=2023-05-04T12%3A06%3A25Z&sks=b&skv=2021-08-06&sig=4NVUoaPkkMPrjLm9luxayVcdoL1GZxtz83O6zyFBrz8%3D"
        }
        width={1024}
        height={1024}
      /> */}
      <div className="flex flex-col gap-2 rounded-xl py-10 xl:px-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            generateMut
              .mutateAsync({ prompt, nRequested: 3 })
              .then((jobId) => {
                void router.push("/jobs/" + jobId);
              })
              .catch((e) => {
                console.error(e);
              });
          }}
        >
          <GenerateFormSection
            header="Describe your icon using a noun and adjective"
            number={1}
          >
            <Input
              placeholder="An angry dog"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </GenerateFormSection>
          <GenerateFormSection
            header="Choose a primary color for your icon"
            number={2}
          >
            <div className="flex flex-wrap gap-6">
              {Object.keys(COLOR_MAP).map((color) => (
                <ColorSquare
                  key={color}
                  color={color as keyof typeof COLOR_MAP}
                />
              ))}
            </div>
          </GenerateFormSection>

          <Button className="ml-auto mt-20">Generate</Button>
        </form>
      </div>
    </div>
  );
};

GeneratePage.protected = true;
GeneratePage.getLayout = MainLayout;

export default GeneratePage;
