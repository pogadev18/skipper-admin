import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import type { FC } from "react";

import { strings } from "~/utils/strings";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cloudinary: any;
}

type ImageUploadProps = {
  onChange: (value: string) => void;
  value: string;
};

type Result = {
  info: {
    secure_url: string;
  };
};

const ImageUpload: FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUpload = useCallback(
    (result: Result) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="yobsoilt"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            onClick={() => open?.()}
            className="
          relative
          flex
          cursor-pointer
          flex-col
          items-center 
          justify-center 
          gap-4 
          border-2
          border-dashed
          border-neutral-300
          p-20
          text-neutral-600
          transition
          hover:opacity-70
        "
          >
            <TbPhotoPlus size={50} />
            <div className="text-lg font-semibold">
              {strings.CLICK_TO_UPLOAD}
            </div>
            {value && (
              <div
                className="
              absolute inset-0 h-full w-full"
              >
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                  alt="Product Image"
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
