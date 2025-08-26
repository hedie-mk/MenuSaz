import { Search } from "lucide-react";

type MenuHeaderProps = {
    cafeName:string;
    search: string;
    setSearch: (value: string) => void;
};


export default function MenuHeader({cafeName , search , setSearch}:MenuHeaderProps){
    return(
        <div className="flex justify-center items-center mt-5 mx-2">
            <div>
                <h1 className="font-BTitr text-white text-xl"> به کافه {cafeName} خوش آمدید</h1>
            </div>
            <div className="flex-2/3 flex w-full rounded-xl px-2 py-2 bg-[#B3B9C8]">
                <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="جستجو "
                className="bg-transparent font-BTitr outline-none text-right text-sm text-gray-700"
                />
                <Search 
                className="w-5 h-5 mr-2 text-end text-[#1B2744]" />
            </div>
        </div>
    )
}