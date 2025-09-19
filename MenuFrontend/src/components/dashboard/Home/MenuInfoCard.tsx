import { useGetMenuInfoQuery } from "../../../features/MenuInfo/MenuInfoApi";

export default function MenuInfoCard(){
    const { data , isLoading , error} = useGetMenuInfoQuery();
    
   if (isLoading) return <div>در حال بارگذاری...</div>;

   if (error) return <div>خطا در دریافت اطلاعات</div>;

return(
    <div className="rounded-2xl shadow-xl bg-[#CAA200] p-4 text-white font-medium leading-relaxed lg:min-h-[260px] ">
      <h2 className="mb-2 font-bold text-xl text-start pb-1 font-BTitr">اطلاعات منو</h2>
      <div className="grid grid-cols-3">
        
        <div className="col-span-2 text-sm font-BTitr">
            <p className="text-start pb-2">نام کافه : {data?.name}</p>
            <p className="text-start pb-2">آدرس : {data?.address}</p>
            <p className="text-start pb-2">ساعت کاری : {data?.workHour}</p>
            <p className="text-start">شماره تماس : {data?.phoneNumber}</p>
        </div>
        <div className="col-span-1">
            {data?.logo && (
                <img
                src={data.logo}
                alt="کافه"
                className="w-18 h-18 object-cover rounded-full mx-auto mb-3"
                />
            )}
        </div>
      </div>
      
      
    </div>
 )
}