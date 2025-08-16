import React from "react";

type DeleteModalProps = {
  isOpen: boolean;
  selectedName : string | null;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  selectedName,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-[#D8D4FF] rounded-lg shadow-sm dark:bg-[#D8D4FF] ">
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

          <div className="p-4 sm:p-5 text-center">
            <svg
              className="mx-auto mb-4 text-red-600 w-12 h-12 dark:text-red-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-2 text-lg font-semibold font-BTitr text-[#0C1086] dark:text-[#0C1086]">
              حذف 
            </h3>
            <p className="mb-5 text-sm text-gray-500 dark:text-gray-500 font-BNazanin">
              آیا از حذف {selectedName} مطمعن هستید؟
            </p>
            <button
              onClick={onConfirm}
              type="button"
              className="text-white mb-1 font-BTitr bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            >
              بله , مطمعن هستم.
            </button>
            <button
              onClick={onClose}
              type="button"
              className="py-2.5 px-5 ms-3 font-BTitr text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-[#D8D4FF] dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              خیر ,  بازگشت
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
