import "~/styles/globals.css";

import { api } from "~/utils/api";
import type { ReactElement, ReactNode } from "react";
import { Inter } from "next/font/google";

import { type NextPage } from "next";
import { type AppProps } from "next/app";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

/**
 * Use these types if your component uses a layout
 *
 * See https://nextjs.org/docs/basic-features/layouts
 */
// eslint-disable-next-line
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  protected: boolean;
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

  const isProtected = Component.protected;

  const toRender = (
    <main className={classNames(inter.className, "dark:bg-neutral-900")}>
      {isProtected ? (
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      ) : (
        <Component {...pageProps} />
      )}
    </main>
  );

  return <ClerkProvider {...pageProps}>{getLayout(toRender)}</ClerkProvider>;
};

export default api.withTRPC(MyApp);
