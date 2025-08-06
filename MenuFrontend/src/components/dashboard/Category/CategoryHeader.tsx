import FilterInput from "../shared/filterInput"
import SearchInput from "../shared/searchInput"
import { useNavigate } from "react-router-dom"
type Option = {
  name: string;
  id: string; 
}

type CategoryHeaderProps = {
    search : string,
    setSearch : (value : string) => void,
    options : Option[] | undefined,
    mainCategoryFilter : string,
    setMainCategoryFilter : (value : string) => void,
}


export default function CategoryHeader({
    search,
    setSearch,
    options,
    mainCategoryFilter,
    setMainCategoryFilter
} : CategoryHeaderProps){
    const navigate = useNavigate();




    return(
        <>
            <div className="flex justify-between col-span-3 items-center mb-4">
                <div className="flex gap-4 items-center ">
                    <SearchInput search={search}
                                setSearch={setSearch}
                    />

                    <FilterInput options={options}
                                categoryFilter={mainCategoryFilter}
                                setCategoryFilter={setMainCategoryFilter}
                    />
                </div>
            </div>
            <div className="col-span-2 flex mb-4 justify-end items-end">
                <div className="flex gap-3 items-center ">
                    <button
                        onClick={() => navigate("mainCategory/Create")}
                        className=" lg:w-[230px] w-[150px] border border-yellow-400 hover:bg-yellow-500 hover:text-white hover:cursor-pointer duration-400 ease-in-out  text-yellow-500 font-bold py-2 px-6 rounded-xl text-lg shadow "
                    >
                        ساخت دسته بندی اصلی
                    </button>
                    <button
                        onClick={() => navigate("category/Create")}
                        className=" lg:w-[230px] w-[150px] bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer duration-400 ease-in-out text-white font-bold py-2 px-6 rounded-xl text-lg shadow "
                    >
                        ساخت دسته بندی
                    </button>
                </div>

            </div>        
        </>

    )
}