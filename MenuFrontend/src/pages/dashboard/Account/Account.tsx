import AccountBox from "../../../components/dashboard/Account/accountBox";
import {jwtDecode} from "jwt-decode";
import type { RootState } from "../../../app/app";
import { useSelector } from "react-redux";


export default function Account() {

  const token = useSelector((state: RootState) => state.auth.token);
  let role = "";

  if (token) {
    try {
      const decoded = jwtDecode<{ role: string }>(token);
      role = decoded.role;
    } catch (error) {
      console.error("توکن نامعتبره:", error);
    }
  }

  return (
    <div className="flex flex-col md:flex-row w-full max-w-[800px] gap-4 px-6 mt-5 sm:mt-30 justify-center items-center">
      <div className="w-1/2 px-4 font-BTitr py-3 sm:hidden flex justify-center rounded-full bg-[#0C1086] text-white shadow-md text-sm font-bold">
          اکانت
      </div>
      <AccountBox role={role}/>
    </div>
  );
}
