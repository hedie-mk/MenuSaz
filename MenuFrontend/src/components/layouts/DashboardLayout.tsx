
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState , useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi"; 
import UserDropdown from "./DashboardUserDropdown";
import { useGetAccountQuery } from "../../features/Account/accountApi";
import { getAccount } from "../../features/Account/accountSlice";
import type { AppDispatch } from "../../app/app";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";




const DashboardLayout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const{ data } = useGetAccountQuery();

    useEffect(() => {
        if (data) {
            dispatch(getAccount(data));
        }
    },[data , dispatch])

 
    const navItems = [
        
        { label: "محصولات", to: "/dashboard/products" },
        { label: "دسته بندی ها", to: "/dashboard/categories" },
        { label: "داشبورد", to: "/dashboard/home" },
        { label: "تنظیمات منو", to: "/dashboard/menuinfo" },
        { label: "اکانت", to: "/dashboard/account" },
    ];
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative min-h-screen w-screen items-center justify-center bg-gradient-to-br  from-blue-100 via-purple-100 to-pink-100" >
            
        <header className="flex justify-around items-center md:justify-center pt-3">
            
            {/* دکمه همبرگری فقط روی موبایل */}
            <button
            className="w-full md:hidden text-3xl text-[#0C1086] mx-4 "
            onClick={() => setIsOpen(!isOpen)}
            >
            {isOpen ? <HiX className="hover:cursor-pointer" /> : <HiMenu className="hover:cursor-pointer" />}
            </button>
            <div className="w-full md:w-8 flex mx-5 md:mx-3 justify-end md:justify-start">
            <UserDropdown/>
            </div>
            {/* منوی دسکتاپ */}
            <nav className="hidden bg-[#E7E5FA] shadow-sm w-[1250px] h-[50px] rounded-full md:grid grid-cols-5 justify-items-center  gap-2 font-semibold text-gray-700 text-base">
                    {navItems.map((item) => (
                    
                             <NavLink
                                key={item.label}
                                to={item.to}
                                className={({ isActive }) => 
                                    `w-full px-4 py-3 flex justify-center rounded-full transition-all duration-300 ${
                                    isActive
                                        ? "bg-[#0C1086] text-white shadow-md text-2xl font-BTitr font-bold"
                                        : "hover:bg-[#E7E5FA] text-xl font-normal font-BNazanin text-[#0C1086]"
                                    }`
                                }
                                >
                                {item.label}
                            </NavLink>   
                        
                        
                    ))}
                
            </nav>

        </header>
        
        <div 
        className={`md:hidden fixed inset-0 z-55 mt-12 mx-4 flex flex-col gap-2 p-4 rounded-lg shadow-sm bg-[#E7E5FA] transition-all duration-500 ease-in-out transform
            ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"}
        `}
        style={{ height: isOpen ? "20rem" : "0rem", overflow: "hidden" }}
        >
        {navItems.map((item) => (
            <NavLink
            key={item.label}
            to={item.to}
            onClick={() => setIsOpen(false)} // بستن منو بعد از کلیک
            className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-300  ${
                isActive
                    ? "bg-[#0C1086] text-white shadow-md font-BTitr font-bold"
                    : "hover:bg-blue-100 text-[#0C1086] font-BNazanin"
                }`
            }
            >
            {item.label}
            </NavLink>
        ))}
        </div>
        

        <main className="relative flex items-center justify-center">
            <ToastContainer className={"font-BNazanin w-10"}/>
            <Outlet/>
        </main>
    </div>
  );
};

export default DashboardLayout;

