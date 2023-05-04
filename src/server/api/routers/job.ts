import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import s3, { BUCKET_PREFIX } from "~/server/s3";
import { env } from "~/env.mjs";

const getImagePathsForJob = async (
  jobId: string,
  userId: string
): Promise<string[]> => {
  console.log("finding images for", userId, jobId);

  const result = await s3
    .listObjectsV2({
      Bucket: env.AWS_BUCKET_NAME,
      Prefix: `${BUCKET_PREFIX}/${userId}/${jobId}`,
    })
    .promise();

  if (!result.Contents) {
    throw new Error("AWS images do not exist");
  }

  const paths: string[] = [];

  result.Contents.forEach((c) => {
    if (!c.Key) throw new Error("AWS image has invalid link");
    paths.push(`/${c.Key}`);
  });

  return paths;
};

export const jobRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.string())
    .query(async ({ input: jobId, ctx: { prisma, userId } }) => {
      const job = await prisma.job.findUnique({ where: { id: jobId } });

      if (!job || job.userId !== userId) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Job not found",
        });
      }

      const images = await getImagePathsForJob(jobId, userId);
      const out = { ...job, images };
      return out;
    }),
});
