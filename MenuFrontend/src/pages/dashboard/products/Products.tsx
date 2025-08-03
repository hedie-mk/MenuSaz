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

const filteredProducts = category
    ? data?.filter((p) => p.categoryName === category)
    : data;

return(
    <div className="w-[1120px] p-6 ">
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
                    onClick={() => navigate("/create-product")}
                    className=" lg:w-[230px] w-[150px] bg-yellow-400 hover:bg-yellow-500  text-white font-bold py-2 px-6 rounded-xl text-lg shadow "
                >
                    ساخت محصول
                </button>
            </div>
        </div>
        <div>
            <ProductTable isLoading={isLoading} filteredItem={filteredProducts} tHead={thead}/>
        </div>
    </div>
)
}