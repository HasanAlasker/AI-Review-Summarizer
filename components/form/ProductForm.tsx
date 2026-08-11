"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import * as Yup from "yup";
import { FieldGroup } from "../ui/field";
import DropList from "./DropList";
import FormCard from "./FormCard";
import InputField from "./Input";
import ImageInput, { ImageItem } from "./ImageInput";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { Plus, Save } from "lucide-react";
import { toast } from "sonner";
import { FormikHelpers } from "formik";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Product name is required"),
  categoryId: Yup.string().required("Please select a category"),
  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(15)
    .max(500),
  images: Yup.array().min(1, "Please select at least one image"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
});

type ProductFormValues = {
  name: string;
  categoryId: string;
  description: string;
  images: ImageItem[];
  price: number | "";
  stock: number;
};

interface Props {
  categoryOptions: { value: string; label: string }[];
  mode?: "create" | "edit";
  productId?: string;
  initialData?: {
    name: string;
    categoryId: string;
    description: string;
    price: number;
    stock: number;
    images: { publicId: string; url: string; isPrimary: boolean }[];
  };
}

export default function ProductForm({
  categoryOptions,
  mode = "create",
  productId,
  initialData,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Submitting");
  const [err, setErr] = useState("");
  const router = useRouter();

  const initialValues: ProductFormValues = initialData
    ? {
        name: initialData.name,
        categoryId: initialData.categoryId,
        description: initialData.description,
        price: initialData.price,
        stock: initialData.stock,
        images: initialData.images.map((img) => ({
          kind: "existing" as const,
          id: img.publicId,
          publicId: img.publicId,
          url: img.url,
          isPrimary: img.isPrimary,
        })),
      }
    : {
        name: "",
        categoryId: "",
        description: "",
        images: [],
        price: "",
        stock: 1,
      };

  // snapshot of publicIds present at load time, to diff against on submit
  const originalPublicIds = new Set(
    initialData?.images.map((img) => img.publicId) ?? [],
  );

  const handleSubmit = async (
    values: ProductFormValues,
    { resetForm, setErrors }: FormikHelpers<ProductFormValues>,
  ) => {
    setErr("");
    setLoading(true);
    try {
      const newImages = values.images.filter(
        (img): img is Extract<ImageItem, { kind: "new" }> => img.kind === "new",
      );
      const keptExisting = values.images.filter(
        (img): img is Extract<ImageItem, { kind: "existing" }> =>
          img.kind === "existing",
      );

      setLoadingLabel(newImages.length ? "Uploading images" : "Submitting");
      const uploaded = await Promise.all(
        newImages.map(async (img) => ({
          ...(await uploadToCloudinary(img.file)),
          isPrimary: img.isPrimary,
        })),
      );

      setLoadingLabel("Submitting");
      const finalImages = [
        ...keptExisting.map((img) => ({
          publicId: img.publicId,
          url: img.url,
          isPrimary: img.isPrimary,
        })),
        ...uploaded,
      ];

      const payload = { ...values, images: finalImages };

      const res =
        mode === "edit"
          ? await axios.patch(`/api/admin/product/${productId}`, payload)
          : await axios.post("/api/admin/product", payload);

      const success = mode === "edit" ? res.status === 200 : res.status === 201;
      if (!success) return;

      // Only now that the product record is safely saved do we clean up
      // Cloudinary — delete images the user removed during this edit.
      // if (mode === "edit") {
      //   const keptIds = new Set(keptExisting.map((img) => img.publicId));
      //   const removedIds = [...originalPublicIds].filter(
      //     (id) => !keptIds.has(id),
      //   );

      //   await Promise.allSettled(
      //     removedIds.map((publicId) =>
      //       axios.post("/api/cloudinary/delete", { publicId }),
      //     ),
      //   );
      // }

      newImages.forEach((img) => URL.revokeObjectURL(img.previewUrl));

      router.push("/products");

      toast.success(
        mode === "edit"
          ? "Product updated successfully!"
          : "Product was added successfully!",
        { position: "bottom-right" },
      );

      if (mode === "create") resetForm();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data;
        if (status === 400 && data?.errors) {
          setErrors(data.errors);
        } else {
          setErr(data?.message ?? "Something went wrong. Please try again.");
          toast.error(data?.message ?? "Something went wrong");
        }
      } else {
        setErr("Something went wrong. Please try again.");
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
      setLoadingLabel("Submitting");
    }
  };

  return (
    <FormCard
      title={mode === "edit" ? "Edit product" : "Add a product"}
      description="Details you add here will be visible to store visitors"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      form={
        <FieldGroup>
          <DropList
            name="categoryId"
            label="Product Category"
            iconName="shapes"
            options={categoryOptions}
          />
          <InputField
            name="name"
            label="Product Name"
            placeholder="Name"
            iconName="shopping-cart"
          />
          <InputField
            name="description"
            label="Description"
            placeholder="Description"
            iconName="text-align-start"
          />
          <ImageInput name="images" label="Product Images" maxFiles={5} />
          <InputField
            name="price"
            label="Price"
            placeholder="0.00"
            iconName="banknote"
          />
          <InputField
            name="stock"
            label="Stock"
            placeholder="1"
            iconName="warehouse"
          />

          {err && (
            <p className="text-sm text-destructive" role="alert">
              {err}
            </p>
          )}

          <Button disabled={loading} type="submit">
            {loading ? <Spinner /> : mode === "edit" ? <Save /> : <Plus />}{" "}
            {loading
              ? loadingLabel
              : mode === "edit"
                ? "Save Changes"
                : "Add Product"}
          </Button>
        </FieldGroup>
      }
    />
  );
}
