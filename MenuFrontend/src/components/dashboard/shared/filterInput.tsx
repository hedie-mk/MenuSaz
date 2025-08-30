
import { Filter } from "lucide-react";

type Option = {
  name: string;
  id: string; 
}

type FilterInputProps = {
  options: Option[] | undefined;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
};
export default function FilterInput({
                                    options,
                                    categoryFilter,
                                    setCategoryFilter,
                                    }: FilterInputProps)
{
    return(
        <div className="flex items-center font-BTitr bg-[#D8D4FF] w-40 md:w-[250px] rounded-xl px-5 py-3 cursor-pointer">
        <Filter className="w-5 h-5 ml-2 text-[#CAA200]" />
        <select
            className="bg-transparent text-[#CAA200] w-45 outline-none text-sm overflow-y-auto"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
        >
            <option className="bg-[#D8D4FF]" value={"همه"}>
                همه
            </option>
            {options?.map((o, index) => (
            <option className="bg-[#D8D4FF]" key={index} value={o.id}>
                {o.name}
            </option>
            ))}
        </select>
        </div>
    )
}