"use client";
import FormCard from "@/components/form/FormCard";
import InputField from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import axios from "axios";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().trim().required("Product name is required"),

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
  description: string;
  imageURL: string;
  price: number | "";
  stock: number;
};

export default function page() {
  const handleSubmit = async (values: ProductFormValues) => {
    console.log(values);
    // todo: reset form after res, show loading state, upload images
    try {
      const res = await axios.post("/api/admin/product", values);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const initialValues: ProductFormValues = {
    name: "",
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
          <Button type="submit">Add Product</Button>
        </FieldGroup>
      }
    />
  );
}
