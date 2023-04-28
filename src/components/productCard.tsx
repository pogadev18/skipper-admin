import type { Product } from "@prisma/client";
import type { FC } from "react";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({
  product: { imageSrc, name, description },
}) => {
  return (
    <li className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
      <a href="#">
        <Image
          width={240}
          height={240}
          className="rounded-t-lg"
          src={imageSrc}
          alt=""
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </li>
  );
};

export default ProductCard;
