import { Filter } from "lucide-react";

type CategoryFilterInputProps = {
    categoryFilter : '1' | '2',
    setCategoryFilter : (value : '1' | '2') => void
}

export default function CategoryFilterInput({
    categoryFilter,
    setCategoryFilter
} : CategoryFilterInputProps){
    return(
        <div className="flex w-50 items-center font-BTitr bg-[#D8D4FF] lg:w-[250px] rounded-xl px-5 py-3 cursor-pointer">
            <Filter className="w-5 h-5 ml-2 text-[#CAA200]" />
            <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as '1' | '2')}
            className="bg-transparent text-[#CAA200] w-full outline-none text-sm"
            >
            <option className="bg-[#D8D4FF]" value="2">دسته بندی</option>
            <option className="bg-[#D8D4FF]" value="1">دسته بندی اصلی</option>
            </select>

        </div>
        
    )
}