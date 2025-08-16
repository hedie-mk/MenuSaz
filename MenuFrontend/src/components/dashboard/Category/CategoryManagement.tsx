import { useState, useMemo } from 'react';
import CategoryTable from './CatgeoryTable';
import Pagination from '../shared/Pagination';
import CategoryModal from './CategoryModal';
import MainCategoryModal from './MainCategoryModal';
import DeleteModal from '../shared/DeleteModal';
import {
     useGetCategoriesQuery , 
     useChangeCategoryStatusMutation,
     useDeleteCategoryMutation, 
     useUpdateCategoryMutation
} from '../../../features/Category/categoryApi';
import {
     useGetMainCategoriesQuery , 
     useChangeMainCategoryStatusMutation,
     useDeleteMainCategoryMutation, 
     useUpdateMainCategoryMutation
} from '../../../features/MainCategory/MainCategoryApi';
import { toast } from 'react-toastify';



type CategoryManagementProps ={
    search : string;
    categoryFilter : '1' | '2';
    setSelectedRowName : (value : string) => void;
    selectedRowId : string,
    setSelectedRowId : (value : string) => void;
}

export default function CategoryManagement({search , categoryFilter , setSelectedRowName , selectedRowId, setSelectedRowId} : CategoryManagementProps){

  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    mainCategory: { id: null, name: null },
    subCategory: { id: null, name: null, parentCategoryId: null },
  });
  const [selectedName, setSelectedName] = useState<string | null>(null);


  const mainCategoriesQuery = useGetMainCategoriesQuery();
  const categoriesQuery = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteMainCategory] = useDeleteMainCategoryMutation();
  const [changeCategoryStatus] = useChangeCategoryStatusMutation();
  const [changeMainCategoryStatus] = useChangeMainCategoryStatusMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [updateMainCategory] = useUpdateMainCategoryMutation();
  const pageSize = 7;  


  const currentData = useMemo(() => {
    const source =
        categoryFilter === '1' ? mainCategoriesQuery.data ?? [] : categoriesQuery.data ?? [];

    const filtered = source.filter((s) => s.name?.includes(search));

    return filtered.slice((page - 1) * pageSize, page * pageSize);
  }, [categoryFilter,search, page, mainCategoriesQuery.data, categoriesQuery.data]);

  const totalPages = useMemo(() => {
    const length = categoryFilter === '1' ? mainCategoriesQuery.data?.length : categoriesQuery.data?.length;
    return Math.ceil((length ?? 0) / pageSize);
  }, [categoryFilter, mainCategoriesQuery.data, categoriesQuery.data]);

  const confirmDelete = async () => {
    try{
      categoryFilter === '1' ? await deleteMainCategory(selectedRowId) : await deleteCategory(selectedRowId);
    }
    catch{
      toast.error("حذف با مشکل مواجه شد")
    }
    setSelectedRowId("")
    setDeleteModalOpen(false)
    setSelectedName(null)
    toast.success("با موفقیت حذف شد")
  };
  const handleDelete = async(name : string) => {
    setDeleteModalOpen(true);
    setSelectedName(name);
  }
  const handleEdit = (item: any) => {
    if (categoryFilter === '1') {
      setEditData((prev) => ({ ...prev, mainCategory: item }));
    } else {
      setEditData((prev) => ({ ...prev, subCategory: item }));
    }
    setOpenModal(true);
  };

  const confirmEdit = (item : any) => {
    try{
      if (categoryFilter === '1') {
        updateMainCategory({
          id: selectedRowId,
          name : item.name
        });
      } else {
        updateCategory({
          id : selectedRowId,
          name : item.name,
          parentCategoryId : item.parentCategoryId
        })
      }
    }
    catch{
      toast.error("ویرایش با خطلا مواجه شد")
    }
    setOpenModal(false);
    toast.success("ویرایش با موفقیت انجام شد")
  }

  const handleStatuschange = (id:string) => {
    if(categoryFilter === "1"){
        changeMainCategoryStatus(id)
    } 
    else {
        changeCategoryStatus(id)
    }
  }
  
  return(
    <div className="px-4 py-3 space-y-4">
        <CategoryTable
            data={currentData}
            type={categoryFilter}
            onEdit={handleEdit}
            onDelete={handleDelete}
            statusChange={(id:string) => handleStatuschange(id)}
            setSelectedRowName={setSelectedRowName}
            setSelectedRowId={setSelectedRowId}
        />
        <DeleteModal
          isOpen={deleteModalOpen}
          selectedName={selectedName}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      <Pagination currentPage={page} totalPages={totalPages} onChangefunc={setPage} />

      {openModal && categoryFilter === '1' ? (
        <MainCategoryModal
          isOpen={openModal}
          name={editData.mainCategory.name}
          onClose={() => setOpenModal(false)}
          onConfirm={(item) => confirmEdit(item)} 
        />
      ) : openModal && categoryFilter === '2' ? (
        <CategoryModal
          isOpen={openModal}
          name={editData.subCategory.name}
          mainCategoryId={editData.subCategory.parentCategoryId}
          onClose={() => setOpenModal(false)}
          onConfirm={(item) => confirmEdit(item)} 
        />
      ) : null}
    </div>
  )
}