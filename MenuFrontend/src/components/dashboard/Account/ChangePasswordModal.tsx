import { useState } from "react";
import { useChangePasswordMutation } from "../../../features/Account/accountApi";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "react-toastify";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId : string
}



export default function ChangePasswordModal({ isOpen, onClose , accountId }: ModalProps){
    const [form, setForm] = useState({
    id: accountId,
    currentPassword: "",
    password: "",
    confirmPassword : "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [changePassword] = useChangePasswordMutation();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
        setError("پسوورد و تکرار پسوورد باید یکسان باشند");
        return;
        }

        setError(null);

        try {

        await changePassword({
            id: form.id,
            password: form.password,
            currentPassword : form.currentPassword
        }).unwrap();

        setForm({ id: "", currentPassword : "", password: "", confirmPassword: "" });
        onClose();
        toast.success("پسوورد با موفقیت تغییر پیدا کرد")
        } catch (err) {
        console.error("Error changing account password:", err);
        toast.error("خطا در ویرایش پسوورد");
        }
    };
    if (!isOpen) return null;

    return(
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

          <div className="flex items-center justify-between p-4 md:p-5 mb-3 rounded-t border-b-2 dark:border-[#F9C700] border-gray-200">
            <h2 className="text-xl font-bold text-[#0C1086] font-BTitr">
              تغییر پسوورد
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 p-3 md:p-4">
                        <div>
              <label className="block mb-1 text-sm font-medium text-[#0C1086] font-BTitr">
                پسوورد در حال حاضر
              </label>
              <input
                name="currentPassword"
                type="text" 
                value={form.currentPassword}
                onChange={handleChange}
                required
                dir="ltr"
                className="w-full px-3 py-2 bg-[#ebe9ff] rounded-lg text-sm font-BNazanin"
              />
            </div>

            <div className="relative w-full">

                <label className="block mb-1 text-sm font-medium text-[#0C1086] font-BTitr">
                    پسوورد
                </label>
                <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    required
                    dir="ltr"
                    className="w-full px-3 py-2 bg-[#ebe9ff] rounded-lg text-sm font-BNazanin"
                />
                <button
                        type="button"
                        className="absolute inset-y-0 right-3 top-6 flex items-center text-[#0C1086] hover:text-gray-700"
                        onClick={() => setShowPassword((prev) => !prev)}
                        >
                        {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-[#0C1086] font-BTitr">
                    تکرار پسوورد
                </label>
                <input
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    dir="ltr"
                    className="w-full px-3 py-2 bg-[#ebe9ff] rounded-lg text-sm font-BNazanin"
                />
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#CAA200] font-BTitr w-2/4 hover:bg-[#F9C700] text-white font-bold rounded-lg text-lg px-3 py-2 transition-colors"
              >
                ثبت
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
}