import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/app"; // مسیر استور خودت رو بزن
import { logout } from "../../features/auth/authSlice";
import {UserCircle2} from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/app";
import {persistor} from "../../app/app";


const UserDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>()
    // گرفتن اطلاعات کاربر از Redux
    const { userName , role } = useSelector((state: RootState) => state.account);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    // بستن منو وقتی بیرون کلیک میشه
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const signOut = () => {
        dispatch(logout())
        persistor.flush()
        localStorage.clear();
    }


  return (
    <div className="relative p-1" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex text-sm bg-[#E7E5FA] rounded-full focus:ring-3 focus:ring-yellow-400 hover:cursor-pointer"
        type="button"
      >
        <span className="sr-only ">Open user menu</span>
        <UserCircle2 className=" text-[#0C1086] w-8 h-8 rounded-full" />
      </button>

      
        <div 
        className={` left-2  md:right-0 z-20 mt-2 bg-white divide-y divide-gray-300 rounded-lg shadow-sm w-40 transition-all duration-500 ease-in-out transform
            ${isOpen ? " absolute opacity-100 translate-y-0" : "hidden opacity-0 -translate-y-6"}`
        }
        
        >
          <div className="px-4 py-3 text-sm text-text-[#444]">
            <div className="font-bold">{userName}</div>
            <div className="font-light text-sm truncate">{role}</div>
          </div>
          <div className="py-2">
            <button
              onClick={() => signOut()}
              className="block font-BTitr px-4 py-2 text-sm text-[#0C1086] hover:text-red-600 cursor-pointer transition-all duration-300 ease-in"
            >
              خروج از اکانت
            </button>
          </div>
        </div>
      
    </div>
  );
};

export default UserDropdown;
