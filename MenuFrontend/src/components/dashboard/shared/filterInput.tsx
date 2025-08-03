
import { Filter } from "lucide-react";

type Option = {
  name: string;
  value?: string; // می‌تونی value جدا از name داشته باشی
};

type FilterInputProps = {
  options: Option[];
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
};
export default function filterInput({
                                    options,
                                    categoryFilter,
                                    setCategoryFilter,
                                    }: FilterInputProps)
{
    return(
        <div className="flex items-center bg-[#D8D4FF] lg:w-[250px] rounded-xl px-5 py-3 cursor-pointer">
        <Filter className="w-5 h-5 ml-2 text-[#CAA200]" />
        <select
            className="bg-transparent text-[#CAA200] w-full outline-none text-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
        >
            {options.map((o, index) => (
            <option className="bg-[#D8D4FF]" key={index} value={o.value ?? o.name}>
                {o.name}
            </option>
            ))}
        </select>
        </div>
    )
}