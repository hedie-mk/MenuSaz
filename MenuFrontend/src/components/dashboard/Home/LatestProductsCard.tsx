import { useGetLatestProductQuery } from "../../../features/Products/productApi";
import { useNavigate } from "react-router-dom";

export default function LatestAddedProducts() {
  const { data, isLoading, error } = useGetLatestProductQuery();
    const navigate = useNavigate();
  return (
    <div className="relative min-h-35 w-full flex flex-wrap px-5 py-5 justify-start lg:min-h-[220px]">
        <div className="absolute inset-0 bg-white/30 z-0 shadow-xl rounded-2xl py-4 px-6"></div>
        <div className="relative w-full z-10 flex flex-col gap-3 justify-start ">

            <h2 className="text-[#CAA200] text-lg font-bold mb-0.5 text-start font-BTitr">
            آخرین محصولات اضافه شده
             </h2>

            <div className="grid grid-cols-3 p-1 font-BNazanin text-[#0C1086] text-sm font-normal bg-[#FFF0B3] rounded-lg">
                <span className="px-2">نام محصول</span>
                <span className="col-span-1 text-center">قیمت</span>
                <span className="text-left px-2">تاریخ ایجاد</span>
            </div>

            <div className="overflow-y-auto space-y-1 p-1 pr-1 text-sm font-BNazanin text-[#0C1086]">
                {isLoading && <p className="text-center">در حال بارگذاری...</p>}
                {error && <p className="text-red-500 text-center">خطا در دریافت اطلاعات</p>}
                {data &&
                data.map((item: any) => (
                    <div
                    key={item.id}
                    className="grid grid-cols-3 font-light text-[13px]"
                    >
                    <span 
                    className="truncate cursor-pointer font-bold px-2" 
                    onClick={() => navigate(`/dashboard/products/update/${item.id}`)}>
                        {item.name}
                    </span>
                    <span className="text-center truncate">{item.price}</span>
                    <span className="text-left text-gray-500 text-[12px] px-2">{item.createdAt}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
