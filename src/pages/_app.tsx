import { Viewport } from "@radix-ui/react-toast";
import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { api } from "~/utils/api";
import { Inter } from "next/font/google";
import { Provider as ToastProvider } from "@radix-ui/react-toast";
import { type AppProps } from "next/app";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import Head from "next/head";
import type { NextPageWithLayout } from "~/types/next-page-with-layout";
import { AllToasts } from "~/components/toast/all-toasts";

const inter = Inter({ subsets: ["latin"] });

/**
 * modify AppProps to include session from tRPC and so that
 *  it can be used with layouts
 */
type AppPropertiesWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropertiesWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  const isProtected = Component.protected;

  const page = <Component {...pageProps} />;
  const toRender = isProtected ? (
    <>
      <SignedIn>{page}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  ) : (
    page
  );

  return (
    <>
      <Head>
        <title>Icon GiPiTy</title>
        <meta name="description" content="AI-generated objects" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider
        attribute="class"
        value={{ dark: "dark-theme" }}
        storageKey="gipity-theme"
      >
        <ToastProvider swipeDirection="right">
          <div className={`${inter.className} flex min-h-screen flex-col`}>
            <ClerkProvider {...pageProps}>{getLayout(toRender)}</ClerkProvider>
          </div>
          <Viewport className="fixed left-0 right-0 top-4 z-[3] flex flex-col gap-2 px-4 md:bottom-4 md:right-auto md:top-auto" />
          <AllToasts />
        </ToastProvider>
      </ThemeProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
