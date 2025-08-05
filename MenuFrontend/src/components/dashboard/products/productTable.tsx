import {Trash2, Edit ,PlusCircleIcon} from "lucide-react";
import { useNavigate } from "react-router-dom"
import type { GetProduct  } from "../../../features/Products/productType";
import { useChangeProductStatusMutation , useDeleteProductMutation } from "../../../features/Products/productApi";
import DeleteModal from "../shared/DeleteModal";
import { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";

type TableProps = {
    isLoading : boolean,
    filteredItem : any,
    tHead : string[]
}


export default function ProductTable({isLoading , filteredItem , tHead} : TableProps){
    const navigate = useNavigate();
    const [changeProductStatus] = useChangeProductStatusMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedName, setSelectedName] = useState<string | null>(null);

  const handelAddCategory = async(id: string , name : string) =>{
    setSelectedId(id);
    setSelectedName(name);
    setCategoryModalOpen(true);
  }
  const confirmAddCategory = () =>{
    if (selectedId) {
      setCategoryModalOpen(false);
      setSelectedId(null);
      setSelectedName(null);
    }
  }

  const handleDelete = async (id: string , name : string) => {
    setSelectedId(id);
    setSelectedName(name);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedId) {
      deleteProduct(selectedId);
      setDeleteModalOpen(false);
      setSelectedId(null);
      setSelectedName(null);
    }
  };



    return(
        <div className="overflow-auto shadow-md rounded-2xl">
          <table className="w-full text-sm text-right ">
            <thead className="bg-[#D8D4FF] text-[#0C1086] ">
              <tr className="text-sm">
                  {tHead.map((t) => (
                      <th className="px-4 py-3 ">{t}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-6">
                    در حال بارگذاری...
                  </td>
                </tr>
              ) : (
                filteredItem?.map((item : GetProduct) => (
                  <tr key={item.id} className=" hover:bg-[#DDD9FF] duration-300 ease-in ">
                    <td className="px-4 py-2 text-gray-700">
                      <img className="w-[50px] h-[50px] aspect-square object-cover" src={item.photo ?? undefined}></img>
                    </td>
                    <td className="px-4 py-2 font-medium text-[#222]">{item.name}</td>
                    <td className="px-4 py-2 text-gray-600 truncate max-w-[250px]">{item.description}</td>
                    <td className="px-4 py-2 text-[#444]">{item.price}</td>
                    <td className="px-4 py-2 text-[#444]">{item.categoryName}</td>
                    
                    <td className="px-4 py-2 flex gap-2 items-center">
                      <button onClick={() => handelAddCategory(item.id,item.name)} className=" p-1 rounded-full">
                        <PlusCircleIcon className="text-[#0C1086] hover:text-[#CAA200] duration-300 ease-in "/>
                      </button>
                      <button 
                        onClick={() => navigate(`update/${item.id}`)}
                        className="p-1 rounded-full"
                      >
                        <Edit className="text-[#0C1086] hover:text-[#CAA200] duration-300 ease-in "/>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id,item.name)}
                        className="p-1 rounded-full"
                      >
                        <Trash2 className="text-[#0C1086] hover:text-red-700 duration-200 ease-in "/>
                      </button>
                      

                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={item.state === 'active'} onChange={() => changeProductStatus(item.id)} />
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
          <AddCategoryModal 
            isOpen={categoryModalOpen}
            selectedName={selectedName}
            onClose={() => setCategoryModalOpen(false)}
            onConfirm={confirmAddCategory}
          />
      </div>
    )
}