import {Trash2, Edit ,PlusCircleIcon} from "lucide-react";
import { useNavigate } from "react-router-dom"
import type { GetProduct  } from "../../../features/Products/productType";
import { useAddCategoryToProductMutation, useChangeProductStatusMutation , useDeleteProductMutation } from "../../../features/Products/productApi";
import DeleteModal from "../shared/DeleteModal";
import { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";
import { toast } from "react-toastify";
type TableProps = {
    isLoading : boolean,
    filteredItem : any
}


export default function ProductTable({isLoading , filteredItem} : TableProps){
    const navigate = useNavigate();
    const [changeProductStatus] = useChangeProductStatusMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [addCategory] = useAddCategoryToProductMutation();

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [selectedName, setSelectedName] = useState<string | null>(null);
    const [categoryId , setCategoryId] = useState<string>("")

  const handelAddCategory = async(id: string , name : string) =>{
    setSelectedId(id);
    setSelectedName(name);
    setCategoryModalOpen(true);
  }
  const confirmAddCategory = () =>{
    try{
      if (selectedId) {
        addCategory({id:selectedId,categoryId});
        toast.success("دسته بندی با موفقیت اضافه شد");
        setCategoryModalOpen(false);
        setSelectedId(null);
        setSelectedName(null);
      }
    } 
    catch(err) {
      console.error("Error adding category product:", err);
      toast.error("دسته بندی اضافه نشد")
    }

  }

  const handleDelete = async (id: string , name : string) => {
    setSelectedId(id);
    setSelectedName(name);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    try{
      if (selectedId) {
        deleteProduct(selectedId);
        setDeleteModalOpen(false);
        setSelectedId(null);
        setSelectedName(null);
        toast.warning("محصول با موفقیت حذف شد")
      }
    }
    catch(err) {
      console.error("Error deleting product:", err);
      toast.error("حذف با مشکل مواجه شد")
    }
  };



    return(
        <div className="overflow-x-auto shadow-md rounded-2xl">
          <table className="w-full text-sm text-right ">
            <thead className="bg-[#D8D4FF] text-[#0C1086] ">
              <tr className=" text-sm font-BTitr">
                <th  className="px-4 py-3 text-center ">عکس محصول</th>
                <th  className="px-4 py-3 text-center ">اسم</th>
                <th  className="px-4 py-3 text-center hidden md:table-cell">توضیحات</th>
                <th  className="px-4 py-3 text-center ">قیمت</th>
                <th  className="px-4 py-3 text-center hidden md:table-cell">دسته بندی</th>
                <th  className="px-4 py-3 text-center ">عملیات</th>
                  
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-6 font-BNazanin">
                    در حال بارگذاری...
                  </td>
                </tr>
              ) : (
                filteredItem?.map((item : GetProduct) => (
                  <tr key={item.id} className=" hover:bg-[#DDD9FF] duration-300 ease-in ">
                    <td className="px-4 py-2 text-gray-700">
                      <img className="w-[50px] h-[50px] aspect-square object-cover" src={item.photo ?? undefined}></img>
                    </td>
                    <td className="px-4 py-2 font-medium text-[#222] text-center text-sm md:text-lg font-BNazanin">{item.name}</td>
                    <td className="px-4 py-2 text-gray-600 text-center truncate max-w-[250px] text-[18px] font-BNazanin hidden md:table-cell">{item.description}</td>
                    <td className="px-4 py-2 text-[#444] text-center font-BNazanin font-bold text-sm md:text-lg">{item.price}</td>
                    <td className="px-4 py-2 text-[#444] text-center font-BNazanin hidden md:table-cell">{item.categoryName}</td>
                    
                    <td className="px-4 py-2 flex gap-1 md:gap-2 justify-center items-center text-center">
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
                      
                      <label className="inline-flex cursor-pointer">
                      <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={item.state === "active"}
                          onChange={() => changeProductStatus(item.id)}
                      />
                      <div className="relative w-11 h-6 bg-gray-400 peer-checked:bg-[#0C1086] rounded-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:after:translate-x-full"></div>
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
            setCategoryId={setCategoryId}
            onClose={() => setCategoryModalOpen(false)}
            onConfirm={confirmAddCategory}
          />
        </div>
    )
}