import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form/dist/types/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { LoadingSpinner } from "./loading";

import { strings } from "~/utils/strings";
const {
  PRODUCT_NAME_LABEL,
  PRODUCT_DESCRIPTION_LABEL,
  PRODUCT_BARCODE_LABEL,
  PRODUCT_PRICE_LABEL,
} = strings;

export const formSchema = z.object({
  name: z
    .string()
    .min(3, "Name must contain at least 3 charachters")
    .max(20, "Maximum 20 charachters")
    .nonempty("Name is required"),
  description: z
    .string()
    .min(10, "Description must contain at least 3 charachters")
    .nonempty("Description is required"),
  barcode: z.number({
    required_error: "Barcode is required",
    invalid_type_error: "Barcode is required and must be a number",
  }),
  price: z.number({
    required_error: "Price is required",
    invalid_type_error: "Price is required and must be a number",
  }),
  categoryId: z.string().nonempty("Category is required"),
});

export type FormData = z.infer<typeof formSchema>;

export type AddProductFormProps = {
  onSubmit: SubmitHandler<FormData> | ((data: FormData) => void);
  mutationInProgress: boolean;
};

const AddProductForm: FC<AddProductFormProps> = ({
  mutationInProgress,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control mb-5">
        <label htmlFor="name">{PRODUCT_NAME_LABEL}</label>
        <input
          className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          id="name"
          type="text"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm  text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div className="form-control mb-5">
        <label htmlFor="description">{PRODUCT_DESCRIPTION_LABEL}</label>
        <textarea
          id="description"
          rows={5}
          className="block w-full resize-none rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm  text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="form-control-group flex justify-between gap-2">
        <div className="form-control mb-5 flex-1">
          <label htmlFor="barcode">{PRODUCT_BARCODE_LABEL}</label>
          <input
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            id="barcode"
            type="number"
            {...register("barcode")}
          />
          {errors.barcode && (
            <p className="text-sm  text-red-600">{errors.barcode.message}</p>
          )}
        </div>
        <div className="form-control mb-5 flex-1">
          <label htmlFor="price">{PRODUCT_PRICE_LABEL}</label>
          <input
            className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            id="price"
            type="number"
            {...register("price")}
          />
          {errors.price && (
            <p className="text-sm  text-red-600">{errors.price.message}</p>
          )}
        </div>
      </div>
      {mutationInProgress ? (
        <div className="my-4">
          <LoadingSpinner size={32} />
        </div>
      ) : (
        <button
          disabled={mutationInProgress}
          type="submit"
          className="my-4 rounded-lg bg-green-600 px-10 py-2.5 text-center text-sm font-medium text-white disabled:bg-slate-500"
        >
          {strings.ADD}
        </button>
      )}
    </form>
  );
};

export default AddProductForm;
