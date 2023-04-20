import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export const formSchema = z.object({
  category: z
    .string()
    .min(3, "Add at least 3 charachters")
    .max(20, "Maximum 20 charachters")
    .nonempty("Category is required"),
});

export type FormData = z.infer<typeof formSchema>;

const AddCategoryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const addCategory = (data: FormData) => {
    console.log("data", data);
  };

  return (
    <form noValidate onSubmit={handleSubmit(addCategory)}>
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
      <button
        disabled={isSubmitting}
        type="submit"
        className="w-1/2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white"
      >
        Add
      </button>
    </form>
  );
};

export default AddCategoryForm;
