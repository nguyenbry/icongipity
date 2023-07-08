import MainLayout from "~/components/layouts/MainLayout";
import { type NextPageWithLayout } from "~/types/NextPageWithLayout";
import { useState, type PropsWithChildren } from "react";
import { Input } from "~/components/atoms/Input";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { type Color, ColorSelect } from "~/components/generate/color-select";
import { type Style, StyleSelect } from "~/components/generate/style-select";
import { ConfirmationDialog } from "./confirmation-dialog";

const GenerateFormSection: React.FC<
  PropsWithChildren<{ header: string; number: number }>
> = ({ header, number, children }) => {
  return (
    <div className="flex gap-2">
      {/* number and line on left*/}
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
  const [prompt, setPrompt] = useState("");
  const [selectedColor, setSelectedColor] = useState<Color>();
  const [selectedStyle, setSelectedStyle] = useState<Style>();
  const [numImages, setNumImages] = useState("1");
  const generateMut = api.generate.icon.useMutation();

  const router = useRouter();

  return (
    // max w for super wide screens (form doesn't look good too wide)
    <div className="mt-10 max-w-[1800px] px-4 dark:text-white xl:px-72">
      <h1 className="text-2xl font-bold tracking-tighter">
        Let&apos;s Generate Your Object
      </h1>

      <form className="relative flex flex-col gap-2 rounded-xl py-10 xl:px-10">
        <GenerateFormSection
          header="Describe your object using a noun and adjective"
          number={1}
        >
          <Input
            placeholder="An angry dog"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={generateMut.isLoading}
          />
        </GenerateFormSection>
        <GenerateFormSection
          header="Choose a primary color for your object"
          number={2}
        >
          <div className="mt-2 flex flex-wrap justify-center gap-6 md:gap-10">
            <ColorSelect value={selectedColor} onChange={setSelectedColor} />
          </div>
        </GenerateFormSection>
        <GenerateFormSection header="Choose a style for your object" number={3}>
          <StyleSelect value={selectedStyle} onChange={setSelectedStyle} />
        </GenerateFormSection>
        <GenerateFormSection
          header="How many images do you want? (1-4)"
          number={4}
        >
          <Input
            placeholder="1"
            value={numImages}
            type="number"
            step={1}
            max={4}
            min={1}
            onChange={(e) => setNumImages(e.target.value)}
            disabled={generateMut.isLoading}
          />
        </GenerateFormSection>

        <div className="flex">
          <ConfirmationDialog
            numImages={numImages}
            prompt={prompt}
            selectedColor={selectedColor}
            selectedStyle={selectedStyle}
            isLoading={generateMut.isLoading}
            generate={async () => {
              if (!selectedColor || !selectedStyle)
                throw new Error("check for this above");

              await generateMut
                .mutateAsync({
                  noun: prompt,
                  nRequested: parseInt(numImages),
                  color: selectedColor,
                  style: selectedStyle,
                })
                .then((jobId) => {
                  void router.push("/jobs/" + jobId);
                })
                .catch((e) => {
                  console.error(e);
                });
            }}
          />
        </div>
      </form>
    </div>
  );
};

GeneratePage.protected = true;
GeneratePage.getLayout = MainLayout;

export default GeneratePage;
