import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { BiCategory } from "react-icons/bi";
import { toast } from "react-hot-toast";

import PageLayout from "~/components/layout";
import Modal from "~/components/modal";
import AddCategoryForm from "~/components/addCategoryForm";
import type { FormData } from "~/components/addCategoryForm";

import { META_DESCRIPTION, META_TITLE } from "~/utils/constants";
import { strings } from "~/utils/strings";
import { api } from "~/utils/api";
import { LoadingSpinner } from "~/components/loading";

const Home: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { ADD_PRODUCT_CAT_MODAL_TITLE, LOREM_IPSUM } = strings;

  // trpc cache context
  const ctx = api.useContext();

  const { data: categories, isLoading: isLoadingCategories } =
    api.category.getAll.useQuery();

  const { mutate: createCategory, isLoading: isAddingCategory } =
    api.category.create.useMutation({
      onSuccess: () => {
        toast.success("Category added");
        setShowModal(false);
        void ctx.category.getAll.invalidate();
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });

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
            className="text-bold fixed right-5 top-40 underline shadow-xl transition-all hover:translate-x-[-3px]"
          >
            <BiCategory className="h-12 w-12 rounded bg-black p-2 text-white" />
          </button>
          <Modal
            icon={
              <BiCategory className="h-6 w-6 text-white" aria-hidden="true" />
            }
            title={ADD_PRODUCT_CAT_MODAL_TITLE}
            description={LOREM_IPSUM}
            open={showModal}
            setOpen={setShowModal}
          >
            <AddCategoryForm
              onSubmit={(data: FormData) => createCategory(data)}
              mutationInProgress={isAddingCategory}
            />
          </Modal>
          <div>
            {isLoadingCategories ? (
              <LoadingSpinner />
            ) : (
              <ul>
                {categories?.map((c) => (
                  <li key={c.id}>{c.category}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default Home;
