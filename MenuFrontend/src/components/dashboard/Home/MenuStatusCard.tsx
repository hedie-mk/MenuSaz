
import { useGetMenuStatusQuery } from "../../../features/Home/menuStatusCard/menuStatusApi"
import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { setMenuStatusCard , setLoading , setErorr } from "../../../features/Home/menuStatusCard/menuStatusSlice";



export default function MenuStatusCard() {
   const { data, isLoading, error } = useGetMenuStatusQuery();
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(setLoading(isLoading));
      if (error) {
         dispatch(setErorr("خطا در دریافت اطلاعات"));
      }
      if (data) {
         dispatch(setMenuStatusCard(data));
      }
   }, [data, error, dispatch]);


   if (isLoading) return <div>در حال بارگذاری...</div>;

   if (error) return <div>خطا در دریافت اطلاعات</div>;

 return(
    <div className="relative min-h-35 flex flex-wrap justify-center items-center px-5 py-5">
         <div className="absolute inset-0 bg-white/30 z-0 shadow-xl rounded-2xl py-4 px-6"></div>
         <div className="relative z-10 flex flex-col gap-4">
            <label className="font-bold text-lg text-start text-[#CAA200]">منو</label>
            <div className="flex flex-wrap justify-start gap-2 ">
               {data?.map((m) => (
                  <div 
                     className="text-[#0C1086] border-1  border-[#0C1086] px-3 py-1 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-[#CAA200] hover:text-white hover:border-[#CAA200]"
                     key={m.name} >
                     {m.name}
                     <span className="text-xs px-2 hover:text-white">
                        {m.itemsLength}
                     </span>
                  </div>
               ))}
            </div>
         </div>
      </div>
 );
};