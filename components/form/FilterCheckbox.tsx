import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface FilterCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function FilterCheckbox({
  id,
  label,
  checked,
  onChange,
}: FilterCheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(v) => onChange(v === true)}
      />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
