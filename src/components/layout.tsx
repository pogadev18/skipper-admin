import type { PropsWithChildren } from "react";

import Sidebar from "./sidebar";
import Header from "./header";

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
