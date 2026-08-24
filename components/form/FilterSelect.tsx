import { SelectOption } from "@/types/selectOptions";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface FilterSelectProps {
  label: string;
  placeholder: string;
  items: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function FilterSelect({
  label,
  placeholder,
  items,
  value,
  onChange,
}: FilterSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>
      <Select
        items={items}
        value={value}
        onValueChange={(v) => onChange(v ?? "")}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
