"use client";
import { useEffect, useRef } from "react";
import { useField } from "formik";
import { CldImage } from "next-cloudinary";
import { Field, FieldLabel, FieldError } from "../ui/field";
import { ErrorMessage } from "formik";
import { X, ImagePlus, Star } from "lucide-react";

export type ImageItem =
  | {
      kind: "existing";
      id: string;
      publicId: string;
      url: string;
      isPrimary: boolean;
    }
  | {
      kind: "new";
      id: string;
      file: File;
      previewUrl: string;
      isPrimary: boolean;
    };

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
  }, []);

  const handleFilesSelected = (fileList: FileList | null) => {
    if (!fileList) return;

    const remainingSlots = maxFiles - images.length;
    const files = Array.from(fileList).slice(0, remainingSlots);
    const noImagesYet = images.length === 0;

    const newImages: ImageItem[] = files.map((file, i) => ({
      kind: "new",
      id: crypto.randomUUID(),
      file,
      previewUrl: URL.createObjectURL(file),
      // if the field was empty, make the very first newly-added image primary
      isPrimary: noImagesYet && i === 0,
    }));

    helpers.setValue([...images, ...newImages]);
    helpers.setTouched(true, false);

    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = (id: string) => {
    const target = images.find((img) => img.id === id);
    if (target?.kind === "new") URL.revokeObjectURL(target.previewUrl);

    const next = images.filter((img) => img.id !== id);

    // if we just removed the primary image, promote the next one so
    // there's always exactly one primary as long as images remain
    if (
      target?.isPrimary &&
      next.length > 0 &&
      !next.some((img) => img.isPrimary)
    ) {
      next[0] = { ...next[0], isPrimary: true };
    }

    helpers.setValue(next);
    helpers.setTouched(true, false);
  };

  const handleSetPrimary = (id: string) => {
    helpers.setValue(
      images.map((img) => ({ ...img, isPrimary: img.id === id })),
    );
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
                  className={`rounded-md object-cover w-30 h-30 ${
                    img.isPrimary ? "ring-1 ring-yellow-300" : ""
                  }`}
                />
              ) : (
                <img
                  src={img.previewUrl}
                  alt=""
                  width={120}
                  height={120}
                  className={`rounded-md object-cover w-30 h-30 ${
                    img.isPrimary ? "ring-1 ring-yellow-300" : ""
                  }`}
                />
              )}

              <button
                type="button"
                onClick={() => handleRemove(img.id)}
                className="absolute -top-2 -right-2 bg-black/70 text-white rounded-full p-1"
              >
                <X size={12} />
              </button>

              <button
                type="button"
                onClick={() => handleSetPrimary(img.id)}
                title={img.isPrimary ? "Primary image" : "Set as primary"}
                className={`absolute -bottom-2 -left-2 rounded-full p-1 ${
                  img.isPrimary
                    ? "bg-black/70 text-yellow-400"
                    : "bg-black/70 text-white"
                }`}
              >
                <Star
                  size={12}
                  fill={img.isPrimary ? "currentColor" : "none"}
                />
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
