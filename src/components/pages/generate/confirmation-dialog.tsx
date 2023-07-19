import { Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Button } from "~/components/atoms/my-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/atoms/my-dialog";
import { type Color } from "~/components/generate/color-select";
import { type Style } from "~/components/generate/style-select";
import { addToast, useToastStore } from "~/components/toast/use-toast-store";
import { api } from "~/utils/api";

/**
 * This submit button actually opens a dialog while we wait
 * for the image to be generated
 */
export function ConfirmationDialog({
  isLoading,
  generate,
  selectedColor,
  selectedStyle,
  prompt,
  numImages,
}: {
  isLoading: boolean;
  generate: () => Promise<void>;
  selectedColor: Color | undefined;
  selectedStyle: Style | undefined;
  numImages: string;
  prompt: string;
}) {
  const optionsQuery = api.generate.styleOptions.useQuery();

  const [open, setOpen] = useState(false);

  const numberImagesParsed = z
    .number()
    .int()
    .min(1)
    .max(4)
    .safeParse(Number.parseInt(numImages));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="ml-auto mt-10 min-w-full md:min-w-0"
          variant="success"
          disabled={isLoading}
          onClick={(event) => {
            if (!numberImagesParsed.success) {
              event.preventDefault();
              addIfNotAlready({
                description: "Please select a number of images between 1 and 4",
                title: "🔢",
                variant: "danger",
                meta: "BAD_NUM_IMAGES",
              });
              return;
            }

            if (!prompt.trim()) {
              event.preventDefault(); // don't open the confirmation dialog
              addIfNotAlready({
                description: "Please enter a prompt",
                title: "No prompt entered",
                variant: "danger",
                meta: "EMPTY_PROMPT",
              });
              return;
            }
            if (!selectedColor) {
              event.preventDefault();
              addIfNotAlready({
                description: "Please select a color",
                title: "No color selected",
                variant: "danger",
                meta: "NO_COLOR",
              });
              return;
            }
            if (!selectedStyle) {
              event.preventDefault();
              addIfNotAlready({
                description: "Please select a style",
                title: "No style selected",
                variant: "danger",
                meta: "NO_STYLE",
              });
              return;
            }
          }}
        >
          Generate
        </Button>
      </DialogTrigger>
      {/* prevent dialog from closing from clicking outside */}
      <DialogContent
        onPointerDownOutside={(event) => event.preventDefault()}
        showClose={isLoading}
      >
        <DialogHeader>
          <DialogTitle>
            {isLoading ? "Hang Tight" : "Confirm your options"}
          </DialogTitle>

          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <>
              <DialogDescription>
                <span>Prompt: {prompt}</span>
                <br />
                <span>Color: {selectedColor}</span>
                {optionsQuery.data ? (
                  <>
                    <br />
                    <span>
                      Style:{" "}
                      {
                        optionsQuery.data.find((v) => v.type === selectedStyle)
                          ?.label
                      }
                    </span>
                  </>
                ) : (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                <br />
                <span>Number of images: {numImages}</span>
              </DialogDescription>
              <div className="flex justify-end gap-2">
                <Button
                  variant={"danger"}
                  className="max-w-min"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="max-w-min"
                  variant={"success"}
                  onClick={() => {
                    void generate().then(() => {
                      setOpen(false);
                      addToast({
                        description:
                          "We'll redirect you to your image" +
                          (numberImagesParsed.success &&
                          numberImagesParsed.data > 1
                            ? "s"
                            : ""),
                        title: "✅",
                        variant: "success",
                      });
                    });
                  }}
                >
                  Generate
                </Button>
              </div>
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

const addIfNotAlready = (options: Required<Parameters<typeof addToast>[0]>) => {
  const { meta } = options;

  const alreadyRanIntoThisError = useToastStore
    .getState()
    .toasts.find((t) => t.meta === meta);
  !alreadyRanIntoThisError && addToast(options);
};
