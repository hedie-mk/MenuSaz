import CategoryHeader from "../../../components/dashboard/Category/CategoryHeader"
import CategoryItemsBox from "../../../components/dashboard/Category/CategoryItemsBox"
import { useState } from "react"
import { useCreateCategoryMutation} from "../../../features/Category/categoryApi"
import { useCreateMainCategoryMutation } from "../../../features/MainCategory/MainCategoryApi"
import CategoryModal from "../../../components/dashboard/Category/CategoryModal"
import MainCategoryModal from "../../../components/dashboard/Category/MainCategoryModal"
import CategoryManagement from "../../../components/dashboard/Category/CategoryManagement"
import MainCategoryBox from "../../../components/dashboard/Category/MainCategoryBox"
export default function Category(){
    const [search , setSearch] = useState("")


    const [selectedRowName, setSelectedRowName] = useState<string | null>(null);
    const [selectedRowId, setSelectedRowId] = useState<string>("");
  
    const [categoryFilter, setCategoryFilter] = useState<'1' | '2'>('2');


    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [mainCategoryModalOpen, setMainCategoryModalOpen] = useState(false);

    const [createCategory] = useCreateCategoryMutation();
    const [createMainCategory] = useCreateMainCategoryMutation();

    const handelCreateCategory = (item : any) => {
        createCategory({
            id : selectedRowId,
            name : item.name,
            parentCategoryId : item.parentCategoryId,
        })
        setCategoryModalOpen(false);
        setSelectedRowId("");
    }

    const handelCreateMainCategory = (item : any) => {
        createMainCategory({
            id : selectedRowId,
            name : item.name
        })
        setMainCategoryModalOpen(false);
    }

    return(
    <div className="w-full max-w-[1120px] mx-auto pt-5">
        <div className="grid grid-cols-1 sm:grid-cols-5 mb-3">
            <CategoryHeader 
            search={search}
            setSearch={setSearch}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            setCategoryModalOpen={setCategoryModalOpen}
            setMainCategoryModalOpen={setMainCategoryModalOpen}
            />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 ">
            <div className="sm:col-span-2">
                <CategoryManagement 
                search={search}
                categoryFilter={categoryFilter}
                setSelectedRowName={setSelectedRowName}
                selectedRowId={selectedRowId}
                setSelectedRowId={setSelectedRowId}
                />
            </div>
            <div className="sm:col-span-1 mt-3 sm:block">
                {categoryFilter === '2' ? (
                    <CategoryItemsBox
                    selectedRowName={selectedRowName}
                    selectedRowId={selectedRowId}
                    />
                ) : (
                    <MainCategoryBox
                    selectedRowName={selectedRowName}
                    selectedRowId={selectedRowId}
                    />
                )}
                
            </div>
        </div>


        <CategoryModal
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        onConfirm={(item : any) => handelCreateCategory(item)}
        name={null}
        mainCategoryId={null}
        />
        <MainCategoryModal
        isOpen={mainCategoryModalOpen}
        onClose={() => setMainCategoryModalOpen(false)}
        onConfirm={(item : any) => handelCreateMainCategory(item)}
        name={null}
        />


    </div>
    )
}