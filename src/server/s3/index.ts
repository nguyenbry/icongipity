import AWS from "aws-sdk";
import { environment } from "~/environment.mjs";

export const BUCKET_PREFIX = "icongipity"; // what folder do we want to store our images in?

const s3 = new AWS.S3({
  accessKeyId: environment.AWS_ACCESS_KEY_ID,
  secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
  region: environment.AWS_REGION,
});

export const getImagePathsForKey = async (key: string): Promise<string[]> => {
  const result = await s3
    .listObjectsV2({
      Bucket: environment.AWS_BUCKET_NAME,
      Prefix: key,
    })
    .promise();

  if (!result.Contents) {
    throw new Error("AWS images do not exist");
  }

  const paths: string[] = [];

  for (const c of result.Contents) {
    if (!c.Key) throw new Error("AWS image has invalid link");

    if (c.Key.endsWith("/")) continue; // ignore folders (e.g. "icongipity/1234/5678/"
    paths.push(`/${c.Key}`);
  }

  return paths;
};

export default s3;
