"use client";
import { useEffect, useRef } from "react";
import { useField } from "formik";
import { CldImage } from "next-cloudinary";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { ErrorMessage } from "formik";
import { X, ImagePlus } from "lucide-react";

export type ImageItem =
  | { kind: "existing"; id: string; publicId: string; url: string }
  | { kind: "new"; id: string; file: File; previewUrl: string };

interface Props {
  label: string;
  name: string;
  maxFiles?: number;
}

export default function ImageInput({ label, name, maxFiles = 5 }: Props) {
  const [field, , helpers] = useField<ImageItem[]>(name);
  const images = field.value ?? [];
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.kind === "new") URL.revokeObjectURL(img.previewUrl);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilesSelected = (fileList: FileList | null) => {
    if (!fileList) return;

    const remainingSlots = maxFiles - images.length;
    const files = Array.from(fileList).slice(0, remainingSlots);

    const newImages: ImageItem[] = files.map((file) => ({
      kind: "new",
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    helpers.setValue([...images, ...newImages]);
    helpers.setTouched(true, false);

    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = (id: string) => {
    const target = images.find((img) => img.id === id);
    if (target?.kind === "new") URL.revokeObjectURL(target.previewUrl);

    // Note: removing an "existing" image here does NOT delete it from
    // Cloudinary immediately — it's only removed from the form array.
    // ProductForm diffs against the original set on successful submit
    // and deletes there, so an abandoned edit never loses a live image.
    helpers.setValue(images.filter((img) => img.id !== id));
    helpers.setTouched(true, false);
  };

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((img) => (
            <div key={img.id} className="relative">
              {img.kind === "existing" ? (
                <CldImage
                  src={img.publicId}
                  alt=""
                  width={120}
                  height={120}
                  className="rounded-md object-cover"
                />
              ) : (
                <img
                  src={img.previewUrl}
                  alt=""
                  width={120}
                  height={120}
                  className="rounded-md object-cover w-30 h-30"
                />
              )}
              <button
                type="button"
                onClick={() => handleRemove(img.id)}
                className="absolute -top-2 -right-2 bg-black/70 text-white rounded-full p-1"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length < maxFiles && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            hidden
            onChange={(e) => handleFilesSelected(e.target.files)}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex items-center gap-2 border border-input bg-white dark:bg-[#212121] rounded-md p-2 text-sm"
          >
            <ImagePlus size={16} />
            Select images
          </button>
        </>
      )}

      <ErrorMessage
        name={name}
        component={FieldError}
        className="text-red-500 text-sm"
      />
    </Field>
  );
}
