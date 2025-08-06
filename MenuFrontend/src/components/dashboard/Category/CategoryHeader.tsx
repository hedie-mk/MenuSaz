
import SearchInput from "../shared/searchInput"
import { useState } from "react";
import CreateCategoryModal from "./CreateCategoryModal";
import CreateMainCategoryModal from "./CreateMainCategoryModal";
import { useCreateCategoryMutation } from "../../../features/Category/categoryApi";
import { useCreateMainCategoryMutation } from "../../../features/MainCategory/MainCategoryApi";

type CategoryHeaderProps = {
    search : string,
    setSearch : (value : string) => void,
}


export default function CategoryHeader({
    search,
    setSearch
} : CategoryHeaderProps){

    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [mainCategoryModalOpen, setMainCategoryModalOpen] = useState(false);

    const [createCategory] = useCreateCategoryMutation();
    const [createMainCategory] = useCreateMainCategoryMutation();

    const handelSubmitCategory = (mainCategoryId : string , name : string) => {
        createCategory({
            name : name,
            parentCategoryId : mainCategoryId
        })
        setCategoryModalOpen(false);
    }

    const handelSubmitMainCategory = (name : string) => {
        createMainCategory({
            name : name
        })
        setMainCategoryModalOpen(false);
    }


    return(
        <>
            <div className="flex justify-between col-span-3 items-center ">
                <div className="flex gap-4 items-center ">
                    <SearchInput search={search}
                                setSearch={setSearch}
                    />
                </div>
            </div>
            <div className="col-span-2 flex justify-end items-end">
                <div className="flex gap-3 items-center ">
                    <button
                        onClick={() => setMainCategoryModalOpen(true)}
                        className=" lg:w-[230px] w-[150px] border border-yellow-400 hover:bg-yellow-500 hover:text-white hover:cursor-pointer duration-400 ease-in-out  text-yellow-500 font-bold py-2 px-6 rounded-xl text-lg shadow "
                    >
                        ساخت دسته بندی اصلی
                    </button>
                    <button
                        onClick={() => setCategoryModalOpen(true)}
                        className=" lg:w-[230px] w-[150px] bg-yellow-400 hover:bg-yellow-500 hover:cursor-pointer duration-400 ease-in-out text-white font-bold py-2 px-6 rounded-xl text-lg shadow "
                    >
                        ساخت دسته بندی
                    </button>
                </div>
                <CreateCategoryModal
                isOpen={categoryModalOpen}
                onClose={() => setCategoryModalOpen(false)}
                onConfirm={(mainCategoryId , name) => handelSubmitCategory(mainCategoryId,name)}
                />
                <CreateMainCategoryModal
                isOpen={mainCategoryModalOpen}
                onClose={() => setMainCategoryModalOpen(false)}
                onConfirm={(name) => handelSubmitMainCategory(name)}
                />
            </div>
                  
        </>

    )
}