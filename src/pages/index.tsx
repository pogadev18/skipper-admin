import { type NextPage } from "next";
import Head from "next/head";

import { META_DESCRIPTION, META_TITLE } from "~/utils/constants";
import PageLayout from "~/components/layout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <p>hello</p>
      </PageLayout>
    </>
  );
};

export default Home;
