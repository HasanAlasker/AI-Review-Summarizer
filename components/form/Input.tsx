"use client";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "@/components/ui/input";
import { ErrorMessage, useField } from "formik";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { DynamicIcon, IconName } from "lucide-react/dynamic";

interface Props {
  label: string;
  placeholder: string;
  type?: "tel" | "text" | "number" | "email" | "url";
  name: string;
  iconName?: IconName;
  multiline?: boolean;
  maxHeight?: number;
}
export default function InputFeild({
  label,
  placeholder,
  type,
  name,
  iconName,
  multiline,
  maxHeight,
}: Props) {
  const [field, meta] = useField(name);
  const hasErr = meta.touched && meta.error;

  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={name}
          placeholder={placeholder}
          type={type ?? "text"}
          aria-invalid={!!hasErr}
          {...field}
        />
        {iconName && (
          <InputGroupAddon>
            <DynamicIcon name={iconName} />
          </InputGroupAddon>
        )}
      </InputGroup>
      <ErrorMessage
        name={name}
        component={FieldError}
        className="text-red-500 text-sm"
      />
    </Field>
  );
}
