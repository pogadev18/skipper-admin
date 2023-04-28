import { useState } from "react";
import { type NextPage } from "next";
import { BiCategory } from "react-icons/bi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { toast } from "react-hot-toast";
import Head from "next/head";

import PageLayout from "~/components/layout";
import Modal from "~/components/modal";
import AddCategoryForm from "~/components/addCategoryForm";
import type { FormData } from "~/components/addCategoryForm";
import AddProductForm from "~/components/addProductForm";
import type { AddProductFormData } from "~/components/addProductForm";

import { META_DESCRIPTION, META_TITLE } from "~/utils/constants";
import { strings } from "~/utils/strings";
import { api } from "~/utils/api";

const CreatePage: NextPage = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);

  const {
    ADD_PRODUCT_CAT_MODAL_TITLE,
    LOREM_IPSUM,
    ADD_PRODUCT_MODAL_TITLE,
    CATEGORY_ADDED_SUCCESS,
    PRODUCT_ADDED_SUCCESS,
  } = strings;

  // trpc cache context
  const ctx = api.useContext();

  const { mutate: createCategory, isLoading: isAddingCategory } =
    api.category.create.useMutation({
      onSuccess: () => {
        toast.success(CATEGORY_ADDED_SUCCESS);
        setShowCategoryModal(false);
        void ctx.category.getAll.invalidate();
      },
      onError: (e) => {
        toast.error(e.message);
      },
    });

  const { mutate: createProduct, isLoading: isAddingProduct } =
    api.product.create.useMutation({
      onSuccess: () => {
        toast.success(PRODUCT_ADDED_SUCCESS);
        setShowProductModal(false);
        void ctx.product.getAll.invalidate();
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
          <h1 className="text-3xl">Create</h1>

          <button
            onClick={() => setShowCategoryModal(true)}
            className="text-bold fixed right-5 top-40 underline shadow-xl transition-all hover:translate-x-[-3px]"
          >
            <BiCategory className="h-12 w-12 rounded bg-black p-2 text-white" />
          </button>
          <button
            onClick={() => setShowProductModal(true)}
            className="text-bold fixed right-5 top-60 underline shadow-xl transition-all hover:translate-x-[-3px]"
          >
            <MdOutlineProductionQuantityLimits className="h-12 w-12 rounded bg-black p-2 text-white" />
          </button>
          <Modal
            icon={
              <BiCategory className="h-6 w-6 text-white" aria-hidden="true" />
            }
            title={ADD_PRODUCT_CAT_MODAL_TITLE}
            description={LOREM_IPSUM}
            open={showCategoryModal}
            setOpen={setShowCategoryModal}
          >
            <AddCategoryForm
              onSubmit={(data: FormData) => createCategory(data)}
              mutationInProgress={isAddingCategory}
            />
          </Modal>
          <Modal
            icon={
              <MdOutlineProductionQuantityLimits
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            }
            title={ADD_PRODUCT_MODAL_TITLE}
            description={LOREM_IPSUM}
            open={showProductModal}
            setOpen={setShowProductModal}
          >
            <AddProductForm
              onSubmit={(data: AddProductFormData) => createProduct(data)}
              mutationInProgress={isAddingProduct}
            />
          </Modal>
        </section>
      </PageLayout>
    </>
  );
};

export default CreatePage;
