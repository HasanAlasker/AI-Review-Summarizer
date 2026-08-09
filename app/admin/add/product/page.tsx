"use client";
import FormCard from "@/components/form/FormCard";
import InputFeild from "@/components/form/Input";
import { Button } from "@/components/ui/button";

export default function page() {
  const handleSubmit = async (values: { product: string }) => {
    console.log(values);
  };
  const initialValues = { product: "" };
  return (
    <FormCard
      title="Add a product"
      description="Details you add here will be visible to store visitors"
      initialValues={initialValues}
      onSubmit={handleSubmit}
      form={
        <>
          <InputFeild
            name="product"
            label="Product Name"
            placeholder="Name"
            type="text"
            iconName="box"
          />
          <Button type="submit">Submit</Button>
        </>
      }
    />
  );
}
