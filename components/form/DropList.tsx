"use client";
import { ErrorMessage, useField } from "formik";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { InputGroup, InputGroupAddon } from "../ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
  iconName?: IconName;
}

export default function DropList({
  label,
  name,
  options,
  placeholder,
  iconName,
}: Props) {
  const [field, meta, helpers] = useField(name);
  const hasErr = meta.error;

  return (
    <Field>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <InputGroup>
        <Select
          items={options}
          value={field.value}
          onValueChange={(value: string) => {
            helpers.setTouched(true, false);
            helpers.setValue(value, true);
          }}
        >
          <SelectTrigger id={name} aria-invalid={!!hasErr} className="w-full">
            {iconName && (
              <InputGroupAddon>
                <DynamicIcon name={iconName} size={18} />
              </InputGroupAddon>
            )}
            <SelectValue placeholder={placeholder ?? "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </InputGroup>
      <ErrorMessage
        name={name}
        component={FieldError}
        className="text-red-500 text-sm"
      />
    </Field>
  );
}
