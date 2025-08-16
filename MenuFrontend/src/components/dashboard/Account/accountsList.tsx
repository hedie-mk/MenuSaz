import type { GetAccount } from "../../../features/Account/accountType"
import {  Trash2 , UserPlus2Icon } from "lucide-react";
import { useState } from "react";
import DeleteModal from "../shared/DeleteModal";
import CreateAccountModal from "./accountCreateModal";
import { useDeleteAccountMutation } from "../../../features/Account/accountApi";
type AccountListProps = {
    accounts : GetAccount[] | undefined
}
export default function AccountList({accounts} : AccountListProps){
    
    const [deleteModal,setDeleteModal] = useState<boolean>(false);
    const [selectedName , setSelectedName] = useState<string| null>(null);
    const [selectedId , setSelectedId] = useState<string>("");
    const [deleteAccount] = useDeleteAccountMutation();

    const [createModal , setCreateModal] = useState<boolean>(false);



    const onConfirm = async () => {
        try {
            await deleteAccount(selectedId).unwrap();
        } catch (err) {
            console.error("Error deleting account:", err);
            alert("خطا در حذف اکانت");
        }
        setDeleteModal(false);
        setSelectedName(null)
        setSelectedId("");
    }

    return(
        <>
            <div className="w-full max-h-[700px] md:w-1/3 border border-yellow-400 rounded-2xl p-4 bg-white/30 mb-5">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-amber-400 font-BTitr">لیست اکانت‌ها</h2>
                    <button onClick={() => setCreateModal(true)} className="bg-amber-400 p-1 rounded-full hover:bg-yellow-600">
                    <UserPlus2Icon className="text-white"/>
                    </button>
                </div>
                <ul className="space-y-2 overflow-y-auto font-BNazanin">
                    <li
                    className="flex justify-between items-center font-normal text-sm text-[#0C1086] bg-[#D8D4FF] rounded-full px-3 py-2"
                    >
                    <span>نام کاربری</span>
                    <span>عملیات</span>
                    </li>
                    {accounts?.map((acc) => (
                        acc.role === "Manager" ? (null) : (
                            <li
                                key={acc.id}
                                className="flex justify-between text-[#565757] items-center px-3 py-1"
                            >
                                <span className="text-sm" dir="ltr">{acc.userName}</span>
                                <button onClick={() => {
                                    setDeleteModal(true); 
                                    setSelectedName(acc.userName);
                                    setSelectedId(acc.id)
                                    }}
                                    className="text-[#0C1086] hover:text-red-700">
                                <Trash2/>
                                </button>
                            </li>    
                            )
                        
                    ))}
                </ul>
            </div>
            <CreateAccountModal
            isOpen={createModal}
            onClose={() => setCreateModal(false)}
            />
            <DeleteModal
            isOpen={deleteModal}
            selectedName={selectedName}
            onClose={() => setDeleteModal(false)}
            onConfirm={onConfirm}
            />
        </>
    )
}