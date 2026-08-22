"use client";
import { ErrorMessage, useField } from "formik";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { Field, FieldError, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "../ui/input-group";

interface Props {
  label: string;
  placeholder: string;
  type?: "tel" | "text" | "number" | "email" | "url";
  name: string;
  iconName?: IconName;
  multiline?: boolean;
  maxHeight?: number;
}
export default function InputField({
  label,
  placeholder,
  type,
  name,
  iconName,
  multiline,
  maxHeight,
}: Props) {
  const [field, meta, helpers] = useField(name);
  const hasErr = meta.touched && meta.error;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (type !== "number") {
      field.onChange(e);
      return;
    }
    const raw = e.target.value;
    // empty string -> undefined so Yup's required()/nullable() logic
    // runs instead of Number("") silently becoming 0
    helpers.setValue(raw === "" ? undefined : Number(raw));
  };

  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <InputGroup>
        {multiline ? (
          <InputGroupTextarea
            id={name}
            placeholder={placeholder}
            aria-invalid={!!hasErr}
            {...field}
            value={field.value ?? ""}
            onChange={handleChange}
            className="min-h-25"
          />
        ) : (
          <InputGroupInput
            id={name}
            placeholder={placeholder}
            type={type ?? "text"}
            aria-invalid={!!hasErr}
            {...field}
            value={field.value ?? ""}
            onChange={handleChange}
          />
        )}

        {iconName && (
          <InputGroupAddon className={`${multiline ? 'items-start self-start pt-3' : ''}`}>
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
