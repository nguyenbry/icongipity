import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { BUCKET_PREFIX } from "~/server/s3";
import { type Job } from "@prisma/client";
import { getImagePathsForKey } from "~/server/s3";

const getImagePathsForJob = async (jobId: string, userId: string) => {
  return await getImagePathsForKey(`${BUCKET_PREFIX}/${userId}/${jobId}`);
};

const appendImagesArrayToJob = async (job: Job, uid: string) => {
  const images = await getImagePathsForJob(job.id, uid);
  return { ...job, images };
};

export const jobRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.string())
    .query(async ({ input: jobId, ctx: { prisma, userId } }) => {
      const job = await prisma.job.findUnique({ where: { id: jobId } });
      console.log("job found", job);

      if (!job || job.userId !== userId || job.nCompleted === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Job not found",
        });
      }

      return await appendImagesArrayToJob(job, userId);
    }),

  getAll: protectedProcedure.query(async ({ ctx: { prisma, userId } }) => {
    const jobs = await prisma.job.findMany({
      where: { userId, nCompleted: { gt: 0 } }, // only show jobs with at least one completed image (new tasks have default nCompleted = 0)
      orderBy: [{ createdAt: "desc" }],
    });

    const out = jobs.map((j) => appendImagesArrayToJob(j, userId));
    return await Promise.all(out);
  }),
});
