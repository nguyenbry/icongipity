import MainLayout from "~/components/layouts/MainLayout";
import { type NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ParsedUrlQuery } from "querystring";
import { api } from "~/utils/api";
import Image from "next/image";
import { env } from "~/env.mjs";

const JobIdPage: NextPageWithLayout = () => {
  const { query, isReady, push } = useRouter();

  const { jobId } = query as ParsedUrlQuery & { jobId?: string };

  const jobQuery = api.job.get.useQuery(jobId ?? "", { enabled: isReady });

  if (isReady && !jobId) {
    return <div>404</div>;
  }

  if (!isReady) {
    return <div>loading</div>;
  }

  if (jobQuery.isSuccess) {
    return (
      <>
        <pre>{JSON.stringify(jobQuery.data, null, 2)}</pre>
        {jobQuery.data.images.map((image) => (
          <Image
            key={image}
            alt="icon"
            src={env.NEXT_PUBLIC_AWS_S3_BUCKET_URL + image}
            width={512}
            height={512}
          />
        ))}
      </>
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

JobIdPage.getLayout = MainLayout;
JobIdPage.protected = true;

export default JobIdPage;
