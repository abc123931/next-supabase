import "../src/style/index.css";

import type { CustomAppPage } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { SetSupabaseAuth } from "src/component/SetSupabaseAuth";

const App: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout =
    Component.getLayout ||
    ((page) => {
      return page;
    });

  return (
    <>
      <Head>
        <title>nexst</title>
      </Head>
      <SessionProvider session={pageProps.session} refetchInterval={10}>
        <SetSupabaseAuth>
          {getLayout(<Component {...pageProps} />)}
        </SetSupabaseAuth>
      </SessionProvider>
    </>
  );
};

export default App;
