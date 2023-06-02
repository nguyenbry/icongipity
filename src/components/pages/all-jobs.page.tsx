import MainLayout from "~/components/layouts/MainLayout";
import { type NextPageWithLayout } from "~/types/NextPageWithLayout";
import { api, type RouterOutputs } from "~/utils/api";
import {
  IconLoader2,
  IconExternalLink,
  IconList,
  IconLayoutGrid,
} from "@tabler/icons-react";
import { env } from "~/env.mjs";
import Image from "next/image";
import Link from "next/link";
import { YourObjectsHeader } from "~/components/your-icons-header";
import { Tabs } from "~/components/tabs";
import { useState } from "react";

const IMAGE_SIZE = 185;

const JobCard: React.FC<RouterOutputs["job"]["get"]> = ({
  // createdAt,
  id,
  images,
  // nCompleted,
  // nRequested,
  prompt,
  // userId,
}) => {
  return (
    <div
      key={id}
      className="flex flex-col gap-12 border-b border-slate-700 p-6"
    >
      <span className="text-xl font-medium italic leading-loose tracking-tighter underline underline-offset-[11px]">
        {prompt}
      </span>
      <div className="flex flex-wrap justify-evenly px-4">
        {images.map((image, i) => (
          <div key={image} className="group p-8">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={env.NEXT_PUBLIC_AWS_S3_BUCKET_URL + image}
            >
              <Image
                className="rounded-xl ring-2 ring-black ring-offset-4 transition-all group-hover:scale-150 group-hover:ring-teal-600 dark:ring-slate-700 dark:ring-offset-neutral-900"
                alt={`Variation ${i + 1}: ${prompt}`}
                src={env.NEXT_PUBLIC_AWS_S3_BUCKET_URL + image}
                width={IMAGE_SIZE}
                height={IMAGE_SIZE}
              />
            </a>
          </div>
        ))}
      </div>
      <Link href={"/jobs/" + id}>
        <IconExternalLink className="ml-auto hover:text-white" />
      </Link>
    </div>
  );
};

const TABS = [
  { label: "List View", icon: IconList },
  { label: "Grid View", icon: IconLayoutGrid },
] as const;

const AllJobs: NextPageWithLayout = () => {
  const allJobsQuery = api.job.getAll.useQuery();

  const [currentTab, setCurrentTab] =
    useState<(typeof TABS)[number]["label"]>("List View");

  if (!allJobsQuery.isSuccess) {
    return (
      <div className="grid grow place-content-center dark:text-white">
        <div className="grid grow place-content-center dark:text-white">
          <IconLoader2 className="animate-spin" size={40} />
        </div>
      </div>
    );
  }

  const jobs = allJobsQuery.data;

  return (
    <div className="mb-32 flex grow flex-col gap-8 dark:text-neutral-500 xl:px-40">
      <div className="flex items-center justify-between px-8">
        <YourObjectsHeader />

        <div className="inline-flex gap-3">
          {allJobsQuery.isFetching && (
            <IconLoader2 className="animate-spin" size={40} />
          )}
          <Tabs tabs={TABS} value={currentTab} onChange={setCurrentTab} />
        </div>
      </div>

      {currentTab === "List View" &&
        jobs.map((job) => {
          return <JobCard key={job.id} {...job} />;
        })}
      {currentTab === "Grid View" && (
        <div className="flex flex-wrap justify-center">
          {jobs
            .map((job) => job.images)
            .flat()
            .map((image) => {
              return (
                <div key={image} className="group p-8">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={env.NEXT_PUBLIC_AWS_S3_BUCKET_URL + image}
                  >
                    <Image
                      className="rounded-xl ring-2 ring-black ring-offset-4 transition-all group-hover:scale-150 group-hover:ring-teal-600 dark:ring-slate-700 dark:ring-offset-neutral-900"
                      alt={image}
                      src={env.NEXT_PUBLIC_AWS_S3_BUCKET_URL + image}
                      width={IMAGE_SIZE}
                      height={IMAGE_SIZE}
                    />
                  </a>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

AllJobs.protected = true;
AllJobs.getLayout = MainLayout;

export default AllJobs;
