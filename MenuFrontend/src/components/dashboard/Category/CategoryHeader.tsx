
import SearchInput from "../shared/searchInput"
import CategoryFilterInput from "./CategoryFilterInput";


type CategoryHeaderProps = {
    search : string,
    setSearch : (value : string) => void,
    categoryFilter : '1' | '2' ,
    setCategoryFilter : (value :'1' | '2') => void,
    setCategoryModalOpen : (value : boolean) => void,
    setMainCategoryModalOpen : (value : boolean) => void,
}


export default function CategoryHeader({
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    setCategoryModalOpen,
    setMainCategoryModalOpen
} : CategoryHeaderProps){
    return(
        <>
            <div className="flex sm:flex-row sm:col-span-3 items-center mt-2 sm:mt-0">
                <div className="flex w-full gap-1 md:gap-4 items-center justify-between md:justify-start px-2">
                    <SearchInput search={search}
                                setSearch={setSearch}
                    />
                    <CategoryFilterInput
                    categoryFilter={categoryFilter}
                    setCategoryFilter={(value : '1' | '2') => setCategoryFilter(value)}
                    />
                </div>
            </div>
            <div className="flex sm:flex-row sm:col-span-2 items-center sm:justify-end sm:items-endmt-2 mt-2 sm:mt-0">
                <div className="flex w-full justify-between md:justify-end gap-2 md:gap-3 items-center font-BTitr px-2 ">
                    <button
                        onClick={() => setMainCategoryModalOpen(true)}
                        className="w-full h-10 sm:h-13 sm:w-[150px] lg:w-[230px] border border-yellow-400 hover:bg-yellow-500 hover:text-white hover:cursor-pointer duration-400 ease-in-out  text-yellow-500 font-bold py-2 px-3 sm:px-6 rounded-xl text-xs md:text-lg shadow "
                    >
                        ساخت دسته بندی اصلی
                    </button>
                    <button
                        onClick={() => setCategoryModalOpen(true)}
                        className="w-full h-10 sm:h-13 sm:w-[150px] lg:w-[230px] bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer duration-400 ease-in-out text-white font-bold py-2 px-6 rounded-xl text-sm md:text-lg shadow "
                    >
                        ساخت دسته بندی
                    </button>
                </div>
                
            </div>
                  
        </>

    )
}