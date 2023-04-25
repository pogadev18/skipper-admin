import type { FC } from "react";
import Select from "react-select";

import { api } from "~/utils/api";

export type SelectValue = {
  label: string;
  value: string;
};

type CategorySelectProps = {
  value?: SelectValue;
  onChange: (value: SelectValue) => void;
};

const CategorySelect: FC<CategorySelectProps> = ({ value, onChange }) => {
  const { data: categories } = api.category.getAll.useQuery();

  const formattedCategories = categories?.map((category) => ({
    label: category.category,
    value: category.id,
  }));

  return (
    <div>
      <Select
        placeholder="Select Category"
        isClearable
        options={formattedCategories}
        value={value}
        // onChange={(value) => onChange(value as SelectValue)}
        onChange={(selectedValue) => {
          if (selectedValue) {
            onChange(selectedValue);
          } else {
            onChange({ label: "", value: "" });
          }
        }}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default CategorySelect;
