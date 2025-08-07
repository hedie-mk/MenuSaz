import { useState , useEffect} from "react";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (item : any) => void;
  name : string | null
}

export default function MainCategoryModal({
  isOpen,
  onClose,
  onConfirm,
  name
}: ModalProps) {


  const [Name, setName] = useState<string | null>(null);

  


  useEffect(() => {
    setName(name ?? null);
  }, [name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Name) {
      onConfirm({
        name : Name
      });
      setName(null)
    }
  };
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

            
            <div className="flex items-center justify-between p-4 md:p-5 mb-3 border-b rounded-t dark:border-[#0C1086] border-gray-200">
              <h2 className="text-xl font-semibold text-[#0C1086] ">
                ساخت دسته بندی اصلی
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-3 md:p-4">
              <div>
                <label htmlFor="name" className="block mb-1 text-sm font-medium text-[#0C1086]">
                  عنوان دسته بندی
                </label>
                <input
                  id="name"
                  type="text"
                  value={Name ?? ""}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="نام دسته بندی را وارد کنید"
                  className="w-full px-3 py-2 bg-[#D9D9D9] rounded-lg text-sm"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-[#CAA200] hover:bg-[#F9C700] text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
                >
                  ثبت
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}
