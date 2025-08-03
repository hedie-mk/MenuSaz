import { Link } from "react-router-dom";
import MenuInfoCard from "../../../components/dashboard/Home/MenuInfoCard";
import LatestProductsCard from "../../../components/dashboard/Home/LatestProductsCard";
import InactiveProductsCard from "../../../components/dashboard/Home/InactiveProductsCard";
import InactiveCategoriesCard from "../../../components/dashboard/Home/InactiveCategoriesCard";
import MenuStatusCard from "../../../components/dashboard/Home/MenuStatusCard";

export default function DashboardHome() {
  return (
    <div className="w-[1120px] p-6 space-y-3">
      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative h-15 flex justify-center items-center">
            <div className="absolute inset-0 bg-white/70 z-0 shadow rounded-2xl py-4 px-6  hover:bg-gray-100"></div>
            <div className="relative z-10">
                <Link to="/dashboard/products/create" className=" text-xl text-center font-bold text-[#0C1086]">
                    ساخت محصول
                </Link>
            </div>
        </div>
        <div className="relative h-15 flex justify-center items-center">
            <div className="absolute inset-0 bg-white/70 z-0 shadow rounded-2xl py-4 px-6  hover:bg-gray-100"></div>
            <div className="relative z-10">
                <Link to="/dashboard/categories" className=" text-xl text-center font-bold text-[#0C1086]">
                مدیریت منو
                </Link>
            </div>
        </div>
        <div className="relative h-15 flex justify-center items-center">
            <div className="absolute inset-0 bg-white/70 z-0 shadow rounded-2xl py-4 px-6  hover:bg-gray-100"></div>
            <div className="relative z-10">
                <Link to="/menu" className=" text-xl text-center font-bold text-[#0C1086]">
                مشاهده سایت
                </Link>
            </div>
        </div>
        
        
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       
       <div className="lg:col-span-1 ">
        <div className="grid lg:grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col p-2">
            <InactiveProductsCard />
          </div>
          <div className="flex flex-col p-2">
            <InactiveCategoriesCard />
          </div>
        </div>
       </div>

       <div className="lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="md:col-span-2 p-2">
              <MenuStatusCard />
            </div>
            <div className="md:col-span-1 p-2">
              <LatestProductsCard />
            </div>
            <div className="md:col-span-1 p-2">
              <MenuInfoCard />
            </div>
          </div>
       </div>
      </div>
    </div>
  );
}