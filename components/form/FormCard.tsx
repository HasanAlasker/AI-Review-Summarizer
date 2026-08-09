"use client";
import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import AppForm from "./AppForm";
import { Form } from "formik";

interface Props<T> {
  title?: string;
  description?: string;
  form: ReactNode;
  onSubmit: (values: T) => void | Promise<void>;
  initialValues: T;
  validationSchema?: {};
}
export default function FormCard<T extends Record<string, unknown>>({
  title,
  description,
  form,
  onSubmit,
  initialValues,
  validationSchema,
}: Props<T>) {
  return (
    <Card>
      {title && description && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <AppForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>{form}</Form>
        </AppForm>
      </CardContent>
    </Card>
  );
}
