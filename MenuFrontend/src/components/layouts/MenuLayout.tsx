import { useEffect , useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/app";
import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom";
import { Home, Heart, ShoppingCart } from "lucide-react"; 
import type { GetMenuMainCategories } from "../../features/Menu/MenuTypes";
import { useNavigate } from "react-router-dom";
import MenuHeader from "../menu/menuHeader";
import SearchResult from "../menu/searchResult";
import { ToastContainer } from "react-toastify";


import { 
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetMenuInformationQuery
 } from "../../features/Menu/MenuApi";
import {
  getCategories,
  getProducts,
  getMenuInformation 
} from "../../features/Menu/MenuSlice";

interface MenuLayoutProps {
    mainCategories : GetMenuMainCategories[]
}

export default function MenuLayout({mainCategories}: MenuLayoutProps){
  const {data : categories} = useGetCategoriesQuery();
  const {data : products} = useGetProductsQuery();
  const {data : menuInfo} = useGetMenuInformationQuery();

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    if(categories) dispatch(getCategories(categories));
    if(products) dispatch(getProducts(products));
    if(menuInfo) dispatch(getMenuInformation(menuInfo));
  },[categories , products , menuInfo, mainCategories])

  const [search , setSearch] = useState("");



  return (
    <div className="flex h-screen bg-[#1B2744]">
      {/* سایدبار */}
      <aside className="flex flex-col rounded-bl-full rounded-tl-full  items-center w-11 bg-[#40191B] py-4">
        {/* آیکون بالا */}
        <button 
        onClick={()=>
          { 
            navigate('/menu/orders')
            setSearch("")
          }
        } 
        className="p-2">
          <ShoppingCart className="text-white w-6 h-6 transition-all duration-300 ease-in-out hover:scale-120" />
        </button>

        {/* دسته‌بندی‌ها */}
        <div className="flex flex-1 flex-col justify-evenly items-center gap-6">
          {
            mainCategories?.filter(c => c.state === "active").map((cat: any) => (
              <NavLink
                key={cat.id}
                onClick={()=> setSearch("")} 
                to={`/menu/${cat.name}`}
                className={({isActive}) => 
                    `text-white text-sm font-bold cursor-pointer transition-all duration-300 ease-in-out font-BNazanin 
                    ${isActive ? `bg-[#40191B] w-full rounded-full px-3 py-6 font-BTitr` : ``}
                    }`
                }
                style={{ writingMode: "vertical-lr" }}
              >
                {cat.name}
              </NavLink>
            ))
           }
        </div>

        {/* آیکون‌های پایین */}
        <div className="flex flex-col items-center gap-4 p-2">
          <button 
          onClick={()=>
            { 
              navigate('/menu/favorite')
              setSearch("")
            }}
          >
            <Heart className="text-white w-6 h-6 transition-all duration-300 ease-in-out hover:scale-120" />
          </button>
          <button 
          onClick={()=>
            { 
              navigate('/menu/')
              setSearch("")
            }}
          >
            <Home className="text-white w-6 h-6 transition-all duration-300 ease-in-out hover:scale-120" />
          </button>
        </div>
      </aside>

      {/* محتوای اصلی */}
      <main className=" flex-1 overflow-auto ">
        <ToastContainer className={"font-BNazanin"}/>
        <header className="">
            <MenuHeader cafeName={menuInfo?.name ?? ""} search={search} setSearch={setSearch}/>
        </header>
        {search === "" ? (
        <Outlet/>
        ) :(
          <SearchResult search={search}/>
        )}
      </main>


    </div>
  );
}