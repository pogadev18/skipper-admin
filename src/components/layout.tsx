import type { PropsWithChildren } from "react";
import Sidebar from "./sidebar";

const Header = () => {
  return (
    <header>
      <h1 className="font-bold uppercase">Skipper Admin</h1>
    </header>
  );
};

const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="min-h-screen bg-gray-100 ">
      <Sidebar />
      <section className="pl-28 pt-4">
        <Header />
        <div className="content">{props.children}</div>
      </section>
    </main>
  );
};

export default PageLayout;
