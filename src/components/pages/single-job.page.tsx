import MainLayout from "~/components/layouts/MainLayout";
import { type NextPageWithLayout } from "~/types/NextPageWithLayout";
import { useRouter } from "next/router";
import { type ParsedUrlQuery } from "querystring";
import { api } from "~/utils/api";
import Image from "next/image";
import { env } from "~/env.mjs";

const SingleJobPage: NextPageWithLayout = () => {
  const { query, isReady } = useRouter();

  const { jobId } = query as ParsedUrlQuery & { jobId?: string };

  const jobQuery = api.job.get.useQuery(jobId ?? "", { enabled: isReady });

  if (isReady && !jobId) {
    return <div>404</div>;
  }

  if (!isReady) {
    return <div>loading</div>;
  }

  if (jobQuery.isSuccess) {
    // const { prompt } = jobQuery.data;
    return (
      <div className="flex w-full flex-col px-4 py-10 lg:px-40">
        <h1 className="relative text-6xl font-black tracking-tighter dark:text-white">
          {jobQuery.data.prompt}
        </h1>
        <div className="mt-24 flex flex-wrap justify-center">
          {jobQuery.data.images.map((image) => (
            <Image
              key={image}
              alt="icon"
              className="m-10 rounded-xl ring-2 ring-black ring-offset-4 transition-all dark:ring-slate-700 dark:ring-offset-neutral-900"
              src={env.NEXT_PUBLIC_AWS_S3_BUCKET_URL + image}
              width={350}
              height={350}
            />
          ))}
        </div>
      </div>
    );
  }

  if (jobQuery.isLoading) {
    return <div>loading</div>;
  } else {
  }

  if (jobQuery.isError) {
    return <div>error</div>;
  }

  return <div>JobIdPage</div>;
};

SingleJobPage.getLayout = MainLayout;
SingleJobPage.protected = true;

export default SingleJobPage;
