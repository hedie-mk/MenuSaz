import { useGetLatestProductQuery } from "../../../features/Home/latestProductsCard/latestProductsApi";

export default function LatestAddedProducts() {
  const { data, isLoading, error } = useGetLatestProductQuery();

  return (
    <div className="relative min-h-35 flex flex-wrap px-5 py-5 justify-start lg:min-h-[220px]">
        <div className="absolute inset-0 bg-white/30 z-0 shadow-xl rounded-2xl py-4 px-6"></div>
        <div className="relative z-10 flex flex-col gap-4 justify-start ">

            <h2 className="text-[#CAA200] text-lg font-bold mb-1 text-start">
            آخرین محصولات اضافه شده
             </h2>

            <div className="grid grid-cols-3 p-1.5 text-[#0C1086] text-xs font-normal bg-[#FFF0B3] rounded-lg">
                <span>نام محصول</span>
                <span className="col-span-1 text-center">توضیحات</span>
                <span className="text-left">تاریخ ایجاد</span>
            </div>

            <div className="overflow-y-auto space-y-1 pr-1 text-sm text-[#0C1086]">
                {isLoading && <p className="text-center">در حال بارگذاری...</p>}
                {error && <p className="text-red-500 text-center">خطا در دریافت اطلاعات</p>}
                {data &&
                data.map((item: any) => (
                    <div
                    key={item.id}
                    className="grid grid-cols-3 border-b border-[#f1f1f1] font-light text-[13px]"
                    >
                    <span className="truncate">{item.name}</span>
                    <span className="text-center truncate px-1">{item.description}</span>
                    <span className="text-left text-gray-500 text-[12px]">{item.createdAt}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}
