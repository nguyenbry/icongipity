/**
 * Use these types if your component uses a layout
 *
 * See https://nextjs.org/docs/basic-features/layouts
 */

import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  protected: boolean;
};
