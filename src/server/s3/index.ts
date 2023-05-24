import AWS from "aws-sdk";
import { env } from "~/env.mjs";

export const BUCKET_PREFIX = "icongipity"; // what folder do we want to store our images in?

const s3 = new AWS.S3({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.AWS_REGION,
});

export const getImagePathsForKey = async (key: string): Promise<string[]> => {
  const result = await s3
    .listObjectsV2({
      Bucket: env.AWS_BUCKET_NAME,
      Prefix: key,
    })
    .promise();

  if (!result.Contents) {
    throw new Error("AWS images do not exist");
  }

  const paths: string[] = [];

  result.Contents.forEach((c) => {
    if (!c.Key) throw new Error("AWS image has invalid link");

    if (c.Key.endsWith("/")) return; // ignore folders (e.g. "icongipity/1234/5678/"
    paths.push(`/${c.Key}`);
  });

  return paths;
};

export default s3;
