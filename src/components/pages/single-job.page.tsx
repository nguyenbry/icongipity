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
      <div className="flex flex-col px-40 pt-10">
        <h1 className="text-6xl font-semibold tracking-tighter dark:text-white">
          Your Icons
        </h1>
        {jobQuery.data.images.map((image) => (
          <Image
            key={image}
            alt="icon"
            src={env.NEXT_PUBLIC_AWS_S3_BUCKET_URL + image}
            width={512}
            height={512}
          />
        ))}
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
