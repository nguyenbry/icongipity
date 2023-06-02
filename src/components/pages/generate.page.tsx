import MainLayout from "~/components/layouts/MainLayout";
import { type NextPageWithLayout } from "~/types/NextPageWithLayout";
import { useState, type PropsWithChildren } from "react";
import { Input } from "~/components/atoms/Input";
import { Button } from "~/components/atoms/Button";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { type Color, ColorSelect } from "~/components/generate/color-select";
import { type Style, StyleSelect } from "~/components/generate/style-select";

const GenerateFormSection: React.FC<
  PropsWithChildren<{ header: string; number: number }>
> = ({ header, number, children }) => {
  return (
    <div className="flex gap-2">
      {/* number and line  */}
      <div className="flex flex-col items-center">
        <div className="grid aspect-square w-8 place-content-center rounded-full bg-neutral-200">
          <span className="text-md font-bold text-neutral-500">{number}</span>
        </div>
        <div className="mt-2 w-[1px] grow bg-neutral-200" />
      </div>

      {/* right box  */}
      <div className="inline-flex grow flex-col gap-6 pb-8 pt-1">
        <h2 className="text-xl font-semibold tracking-tight">{header}</h2>

        {children}
      </div>
    </div>
  );
};

const GeneratePage: NextPageWithLayout = () => {
  const [noun, setNoun] = useState("");
  const [selectedColor1, setSelectedColor1] = useState<Color>();
  const [selectedStyle, setSelectedStyle] = useState<Style>();
  const generateMut = api.generate.icon.useMutation();

  const router = useRouter();

  return (
    <div className="mt-10 px-4 dark:text-white xl:px-72">
      <h1 className="text-2xl font-bold tracking-tighter">
        Let&apos;s Generate Your Object
      </h1>

      <form
        className="flex flex-col gap-2 rounded-xl py-10 xl:px-10"
        onSubmit={(e) => {
          e.preventDefault();

          generateMut
            .mutateAsync({
              noun,
              nRequested: 1,
              color: "green",
              style: "METALLIC",
            })
            .then((jobId) => {
              void router.push("/jobs/" + jobId);
            })
            .catch((e) => {
              console.error(e);
            });
        }}
      >
        <GenerateFormSection
          header="Describe your object using a noun and adjective"
          number={1}
        >
          <Input
            placeholder="An angry dog"
            value={noun}
            onChange={(e) => setNoun(e.target.value)}
          />
        </GenerateFormSection>
        <GenerateFormSection
          header="Choose a primary color for your object"
          number={2}
        >
          <div className="mt-2 flex flex-wrap justify-center gap-6 md:gap-10">
            <ColorSelect value={selectedColor1} onChange={setSelectedColor1} />
          </div>
        </GenerateFormSection>
        <GenerateFormSection header="Choose a style for your object" number={3}>
          <StyleSelect value={selectedStyle} onChange={setSelectedStyle} />
        </GenerateFormSection>

        <div className="flex">
          <Button className="ml-auto mt-10 min-w-full md:min-w-0">
            Generate
          </Button>
        </div>
      </form>
    </div>
  );
};

GeneratePage.protected = true;
GeneratePage.getLayout = MainLayout;

export default GeneratePage;
