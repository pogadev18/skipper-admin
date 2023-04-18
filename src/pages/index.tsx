import { type NextPage } from "next";
import Head from "next/head";
import { SignedIn, UserButton } from "@clerk/nextjs";

import { META_DESCRIPTION, META_TITLE } from "~/utils/constants";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <h1>Hello</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </main>
    </>
  );
};

export default Home;
