"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import * as Yup from "yup";
import { FieldGroup } from "../ui/field";
import DropList from "./DropList";
import FormCard from "./FormCard";
import InputField from "./Input";
import ImageInput, { PendingImage } from "./ImageInput";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { FormikHelpers } from "formik";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

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
  images: PendingImage[];
  price: number | "";
  stock: number;
};

interface Props {
  categoryOptions: { value: string; label: string }[];
}

const initialValues: ProductFormValues = {
  name: "",
  categoryId: "",
  description: "",
  images: [],
  price: "",
  stock: 1,
};

export default function ProductForm({ categoryOptions }: Props) {
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Submitting");
  const [err, setErr] = useState("");

  const handleSubmit = async (
    values: ProductFormValues,
    { resetForm, setErrors }: FormikHelpers<ProductFormValues>,
  ) => {
    setErr("");
    setLoading(true);
    try {
      setLoadingLabel("Uploading images");
      const uploadedImages = await Promise.all(
        values.images.map((img) => uploadToCloudinary(img.file)),
      );

      setLoadingLabel("Submitting");
      const payload = {
        ...values,
        images: uploadedImages, // [{ publicId, url }]
      };

      const res = await axios.post("/api/admin/product", payload);

      if (res.status === 201) {
        values.images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
        resetForm();
        toast.success("Product was added successfully!", {
          position: "bottom-right",
        });
      }
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
      title="Add a product"
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
            {loading ? <Spinner /> : <Plus />}{" "}
            {loading ? loadingLabel : "Add Product"}
          </Button>
        </FieldGroup>
      }
    />
  );
}
