import SearchInput from "../../../components/dashboard/shared/searchInput";
import FilterInput from "../../../components/dashboard/shared/filterInput";
import ProductTable from "../../../components/dashboard/products/productTable";
import { useState , useMemo } from "react";
import { useGetProductsQuery } from "../../../features/Products/productApi";
import { useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../../features/Category/categoryApi";
import Pagination from "../../../components/dashboard/shared/Pagination";

const thead = ["عکس محصول" , "اسم" , "توضیحات" , "قیمت" , "دسته بندی" , "عملیات"]

export default function Products(){
  const navigate = useNavigate();

  // Queries
  const { data: productsData = [], isLoading } = useGetProductsQuery();
  const { data: categoriesData = [] } = useGetCategoriesQuery();

  // States
  const [category, setCategory] = useState("همه");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Constants
  const itemsPerPage = 5;

  // Category Options
  const categories = useMemo(
    () => categoriesData.map((c) => ({ name: c.name, id: c.id })),
    [categoriesData]
  );



    // Filtered Products
  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    if (category && category !== "همه") {
      result = result.filter((p) => p.categoryId === category);
    }

    if (search.trim()) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }, [category, search, productsData]);

  // Paginated Products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  // Total Pages
  const totalPages = useMemo(
    () => Math.ceil(filteredProducts.length / itemsPerPage),
    [filteredProducts.length]
  );

return(
    <div className="w-full max-w-[1120px] p-5 ">
        <div className="grid grid-cols-1 sm:grid-cols-3">
            <div className="flex w-full sm:flex-row sm:col-span-2 items-center mb-4">
                <div className="flex justify-between md:justify-start gap-4 w-full sm:flex-row items-center ">
                    <SearchInput search={search}
                                setSearch={setSearch}
                    />

                    <FilterInput options={categories}
                                categoryFilter={category}
                                setCategoryFilter={(id : string) => setCategory(id)}
                    />
                </div>
            </div>
            <div className="flex mb-3 sm:col-span-1 sm:justify-end sm:items-end">
                <button
                    onClick={() => navigate("create")}
                    className="sm:w-[230px] w-full font-BTitr bg-yellow-400 hover:bg-yellow-500  text-white font-bold py-2 px-6 rounded-xl md:text-xl shadow "
                >
                    ساخت محصول
                </button>
            </div>
        </div>
        <div className="grid grid-cols-1">
            <ProductTable isLoading={isLoading} filteredItem={paginatedProducts} tHead={thead}/>
            
            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangefunc={setCurrentPage}
            />
            
        </div>
    </div>
)
}