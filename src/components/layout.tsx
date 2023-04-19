import type { PropsWithChildren } from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";

import Sidebar from "./sidebar";

const Header = () => {
  return (
    <header className="flex h-12 items-center justify-between border-b border-slate-300">
      <h1 className="text-xl font-bold uppercase">Skipper Admin</h1>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="min-h-screen bg-gray-100 ">
      <Sidebar />
      <section className="px-28 pt-4">
        <Header />
        <div className="content">{props.children}</div>
      </section>
    </main>
  );
};

export default PageLayout;
