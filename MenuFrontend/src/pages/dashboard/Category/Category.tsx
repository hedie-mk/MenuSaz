import CategoryHeader from "../../../components/dashboard/Category/CategoryHeader"
import CategoryTable from "../../../components/dashboard/Category/CategoryTable"
import CategoryItemsBox from "../../../components/dashboard/Category/CategoryItemsBox"
import { useState } from "react"
export default function Category(){
    const [search , setSearch] = useState("")
    const [mainCategory , setMainCategory] = useState("")





    return(
    <div className="w-[1120px] p-5.5 ">
        <div className="grid grid-cols-5">
            <CategoryHeader 
            search={search}
            setSearch={setSearch}
            options={[]}
            mainCategoryFilter={mainCategory}
            setMainCategoryFilter={setMainCategory}
            />
        </div>
        <div className="grid grid-cols-4">
            <div className="col-span-3">
                <CategoryTable/>
            </div>
            <div className="col-span-1">
                <CategoryItemsBox/>
            </div>
        </div>
    </div>
    )
}