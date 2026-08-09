import { Field, FieldLabel } from "../ui/field";

interface Props {
  label: string;
  placeholder: string;
  type: string;
}
export default function ImageInput({ label, placeholder, type }: Props) {
  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
    </Field>
  );
}
