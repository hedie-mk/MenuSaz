import {Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom"
import DeleteModal from "../shared/DeleteModal";
import { useState } from "react";
import type { GetCategory } from "../../../features/Category/categoryType";
import type { GetMainCategory } from "../../../features/MainCategory/MainCategoryType";
import { useChangeCategoryStatusMutation } from "../../../features/Category/categoryApi";
import { useDeleteCategoryMutation } from "../../../features/Category/categoryApi";
import { useChangeMainCategoryStatusMutation } from "../../../features/MainCategory/MainCategoryApi";
import { useDeleteMainCategoryMutation } from "../../../features/MainCategory/MainCategoryApi";


type TableProps = {
    isLoading : boolean,
    maincategories : GetMainCategory[] | undefined,
    categories : GetCategory[] | undefined,
    setSelectedRowName : (value : string) => void,
    setSelectedRowId : (value : string) => void,
}


const thead = [" اسم " , "دسته بندی اصلی" , "تعداد محصولات" , "عملیات"]


export default function CategoryTable({isLoading , maincategories , categories , setSelectedRowName , setSelectedRowId} : TableProps ){
    const navigate = useNavigate();
    const [ changeCategoryStatus ] = useChangeCategoryStatusMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [changeMainCategoryStatus] = useChangeMainCategoryStatusMutation();
    const [deleteMainCategory] = useDeleteMainCategoryMutation();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedMainCategoryId, setSelectedMainCategoryId] = useState<string | null>(null);
    const [selectedName, setSelectedName] = useState<string | null>(null);




    const handleCategoryDelete = async (id: string , name : string) => {
        setSelectedId(id);
        setSelectedName(name);
        setDeleteModalOpen(true);
    };
    const handleMaincategory = async (id: string , name : string) => {
        setSelectedMainCategoryId(id);
        setSelectedName(name);
        setDeleteModalOpen(true);
    };
    const confirmDelete = () => {
        if (selectedId) {
        deleteCategory(selectedId)
        setDeleteModalOpen(false);
        setSelectedId(null);
        setSelectedName(null);
        }
        else if(selectedMainCategoryId){
            deleteMainCategory(selectedMainCategoryId);
            setDeleteModalOpen(false);
            setSelectedMainCategoryId(null);
            setSelectedName(null);
        }
    };
    
    var filteredProducts = []
    filteredProducts.push(categories)
    filteredProducts.push(maincategories)

    




    return(
        <div className="h-[370px] overflow-y-scroll shadow-md rounded-2xl">
          <table className="w-full text-sm text-right">
            <thead className="bg-[#D8D4FF] text-[#0C1086] sticky top-0 z-10">
              <tr className="text-sm">
                  {thead.map((t) => (
                      <th className="px-4 py-3 ">{t}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
                {
                maincategories?.map((m : GetMainCategory) => (
                    <tr key={m.id} className="bg-[#e5e3fc] hover:bg-[#DDD9FF] duration-300 ease-in ">
                        <td className="px-4 py-2 font-medium text-[#222]">{m.name}</td>
                        <td className="px-4 py-2 text-gray-600 truncate max-w-[250px]"></td>
                        <td className="px-4 py-2 text-[#444]">{m.categoriesLength}</td>
                        
                        <td className="px-4 py-2 flex gap-2 items-center">
                        <button 
                            onClick={() => navigate(`update/${m.id}`)}
                            className="p-1 rounded-full"
                        >
                            <Edit className="text-[#0C1086] hover:text-[#CAA200] duration-300 ease-in "/>
                        </button>
                        <button
                            onClick={() => handleMaincategory(m.id,m.name)}
                            className="p-1 rounded-full"
                        >
                            <Trash2 className="text-[#0C1086] hover:text-red-700 duration-200 ease-in "/>
                        </button>
                        

                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={m.state === 'active'} onChange={() => changeMainCategoryStatus(m.id)} />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0C1086] dark:peer-checked:bg-[#0C1086]"></div>
                        </label>
                        
                        </td>
                    </tr>
                ))
                }
                {isLoading ? (
                    <tr>
                    <td colSpan={6} className="text-center py-6">
                        در حال بارگذاری...
                    </td>
                    </tr>
                ) : (
                    categories?.map((item : GetCategory) => (
                    <tr onClick={() => { setSelectedRowName(item.name); setSelectedRowId(item.id)}} key={item.id} className=" hover:bg-[#DDD9FF] duration-300 ease-in ">
                        <td className="px-4 py-2 font-medium text-[#222]">{item.name}</td>
                        <td className="px-4 py-2 text-gray-600 truncate max-w-[250px]">{item.parentCategoryName}</td>
                        <td className="px-4 py-2 text-[#444]">{item.itemsLength}</td>
                        
                        <td className="px-4 py-2 flex gap-2 items-center">
                        <button 
                            onClick={() => navigate(`update/${item.id}`)}
                            className="p-1 rounded-full"
                        >
                            <Edit className="text-[#0C1086] hover:text-[#CAA200] duration-300 ease-in "/>
                        </button>
                        <button
                            onClick={() => handleCategoryDelete(item.id,item.name)}
                            className="p-1 rounded-full"
                        >
                            <Trash2 className="text-[#0C1086] hover:text-red-700 duration-200 ease-in "/>
                        </button>
                        

                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={item.state === 'active'} onChange={() => changeCategoryStatus(item.id)} />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0C1086] dark:peer-checked:bg-[#0C1086]"></div>
                        </label>
                        
                        </td>
                    </tr>
                    ))
                )}
            </tbody>
          </table>

          <DeleteModal
            isOpen={deleteModalOpen}
            selectedName = {selectedName}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={confirmDelete}
          />
        </div>
    )
}