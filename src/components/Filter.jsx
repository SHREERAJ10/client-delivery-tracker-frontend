import { Filter as FilterIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Filter({ options = [], value, onChange }) {
  return (

    <Select value={value}
      onValueChange={(val) => {
        if (val == "All") {
          onChange("")
        }
        else {
          onChange(val)
        }
      }}
    >
      <SelectTrigger className="w-full rounded-none py-5 max-w-48 border border-gray-300">
        <FilterIcon size={16} className="text-[#6a6a6a]" />
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent className="rounded-none">
        <SelectGroup>
          <SelectItem value="All">All</SelectItem>
          {options?.map((opt) => (
            <SelectItem key={opt.id} value={opt.status}>{opt.status}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>


  );
}

export default Filter;