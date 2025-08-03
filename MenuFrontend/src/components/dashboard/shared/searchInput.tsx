import { Search } from "lucide-react";
type SearchInputProps = {
    search: string;
    setSearch: (value: string) => void;
};
export default function SearchInput({search , setSearch}: SearchInputProps ){

    
return(
    <div className="flex items-center bg-[#D8D4FF] rounded-xl px-4 py-2">
        <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو "
            className="bg-transparent outline-none text-right text-sm placeholder:text-[#CAA200]"
        />
        <Search className="w-4 h-4 mr-2 text-[#CAA200]" />
    </div>
)
}