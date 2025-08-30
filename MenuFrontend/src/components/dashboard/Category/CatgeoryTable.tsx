
import { Trash2, Edit } from "lucide-react";

interface CategoryTableProps {
  data: any[];
  type: '1' | '2'; // 1 = main, 2 = sub
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  statusChange : (id : string) => void;
  setSelectedRowName : (value : string) => void;
  setSelectedRowId : (value : string) => void;
}

export default function CategoryTable({ data, type, onEdit, onDelete , statusChange , setSelectedRowName , setSelectedRowId}: CategoryTableProps) {

  return (
    <div className="overflow-x-auto shadow-md rounded-2xl">
      <table className="w-full text-sm">
        <thead className="bg-[#D8D4FF] text-[#0C1086]">
          <tr className="text-sm font-BTitr">
            <th scope="col" className="px-4 py-3 text-center">نام</th>
            {type === '2' && <th scope="col" className="px-4 py-3 text-center">اولویت</th>}
            {type === '2' && <th scope="col" className="px-4 py-3 text-center">دسته‌بندی والد</th>}
            <th scope="col" className="px-4 py-3 text-center">تعداد زیر مجموعه</th>
            <th scope="col" className="px-4 py-3 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr onClick={() => {
                      setSelectedRowName(item.name);
                      setSelectedRowId(item.id);
                    }} key={item.id} className="hover:bg-[#DDD9FF] duration-300 cursor-pointer">
              <td className="px-4 py-2 font-medium text-center text-lg text-[#222] font-BNazanin">
                {item.name}
              </td>
              {type === '2' && (
                <td className="px-4 py-2 text-center text-lg font-BNazanin">
                  {item.priority || '-'}
                </td>
              )}
              {type === '2' && (
                <td className="px-4 py-2 text-center text-lg font-BNazanin">
                  {item.parentCategoryName || '-'}
                </td>
              )}
              {type === '2' ? (
                <td className="px-4 py-2 text-center text-[#444] text-lg font-BNazanin">{item.itemsLength}</td>
              ) : (
                <td className="px-4 py-2 text-center text-[#444] text-lg font-BNazanin">{item.categoriesLength}</td>
              )}
              <td className="px-4 py-2 flex gap-2 justify-center">
                {type === '2' ? (
                  <button
                  onClick={() => onEdit({
                    id : item.id,
                    name : item.name,
                    parentCategoryId : item.parentCategoryId
                  })}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="text-[#0C1086] hover:text-[#CAA200]" />
                </button>
                ) : (
                  <button
                    onClick={() => onEdit({
                      id : item.id,
                      name : item.name,
                    })}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="text-[#0C1086] hover:text-[#CAA200]" />
                  </button>
                )}
                <button
                  onClick={() => onDelete(item.name)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="text-[#0C1086] hover:text-red-700" />
                </button>
                <label className="inline-flex cursor-pointer">
                <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={item.state === "active"}
                    onChange={() => statusChange(item.id)}
                />
                <div className="relative w-11 h-6 bg-gray-400 peer-checked:bg-[#0C1086] rounded-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
