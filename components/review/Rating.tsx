"use client";
import { ErrorMessage, useField } from "formik";
import { Star } from "lucide-react";
import { Field, FieldError } from "../ui/field";
import { Label } from "../ui/label";

interface Props {
  name: string;
}

export default function Rating({ name }: Props) {
  const [field, meta, helpers] = useField(name);
  const hasErr = meta.error;

  return (
    <Field>
      <Label>Rating</Label>
      <div className="flex w-full gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            strokeWidth={1.2}
            size={38}
            onClick={() => helpers.setValue(index + 1)}
            className={`${field.value > index ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} cursor-pointer ${hasErr ? "text-red-500" : ""}`}
          />
        ))}
      </div>
      <ErrorMessage
        name={name}
        component={FieldError}
        className="text-red-500 text-sm"
      />
    </Field>
  );
}
