import { useGetMainCategoryCategoriesQuery } from "../../../features/MainCategory/MainCategoryApi"
import { useChangePriorityMutation } from "../../../features/Category/categoryApi"
import { useState } from "react";

type MainCategoryItemsBoxProps = {
  selectedRowName: string | null;
  selectedRowId: string;
};

export default function MainCategoryBox({
  selectedRowName,
  selectedRowId,
}: MainCategoryItemsBoxProps) {
    if(!selectedRowId){
        return null;
    }
    const { data, isLoading, refetch } = useGetMainCategoryCategoriesQuery(selectedRowId);
    const [changePriority] = useChangePriorityMutation();
    const [editingValue, setEditingValue] = useState<{ id: string; value: string } | null>(null);

    const handleBlur = async () => {
    if (!editingValue) return;
    try {
      await changePriority({
        id: editingValue.id,
        number: Number(editingValue.value),
      }).unwrap();
      refetch();
    } catch (err) {
      console.error("خطا در تغییر اولویت:", err);
    } finally {
      setEditingValue(null);
    }
  };

  return (
    <div className="border border-yellow-400 text-yellow-500 font-bold rounded-2xl px-3 py-3 mx-2 overflow-y-scroll max-h-100">
      <h2 className="font-BTitr">اولویت بندی زیرمجموعه های {selectedRowName}</h2>

      <div className="flex flex-col mt-3 font-BNazanin">
        {isLoading ? (
          <p className="text-center py-6">در حال بارگذاری...</p>
        ) : (
          data?.categories.map((c) => (
            <div
              key={c.id}
              className="flex bg-[#FFF0B3] text-[#0C1086] font-light px-3 py-1 m-1 rounded-lg"
            >
              <div className="basis-3/4 flex items-center">{c.name}</div>
              <div className="basis-1/4">
                <input
                  className="bg-yellow-500 font-BTitr text-white w-12 py-1 px-2 rounded-lg"
                  type="number"
                  value={
                    editingValue?.id === c.id ? editingValue.value : c.priority
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val)) {
                      setEditingValue({ id: c.id, value: val });
                    }
                  }}
                  onBlur={handleBlur}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
