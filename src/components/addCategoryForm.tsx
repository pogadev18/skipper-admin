import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form/dist/types/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { LoadingSpinner } from "./loading";

export const formSchema = z.object({
  category: z
    .string()
    .min(3, "Add at least 3 charachters")
    .max(20, "Maximum 20 charachters")
    .nonempty("Category is required"),
});

export type FormData = z.infer<typeof formSchema>;

type AddCategoryFormProps = {
  onSubmit: SubmitHandler<FormData> | ((data: FormData) => void);
  mutationInProgress: boolean;
};

const AddCategoryForm: FC<AddCategoryFormProps> = ({
  onSubmit,
  mutationInProgress,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="category">Category</label>
      <input
        className="block w-full rounded-lg rounded-br-none rounded-tr-none border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        id="category"
        type="text"
        {...register("category")}
      />
      {errors.category && (
        <p className="text-sm  text-red-600">{errors.category.message}</p>
      )}
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
          Add
        </button>
      )}
    </form>
  );
};

export default AddCategoryForm;
