import "~/styles/globals.css";

import { api } from "~/utils/api";
import type { ReactElement, ReactNode } from "react";
import { MantineProvider } from "@mantine/core";

import { type NextPage } from "next";
import { type AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

/**
 * Use these types if your component uses a layout
 *
 * See https://nextjs.org/docs/basic-features/layouts
 */
// eslint-disable-next-line
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

/**
 * modify AppProps to include session from tRPC and so that
 *  it can be used with layouts
 */
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "light",
        // colorScheme: "dark",
      }}
    >
      <ClerkProvider {...pageProps}>
        {getLayout(<Component {...pageProps} />)}
      </ClerkProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
