import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form/dist/types/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { LoadingSpinner } from "./loading";

import { strings } from "~/utils/strings";
import ImageUpload from "./imageUpload";
import CategorySelect from "./inputs/categorySelect";
import type { SelectValue } from "./inputs/categorySelect";
const {
  PRODUCT_NAME_LABEL,
  PRODUCT_DESCRIPTION_LABEL,
  PRODUCT_BARCODE_LABEL,
  PRODUCT_PRICE_LABEL,
  PRODUCT_IMAGE_UPLOAD_LABEL,
  PRODUCT_CATEGORY_LABEL,
  REQUIRED,
  IMAGE_REQUIRED,
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
    invalid_type_error: "Barcode is required",
  }),
  price: z.number({
    required_error: "Price is required",
    invalid_type_error: "Price is required",
  }),
  category: z.object({
    label: z.string().nonempty({ message: "Category is required" }),
    value: z.string().nonempty({ message: "Category is required" }),
  }),
  imageSrc: z.string().nonempty(),
});

export type AddProductFormData = z.infer<typeof formSchema>;

export type AddProductFormProps = {
  onSubmit:
    | SubmitHandler<AddProductFormData>
    | ((data: AddProductFormData) => void);
  mutationInProgress: boolean;
};

const AddProductForm: FC<AddProductFormProps> = ({
  mutationInProgress,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddProductFormData>({ resolver: zodResolver(formSchema) });

  const watchImageSrc = watch("imageSrc");
  const watchCategory = watch("category");

  type customValueId = "imageSrc" | "category";
  const setCustomValue = (id: customValueId, value: string | SelectValue) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

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
            {...register("barcode", { valueAsNumber: true })}
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
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-sm  text-red-600">{errors.price.message}</p>
          )}
        </div>
      </div>
      <div className="form-control mb-5 flex-1">
        <label htmlFor="cat">{PRODUCT_CATEGORY_LABEL}</label>
        <CategorySelect
          value={watchCategory}
          onChange={(value) => setCustomValue("category", value)}
        />
        {errors.category && (
          <p className="text-sm text-red-600">
            {errors.category.label?.message ||
              errors.category.value?.message ||
              "Category is required"}
          </p>
        )}
      </div>
      <div className="form-control mb-5 flex-1">
        <label htmlFor="imgUpload">{PRODUCT_IMAGE_UPLOAD_LABEL}</label>
        <ImageUpload
          value={watchImageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
        {errors.imageSrc && (
          <p className="text-sm text-red-600">
            {errors.imageSrc.message === REQUIRED
              ? IMAGE_REQUIRED
              : errors.imageSrc.message}
          </p>
        )}
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
