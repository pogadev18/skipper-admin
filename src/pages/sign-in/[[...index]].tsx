import { type NextPage } from "next";
import Head from "next/head";
import { SignIn } from "@clerk/nextjs";

import { META_TITLE, META_DESCRIPTION } from "~/utils/constants";

const SignInPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </main>
    </>
  );
};

export default SignInPage;
