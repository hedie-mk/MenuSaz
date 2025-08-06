import CategoryHeader from "../../../components/dashboard/Category/CategoryHeader"
import CategoryTable from "../../../components/dashboard/Category/CategoryTable"
import CategoryItemsBox from "../../../components/dashboard/Category/CategoryItemsBox"
import { useState } from "react"
import { useGetCategoriesQuery } from "../../../features/Category/categoryApi"
import { useGetMainCategoriesQuery } from "../../../features/MainCategory/MainCategoryApi"

export default function Category(){
    const [search , setSearch] = useState("")
    const { data : categories , isLoading} = useGetCategoriesQuery();
    const { data : mainCategories } = useGetMainCategoriesQuery();

    const [selectedRowName, setSelectedRowName] = useState<string | null>(null);
    const [selectedRowId, setSelectedRowId] = useState<string>("");



    return(
    <div className="w-[1120px] pt-5 ">
        <div className="grid grid-cols-5 mb-3">
            <CategoryHeader 
            search={search}
            setSearch={setSearch}
            />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 ">
            <div className="sm:col-span-2">
                <CategoryTable
                isLoading={isLoading}
                maincategories={mainCategories}
                categories={categories}
                setSelectedRowName={setSelectedRowName}
                setSelectedRowId={setSelectedRowId}
                />
            </div>
            <div className="sm:col-span-1 mt-3 sm:block hidden">
                <CategoryItemsBox
                selectedRowName={selectedRowName}
                selectedRowId={selectedRowId}
                />
            </div>
        </div>
    </div>
    )
}