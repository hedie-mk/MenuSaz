import { useGetInactiveCategoriesQuery } from "../../../features/Category/categoryApi";

import InactiveItem from "../../../components/dashboard/shared/inactiveItem";


export default function InactiveCategoriesCard(){
    const {data , isLoading , error} = useGetInactiveCategoriesQuery();
    if (isLoading) return <div>در حال بارگذاری...</div>;

    if (error) return <div>خطا در دریافت اطلاعات</div>;
   
    return(
    <div className="relative min-h-35 flex flex-wrap px-5 py-5 justify-start">
        <div className="absolute inset-0 bg-white/30 z-0 shadow-xl rounded-2xl py-4 px-6"></div>
        <div className="relative z-10 flex flex-col gap-4 justify-start ">
                {
                    isLoading ? ( <div>در حال بارگذاری...</div>) : null 
                }
                {
                    error ? (<div>خطا در دریافت اطلاعات</div>) : null
                }
            <label className="font-bold text-lg text-[#CAA200] text-start">دسته بندی های غیر فعال</label>
            <ul className="text-sm space-y-1 text-gray-700 justify-start items-start">
                {data?.map((d) => (
                <InactiveItem key={d.id} id={d.id} name={d.name} diactiveDateTime={d.diactiveDateTime} />
                ))}
            </ul>
        </div>
    </div>
 )
}