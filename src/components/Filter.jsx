import { Filter as FilterIcon } from "lucide-react";

function Filter({ options = [], value, onChange }) {
  return (
    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white w-fit">
      
      <FilterIcon size={16} className="text-[#6a6a6a]" />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none text-sm font-secondary appearance-none"
      >
        <option value="">Filter</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

    </div>
  );
}

export default Filter;