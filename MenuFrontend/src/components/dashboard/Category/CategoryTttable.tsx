import { Trash2, Edit } from "lucide-react";
import { useState } from "react";

import DeleteModal from "../shared/DeleteModal";
import CategoryModal from "./CategoryModal";
import MainCategoryModal from "./MainCategoryModal";

import type { GetCategory } from "../../../features/Category/categoryType";
import type { GetMainCategory } from "../../../features/MainCategory/MainCategoryType";

import {
  useChangeCategoryStatusMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../../features/Category/categoryApi";

import {
  useChangeMainCategoryStatusMutation,
  useDeleteMainCategoryMutation,
  useUpdateMainCategoryMutation,
} from "../../../features/MainCategory/MainCategoryApi";


type TableProps = {
  maincategories: GetMainCategory[] | undefined;
  categories: GetCategory[] | undefined;
  setSelectedRowName: (value: string) => void;
  setSelectedRowId: (value: string) => void;
  categoryFilter: string;
};

const thead = [" اسم ", "دسته بندی اصلی", "تعداد", "عملیات"];

export default function CategoryTttable({
  maincategories,
  categories,
  setSelectedRowName,
  setSelectedRowId,
  categoryFilter,
}: TableProps) {
  const [changeCategoryStatus] = useChangeCategoryStatusMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const [changeMainCategoryStatus] = useChangeMainCategoryStatusMutation();
  const [deleteMainCategory] = useDeleteMainCategoryMutation();
  const [updateMainCategory] = useUpdateMainCategoryMutation();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedMainCategoryId, setSelectedMainCategoryId] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editMainCatModalOpen, setEditMainCatModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = categories ? Math.ceil(categories.length / itemsPerPage) : 0;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const handleCategoryDelete = (id: string, name: string) => {
    setSelectedId(id);
    setSelectedName(name);
    setDeleteModalOpen(true);
  };

  const handleEditCategory = (name: string, parentCategoryId: string | null, id: string) => {
    setSelectedName(name);
    setSelectedMainCategoryId(parentCategoryId);
    setSelectedId(id);
    setEditModalOpen(true);
  };

  const confirmEditCategory = async (name: string, parentCategoryId: string | null) => {
    await updateCategory({ id: selectedId!, name, parentCategoryId });
    setSelectedId(null);
    setSelectedName(null);
    setSelectedMainCategoryId(null);
    setEditModalOpen(false);
  };

  const handleEditMainCategory = (name: string, id: string) => {
    setSelectedMainCategoryId(id);
    setSelectedName(name);
    setEditMainCatModalOpen(true);
  };

  const confirmEditMainCategory = async (name: string) => {
    await updateMainCategory({ id: selectedMainCategoryId!, name });
    setSelectedMainCategoryId(null);
    setSelectedName(null);
    setEditMainCatModalOpen(false);
  };

  const handleMainCategoryDelete = (id: string, name: string) => {
    setSelectedMainCategoryId(id);
    setSelectedName(name);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedId) {
      deleteCategory(selectedId);
      setSelectedId(null);
    } else if (selectedMainCategoryId) {
      deleteMainCategory(selectedMainCategoryId);
      setSelectedMainCategoryId(null);
    }
    setSelectedName(null);
    setDeleteModalOpen(false);
  };

  return (
    <>
      <div className="overflow-auto shadow-md rounded-2xl">
        <table className="w-full text-sm">
          <thead className="bg-[#D8D4FF] text-[#0C1086]">
            <tr className="text-sm">
              {thead.map((t, idx) => (
                <th key={idx} className="px-4 py-3 text-center">
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categoryFilter === "1"
              ? maincategories?.map((m) => (
                  <tr key={m.id} className="bg-[#e5e3fc] hover:bg-[#DDD9FF] duration-300">
                    <td className="px-4 py-2 font-medium text-center text-[#222]">{m.name}</td>
                    <td className="px-4 py-2 text-center"></td>
                    <td className="px-4 py-2 text-center text-[#444]">{m.categoriesLength}</td>
                    <td className="px-4 py-2 flex gap-2 justify-center">
                      <button onClick={() => handleEditMainCategory(m.name, m.id)}>
                        <Edit className="text-[#0C1086] hover:text-[#CAA200]" />
                      </button>
                      <button onClick={() => handleMainCategoryDelete(m.id, m.name)}>
                        <Trash2 className="text-[#0C1086] hover:text-red-700" />
                      </button>
                      <label className="inline-flex cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={m.state === "active"}
                          onChange={() => changeMainCategoryStatus(m.id)}
                        />
                        <div className="relative w-11 h-6 bg-gray-400 peer-checked:bg-[#0C1086] rounded-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:after:translate-x-full"></div>
                      </label>
                    </td>
                  </tr>
                ))
              : currentItems?.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      setSelectedRowName(item.name);
                      setSelectedRowId(item.id);
                    }}
                    className="hover:bg-[#DDD9FF] duration-300 cursor-pointer"
                  >
                    <td className="px-4 py-2 font-medium text-center text-[#222]">{item.name}</td>
                    <td className="px-4 py-2 text-center text-gray-600 max-w-[250px] truncate">{item.parentCategoryName}</td>
                    <td className="px-4 py-2 text-center text-[#444]">{item.itemsLength}</td>
                    <td className="px-4 py-2 flex gap-2 justify-center">
                      <button onClick={() => handleEditCategory(item.name, item.parentCategoryId, item.id)}>
                        <Edit className="text-[#0C1086] hover:text-[#CAA200]" />
                      </button>
                      <button onClick={() => handleCategoryDelete(item.id, item.name)}>
                        <Trash2 className="text-[#0C1086] hover:text-red-700" />
                      </button>
                      <label className="inline-flex cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={item.state === "active"}
                          onChange={() => changeCategoryStatus(item.id)}
                        />
                        <div className="relative w-11 h-6 bg-gray-400 peer-checked:bg-[#0C1086] rounded-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:after:translate-x-full"></div>
                      </label>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <DeleteModal
          isOpen={deleteModalOpen}
          selectedName={selectedName}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      </div>

      {/* ✅ Pagination */}
      {categoryFilter !== "1" && (
        <div className="flex justify-center mt-2">
          <div className="flex gap-2 bg-[#D8D4FF] rounded-full px-4 py-1">
            {getPageNumbers().map((num, idx) => (
              <button
                key={idx}
                onClick={() => typeof num === "number" && setCurrentPage(num)}
                className={`w-7 h-7 rounded-full text-sm font-medium flex items-center justify-center transition ${
                  currentPage === num
                    ? "bg-[#0C1086] text-white"
                    : "text-[#0C1086] hover:cursor-pointer"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      <CategoryModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onConfirm={(mainCategoryId, name) => confirmEditCategory(name, mainCategoryId)}
        name={selectedName}
        mainCategoryId={selectedMainCategoryId}
      />

      <MainCategoryModal
        isOpen={editMainCatModalOpen}
        onClose={() => setEditMainCatModalOpen(false)}
        onConfirm={confirmEditMainCategory}
        name={selectedName}
      />
    </>
  );
}


