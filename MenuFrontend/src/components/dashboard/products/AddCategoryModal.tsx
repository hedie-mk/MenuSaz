import React from "react";

type AddCategoryProps = {
  isOpen: boolean;
  selectedName : string | null;
  onClose: () => void;
  onConfirm: () => void;
};

const AddCategoryModal: React.FC<AddCategoryProps> = ({
  isOpen,
  selectedName,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center backdrop-blur-sm bg-black/10">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-[#D8D4FF] rounded-lg shadow-sm dark:bg-[#D8D4FF]">

            <button
            onClick={onClose}
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-[#D8D4FF] dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-[#0C1086] border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-[#0C1086]">
                اضافه کردن دسته بندی به {selectedName}
            </h3>
            </div>

            {/* Form */}
            <form className="p-4 md:p-5" onSubmit={onConfirm}>
            <div className="gap-4 mb-4 ">
                <div className=" w-full">
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-[#0C1086]">دسته بندی</label>
                    <select id="category" className="bg-gray-50 text-[#0C1086] text-sm rounded-lg block w-full p-2.5 dark:bg-[#D9D9D9] dark:text-[#0C1086]">
                        <option value="">Select category</option>
                        <option value="TV">TV/Monitors</option>
                        <option value="PC">PC</option>
                        <option value="GA">Gaming/Console</option>
                        <option value="PH">Phones</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-center items-center pt-3">
                <button type="submit" className="text-white justify-centerS inline-flex items-center hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#CAA200] dark:hover:bg-[#F9C700] duration-200 ease-in">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                    ثبت
                </button>
            </div>
            
            </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
