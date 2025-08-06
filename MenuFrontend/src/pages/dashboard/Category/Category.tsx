import CategoryHeader from "../../../components/dashboard/Category/CategoryHeader"
import CategoryTable from "../../../components/dashboard/Category/CategoryTable"
import CategoryItemsBox from "../../../components/dashboard/Category/CategoryItemsBox"

export default function Category(){
    return(
    <div className="w-[1120px] p-5.5 ">
        <div className="grid grid-cols-5">
            <CategoryHeader/>
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