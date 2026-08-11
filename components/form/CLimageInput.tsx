"use client";
import { useEffect, useRef } from "react";
import { useField } from "formik";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { ErrorMessage } from "formik";
import { X } from "lucide-react";

interface UploadedImage {
  publicId: string;
  url: string;
}

interface Props {
  label: string;
  name: string;
  maxFiles?: number;
}

export default function CLimageInput({ label, name, maxFiles = 5 }: Props) {
  const [field, , helpers] = useField<UploadedImage[]>(name);
  const images = field.value ?? [];

  // always-current ref so onSuccess never reads a stale array,
  // regardless of whether next-cloudinary rebinds the callback
  const imagesRef = useRef(images);
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  const handleRemove = (publicId: string) => {
    const next = imagesRef.current.filter((img) => img.publicId !== publicId);
    imagesRef.current = next;
    helpers.setValue(next);
    helpers.setTouched(true, false);
  };

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((img) => (
            <div key={img.publicId} className="relative">
              <CldImage
                src={img.publicId}
                alt=""
                width={120}
                height={120}
                className="rounded-md object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(img.publicId)}
                className="absolute -top-2 -right-2 bg-black/70 text-white rounded-full p-1"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length < maxFiles && (
        <CldUploadButton
          uploadPreset="ECommerce"
          className="border border-input bg-white dark:bg-[#212121] rounded-md p-2"
          options={{
            sources: ["local", "camera"],
            multiple: true,
            maxFiles: maxFiles - images.length,
            defaultSource: "local",
            cropping: false,
            showAdvancedOptions: false,
            clientAllowedFormats: ["jpg", "png", "webp"],
          }}
          onSuccess={(result) => {
            if (!result.event || result.event !== "success") return;
            const info = result.info as {
              public_id: string;
              secure_url: string;
            };

            const next = [
              ...imagesRef.current,
              { publicId: info.public_id, url: info.secure_url },
            ];
            imagesRef.current = next; // update ref immediately, synchronously
            helpers.setValue(next);
            helpers.setTouched(true, false);
          }}
        />
      )}

      <ErrorMessage
        name={name}
        component={FieldError}
        className="text-red-500 text-sm"
      />
    </Field>
  );
}
