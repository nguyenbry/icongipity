import AWS from "aws-sdk";
import { env } from "~/env.mjs";

export const BUCKET_PREFIX = "icongipity"; // what folder do we want to store our images in?

const s3 = new AWS.S3({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  region: env.AWS_REGION,
});

export default s3;
