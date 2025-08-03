
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";


const DashboardLayout = () => {
    const navItems = [
        
        { label: "محصولات", to: "/dashboard/products" },
        { label: "دسته بندی ها", to: "/dashboard/categories" },
        { label: "داشبورد", to: "/dashboard/home" },
        { label: "تنظیمات منو", to: "/dashboard/menu-info" },
        { label: "اکانت", to: "/dashboard/accounts" },
    ];
  return (
    <div className="min-h-screen w-screen items-center justify-center bg-gradient-to-br  from-blue-100 via-purple-100 to-pink-100" >
        <header className="flex items-center justify-center pt-3">
            <nav className="bg-[#E7E5FA] shadow-sm w-[1120px] h-[50px] rounded-full grid grid-cols-5 justify-items-center  gap-2 font-semibold text-gray-700 text-base">
                
                    {navItems.map((item) => (
                    
                             <NavLink
                                key={item.label}
                                to={item.to}
                                className={({ isActive }) =>
                                    `w-full px-4 py-3 flex justify-center rounded-full transition-all duration-300 ${
                                    isActive
                                        ? "bg-[#0C1086] text-white shadow-md text-2xl font-bold"
                                        : "hover:bg-blue-100 text-xl font-normal text-[#0C1086]"
                                    }`
                                }
                                >
                                {item.label}
                            </NavLink>   
                        
                        
                    ))}
                
            </nav>
        </header>
        
        <main className="flex items-center justify-center">
            <Outlet/>
        </main>
    </div>
  );
};

export default DashboardLayout;

