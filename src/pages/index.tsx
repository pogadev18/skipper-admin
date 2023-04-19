import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { MdProductionQuantityLimits } from "react-icons/md";

import { META_DESCRIPTION, META_TITLE } from "~/utils/constants";
import PageLayout from "~/components/layout";
import Modal from "~/components/modal";
import { strings } from "~/utils/strings";

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { ADD_PRODUCT_CAT_MODAL_TITLE, ADD_PRODUCT_CAT_MODAL_DESCRIPTION } =
    strings;

  return (
    <>
      <Head>
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <section className="mt-5">
          <button
            onClick={() => setShowModal(true)}
            className="rounded bg-lime-600 p-2 text-white transition-all hover:bg-lime-700 "
          >
            add product category
          </button>
          <Modal
            icon={
              <MdProductionQuantityLimits
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            }
            title={ADD_PRODUCT_CAT_MODAL_TITLE}
            description={ADD_PRODUCT_CAT_MODAL_DESCRIPTION}
            open={showModal}
            setOpen={setShowModal}
          >
            <p>add categories</p>
          </Modal>
        </section>
      </PageLayout>
    </>
  );
};

export default Home;
