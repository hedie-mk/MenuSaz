import { useAppDispatch } from "../../../app/hooks"
import { setMenuInfoCard , setLoading , setErorr } from "../../../features/Home/menuInfoCard/menuInfoSlice"
import { useGetMenuInfoQuery } from "../../../features/Home/menuInfoCard/menuInfoApi"
import { useEffect } from "react";



export default function MenuInfoCard(){
    const { data , isLoading , error} = useGetMenuInfoQuery();
    const dispatch = useAppDispatch();
    console.log(data);
    useEffect(() => {
        dispatch(setLoading(true));
        if (error) {
            dispatch(setErorr("خطا در دریافت اطلاعات"));
        }
        if (data) {
            dispatch(setMenuInfoCard(data));
        }
    },[data, isLoading, error, dispatch]);

    
   if (isLoading) return <div>در حال بارگذاری...</div>;

   if (error) return <div>خطا در دریافت اطلاعات</div>;

return(
    <div className="rounded-2xl shadow-xl bg-[#CAA200] p-4 text-white font-medium leading-relaxed lg:min-h-[220px] ">
      <h2 className="mb-2 font-bold text-lg text-start pb-1">اطلاعات منو</h2>
      <div className="grid grid-cols-3">
        
        <div className="col-span-2 text-sm">
            <p className="text-start">نام کافه : {data?.name}</p>
            <p className="text-start">آدرس : {data?.address}</p>
            <p className="text-start">ساعت کاری : {data?.workHour}</p>
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