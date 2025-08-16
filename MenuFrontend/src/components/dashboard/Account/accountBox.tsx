import { useEffect , useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useGetAccountsQuery, useGetAccountQuery , useUpdateAccountMutation} from "../../../features/Account/accountApi";
import AccountList from "./accountsList";
import type { UpdateAccount } from "../../../features/Account/accountType";
import ChangePasswordModal from "./ChangePasswordModal";
import {  toast } from "react-toastify";


const accountSchema = z.object({
  name: z.string().min(1, "نام محصول الزامی است"),
  email: z.string().optional(),
  phoneNumber : z.string().optional(),
});
type AccountFormData = z.infer<typeof accountSchema>;

type AccountBoxProps = {
    role : string
}


export default function AccountBox({role}: AccountBoxProps){
    const { data: myAccount, isLoading: accountLoading } = useGetAccountQuery();
    const [updateAccount] = useUpdateAccountMutation();

    const [changePasswordModal , setChangePasswordModal] = useState<boolean>(false);


    const {
    data: accounts,
    isLoading: accountsLoading,
    } = useGetAccountsQuery(undefined, {
    skip: role !== "Manager",
    });

    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    } = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
            defaultValues: {
                name: "",
                email: "",
                phoneNumber: "",
            },
    });

    useEffect(() => {
    if (myAccount) {
        reset({
        name: myAccount.userName || "",
        email: myAccount.email || "",
        phoneNumber : myAccount.phone || "" ,
        });
    }
    }, [myAccount, reset]);

    const onSubmit = async (formValues: AccountFormData) => {
        const payload = {
            id: myAccount?.id as string,
            userName: formValues.name,
            email: formValues.email || "",
            phone: formValues.phoneNumber || ""
        };
        try {
        await updateAccount(payload as UpdateAccount).unwrap();
        toast.success("اکانت با موفقیت ویرایش شد");
        } catch (err) {
        console.error("Error updating product:", err);
        toast.error("خطا در ویرایش اکانت");
        }
    };

    if (accountLoading || (role === "Manager" && accountsLoading)) {
        return <div className="text-center mt-10">در حال بارگذاری...</div>;
    }
    return(
        <>
        <div className="w-full font-BNazanin md:w-2/3 border border-yellow-400 rounded-2xl p-5 sm:px-20 bg-white/30">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 p-2 font-BTitr">
                            نام کاربری<span className="text-red-500">*</span>
                        </label>
                        <input
                        type="text"
                        {...register("name")}
                        dir="ltr"
                        className="w-full text-sm bg-[#D9D9D9] rounded-lg px-3 py-2 "
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 p-2 font-BTitr">ایمیل</label>
                        <input
                        type="text"
                        {...register("email")}
                        dir="ltr"
                        className="w-full text-sm bg-[#D9D9D9] rounded-lg px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 p-2 font-BTitr">شماره تماس</label>
                        <input
                        type="text"
                        {...register("phoneNumber")}
                        dir="ltr"
                        className="w-full text-sm bg-[#D9D9D9] rounded-lg px-3 py-2"
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center items-center">
                    <div 
                    onClick={() => setChangePasswordModal(true)}
                    className="flex w-full font-BTitr sm:w-2/5 font-bold border justify-center border-yellow-500 text-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-100">
                        تغییر رمز عبور
                    </div>
                    <button
                    type="submit"
                    disabled={accountLoading}
                    className="bg-yellow-500 w-full font-BTitr sm:w-3/5 font-bold text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                    >
                        ویرایش اطلاعات
                    </button>
                    
                </div>
            </form>
            
        </div>
        <ChangePasswordModal
        isOpen={changePasswordModal}
        onClose={() => setChangePasswordModal(false)}
        accountId={myAccount?.id ?? ""}
        />
        {role === "Manager" && (
            <AccountList accounts={accounts}/>
        )}
        </>
    )
}