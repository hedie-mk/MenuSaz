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
const thead = ["عکس محصول" , "اسم" , "توضیحات" , "قیمت" , "دسته بندی" ]

export default function Products(){
const {data , isLoading  } = useGetProductsQuery();
const [category, setCategory] = useState("");
const [search , setSearch] = useState("");
const navigate = useNavigate();

const filteredProducts = category
    ? data?.filter((p) => p.categoryName === category)
    : data;

return(
    <div>
        <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 items-center">
                <SearchInput search={search}
                            setSearch={setSearch}
                />

                <FilterInput options={categories}
                            categoryFilter={category}
                            setCategoryFilter={setCategory}
                />
            </div>
        </div>
        <div className="mb-4">
            <button
                onClick={() => navigate("/create-product")}
                className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-xl text-lg shadow"
            >
                ساخت محصول
            </button>
        </div>
        <ProductTable isLoading={isLoading} filteredItem={filteredProducts} tHead={thead}/>
    </div>
   
      
)
}