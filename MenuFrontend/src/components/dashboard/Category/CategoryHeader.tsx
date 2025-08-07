
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
            <div className="flex justify-between col-span-3 items-center ">
                <div className="flex gap-4 items-center ">
                    <SearchInput search={search}
                                setSearch={setSearch}
                    />
                    <CategoryFilterInput
                    categoryFilter={categoryFilter}
                    setCategoryFilter={(value : '1' | '2') => setCategoryFilter(value)}
                    />
                </div>
            </div>
            <div className="col-span-2 flex justify-end items-end">
                <div className="flex gap-3 items-center ">
                    <button
                        onClick={() => setMainCategoryModalOpen(true)}
                        className=" lg:w-[230px] w-[150px] border border-yellow-400 hover:bg-yellow-500 hover:text-white hover:cursor-pointer duration-400 ease-in-out  text-yellow-500 font-bold py-2 px-6 rounded-xl text-lg shadow "
                    >
                        ساخت دسته بندی اصلی
                    </button>
                    <button
                        onClick={() => setCategoryModalOpen(true)}
                        className=" lg:w-[230px] w-[150px] bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer duration-400 ease-in-out text-white font-bold py-2 px-6 rounded-xl text-lg shadow "
                    >
                        ساخت دسته بندی
                    </button>
                </div>
                
            </div>
                  
        </>

    )
}