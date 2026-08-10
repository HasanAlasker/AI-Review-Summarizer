"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import * as Yup from "yup";
import { FieldGroup } from "../ui/field";
import DropList from "./DropList";
import FormCard from "./FormCard";
import InputField from "./Input";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { FormikHelpers } from "formik";

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Product name is required"),
  categoryId: Yup.string().required("Please select a category"),
  description: Yup.string()
    .trim()
    .required("Description is required")
    .min(15)
    .max(500),
  imageURL: Yup.string().trim().url("Must be a valid URL"),
  // .required("Image URL is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required"),
});

type ProductFormValues = {
  name: string;
  categoryId: string;
  description: string;
  imageURL: string;
  price: number | "";
  stock: number;
};

interface Props {
  categoryOptions: { value: string; label: string }[];
}

export default function ProductForm({ categoryOptions }: Props) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = async (
    values: ProductFormValues,
    { resetForm, setErrors }: FormikHelpers<ProductFormValues>,
  ) => {
    setLoading(false);
    setErr("");
    try {
      setLoading(true);
      const res = await axios.post("/api/admin/product", values);
      if (res.status === 201) {
        resetForm();
        toast.success("Product was added successfully!", {
          position: "bottom-right",
        });
        setErr("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const initialValues: ProductFormValues = {
    name: "",
    categoryId: "",
    description: "",
    imageURL: "",
    price: "",
    stock: 1,
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
          <Button disabled={loading} type="submit">
            {loading ? <Spinner /> : <Plus />}{" "}
            {loading ? "Submitting" : "Add Product"}
          </Button>
        </FieldGroup>
      }
    />
  );
}
