import SearchInput from "../../../components/dashboard/shared/searchInput";
import FilterInput from "../../../components/dashboard/shared/filterInput";
import ProductTable from "../../../components/dashboard/products/productTable";
import { useState } from "react";
import { useGetProductsQuery } from "../../../features/Products/productTable/productApi";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "همه", value: "" },
  { name: "قهوه", value: "coffee" },
  { name: "چای", value: "tea" },
];
const thead = ["عکس محصول" , "اسم" , "توضیحات" , "قیمت" , "دسته بندی" , "عملیات"]

export default function Products(){
const {data , isLoading  } = useGetProductsQuery();
const [category, setCategory] = useState("");
const [search , setSearch] = useState("");
const navigate = useNavigate();


const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5; // چند محصول در هر صفحه



var filteredProducts = undefined;
if(category){
    filteredProducts = data?.filter((p) => p.categoryName === category );
}
else if(search){
    filteredProducts = data?.filter((p)=> p.name.includes(search))
}
else{
    filteredProducts = data;
}
// محاسبه محصولات این صفحه
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredProducts?.slice(indexOfFirstItem, indexOfLastItem);

// تغییر صفحه
var totalPages = 0;
if(data) totalPages = Math.ceil(data?.length / itemsPerPage);
const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };
return(
    <div className="w-[1120px] p-5.5 ">
        <div className="grid grid-cols-3">
            <div className="flex justify-between col-span-2 items-center mb-4">
                <div className="flex gap-4 items-center ">
                    <SearchInput search={search}
                                setSearch={setSearch}
                    />

                    <FilterInput options={categories}
                                categoryFilter={category}
                                setCategoryFilter={setCategory}
                    />
                </div>
            </div>
            <div className="col-span-1 flex mb-4 justify-end items-end">
                <button
                    onClick={() => navigate("create")}
                    className=" lg:w-[230px] w-[150px] bg-yellow-400 hover:bg-yellow-500  text-white font-bold py-2 px-6 rounded-xl text-lg shadow "
                >
                    ساخت محصول
                </button>
            </div>
        </div>
        <div>
            <ProductTable isLoading={isLoading} filteredItem={currentItems} tHead={thead}/>
            
            
            <div className="flex justify-center mt-2">
                <div className="flex items-center gap-2 bg-[#D8D4FF] rounded-full px-4 py-1">
                {getPageNumbers().map((num, idx) =>
                    num === "..." ? (
                    <span key={idx} className="px-3 text-purple-800">
                        ...
                    </span>
                    ) : (
                    <button
                        key={idx}
                        onClick={() => setCurrentPage(num as number)}
                        className={`w-7 h-7 duration-400 ease-in-out  rounded-full flex items-center justify-center text-sm font-medium transition 
                        ${
                            currentPage === num
                            ? "bg-[#0C1086] text-white hover:cursor-pointer"
                            : "text-[#0C1086] hover:cursor-pointer"
                        }`}
                    >
                        {num}
                    </button>
                    )
                )}
                </div>
            </div>
        </div>
    </div>
)
}