import { useGetCategoryItemsQuery } from "../../../features/Category/categoryApi"

type CategoryItemsBox = {
    selectedRowName : string | null,
    selectedRowId : string
}

export default function CategoryItemsBox({selectedRowName , selectedRowId} : CategoryItemsBox){
    if(!selectedRowId){
        return null;
    }
    const {data : items , isLoading} = useGetCategoryItemsQuery(selectedRowId);



    return(
        <div className="border border-yellow-400 text-yellow-500 font-bold rounded-2xl px-3 py-3 mx-2">
            <h2 className="font-BTitr">محصولات موجود در {selectedRowName}</h2>
            <div className="flex flex-wrap mt-3 font-BNazanin">
                {isLoading ? (
                    <p className="text-center py-6">
                        در حال بارگذاری...
                    </p>
                ) : (
                    items?.itemsName.map(i => (
                        <div className="bg-[#FFF0B3] text-[#0C1086] font-light px-3 py-1 m-1 rounded-lg">{i}</div>
                    ))
                )
                }
            </div>
        </div>
    )
}