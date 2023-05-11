import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { openai } from "~/server/openai";
import s3, { BUCKET_PREFIX } from "~/server/s3";
import { v4 as uuidv4 } from "uuid";
import { env } from "~/env.mjs";
import { PromptGenMap, PromptType } from "./utils";

const uploadImage = async (userId: string, jobId: string, imageB64: string) => {
  const imageId = uuidv4();
  const storeItAt = `${BUCKET_PREFIX}/${userId}/${jobId}/${imageId}.png`;

  await s3
    .upload({
      Bucket: env.AWS_BUCKET_NAME,
      Key: storeItAt,
      Body: Buffer.from(imageB64, "base64"),
      ContentType: "image/png",
      ACL: "public-read",
    })
    .promise();
};

const generateImages = (prompt: string, nRequested: number, userId: string) =>
  openai.createImage({
    prompt,
    n: nRequested,
    response_format: "b64_json",
    size: "1024x1024",
    user: userId,
  });

const sendNotifToDiscord = async (prompt: string) => {
  return fetch(env.DISCORD_WEBHOOK, {
    method: "POST",
    body: JSON.stringify({
      content: `New job created! \`${prompt}\``,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const generateRouter = createTRPCRouter({
  icon: protectedProcedure
    .input(
      z.object({
        noun: z.string(),
        nRequested: z.number().int().min(1).max(10),
        type: PromptType,
        color: z.string(),
      })
    )
    .mutation(
      async ({
        input: { nRequested, noun, type, color },
        ctx: { userId, prisma },
      }) => {
        const prompt = PromptGenMap[type](noun, color);

        await sendNotifToDiscord(prompt);

        const getErr = () => {
          return new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `There was an error generating your image${
              nRequested === 1 ? "" : "s"
            }. Your credits have not been used. Please try again.`,
          });
        };

        // generate the images
        const response = await generateImages(prompt, nRequested, userId);

        if (response.status !== 200) {
          throw getErr();
        }

        // generate a job we can update later
        const { id: jobId, deleteJob } = await prisma.job
          .create({
            data: { nRequested, userId, nCompleted: 0, prompt: prompt },
          })
          .then((job) => ({
            id: job.id,
            deleteJob: () => prisma.job.delete({ where: { id: job.id } }),
          }));

        console.log("new jobid", jobId);
        if (response.data.created === 0) {
          await deleteJob(); // delete the job if no images were uploaded
          throw getErr();
        }

        const uploadPromises = response.data.data.map((imageData) =>
          uploadImage(userId, jobId, imageData.b64_json as string)
        );

        const results = await Promise.allSettled(uploadPromises);

        const nCompleted = results.filter(
          (x) => x.status === "fulfilled"
        ).length;

        console.log("completed", nCompleted);

        if (nCompleted === 0) {
          await deleteJob(); // delete the job if no images were uploaded
          throw getErr();
        }

        await prisma.job.update({ where: { id: jobId }, data: { nCompleted } });
        return jobId;
      }
    ),
});
