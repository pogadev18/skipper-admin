import { type NextPage } from "next";
import Head from "next/head";
import PageLayout from "~/components/layout";

import { META_DESCRIPTION, META_TITLE } from "~/utils/constants";

import { api } from "~/utils/api";
import { LoadingSpinner } from "~/components/loading";
import ProductCard from "~/components/productCard";

const Home: NextPage = () => {
  const { data: products, isLoading: loadingProducts } =
    api.product.getAll.useQuery();

  return (
    <>
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <section className="mt-5">
          <h1>hello</h1>
          {loadingProducts ? (
            <LoadingSpinner />
          ) : (
            <ul className="flex justify-between">
              {products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>
          )}
        </section>
      </PageLayout>
    </>
  );
};

export default Home;
