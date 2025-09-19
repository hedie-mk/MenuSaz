import { useGetMenuStatusQuery } from "../../../features/Category/categoryApi";

export default function MenuStatusCard() {
   const { data, isLoading, error } = useGetMenuStatusQuery();

   if (isLoading) return <div>در حال بارگذاری...</div>;

   if (error) return <div>خطا در دریافت اطلاعات</div>;

 return(
    <div className="relative min-h-50 flex flex-wrap justify-start items-start px-5 py-5">
         <div className="absolute inset-0 bg-white/30 z-0 shadow-xl rounded-2xl py-4 px-6"></div>
         <div className="relative z-10 flex flex-col gap-4">
            <label className="font-bold text-lg text-start text-[#CAA200] font-BTitr">منو</label>
            <div className="flex flex-wrap justify-start gap-2 ">
               {data?.map((m) => (
                  <div 
                     className="text-[#0C1086] border-1 font-BTitr border-[#0C1086] px-3 py-1 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-[#CAA200] hover:text-white hover:border-[#CAA200]"
                     key={m.name} >
                     {m.name}
                     <span className="text-sm px-2 hover:text-white">
                        {m.itemsLength}
                     </span>
                  </div>
               ))}
            </div>
         </div>
      </div>
 );
};