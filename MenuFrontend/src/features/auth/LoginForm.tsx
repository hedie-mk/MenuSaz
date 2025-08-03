
import { useLoginMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { login } from "./authSlice";
import type { AppDispatch } from "../../app/app";
import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [loginApi, { isLoading, error }] = useLoginMutation();
   const navigate = useNavigate();

  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await loginApi({ UserName, Password }).unwrap();
      dispatch(login({ token: result.token }));
      
      navigate("/dashboard/home");
      // TODO: redirect to dashboard
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className=" bg-opacity-60 rounded-xl shadow-md p-8 w-full max-w-sm border border-blue-200" >
        <h2 className="text-center text-2xl font-bold text-[#0C1086] mb-6">ورود به پنل</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className=" block mb-1 text-right font-medium text-sm text-[#0C1086]">
              نام کاربری
            </label>
            <div className="flex items-center bg-white rounded-md shadow-sm px-3 py-2">
              <FaUser className="text-[#0C1086] ml-2" />
              <input
                type="text"
                value={UserName}
                onChange={(e) => setUserName(e.target.value)}
                className="flex-1 text-right outline-none border-none bg-transparent"
                
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-right font-medium text-sm text-[#0C1086]">
              پسورد
            </label>
            <div className="flex items-center bg-white rounded-md shadow-sm px-3 py-2">
              <FaLock className="text-[#0C1086] ml-2" />
              <input
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 text-right outline-none border-none bg-transparent"
                
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">نام کاربری یا رمز اشتباه است</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0C1086] hover:bg-amber-400 text-white py-2 rounded-lg shadow-md font-bold transition disabled:opacity-50"
          >
            {isLoading ? "در حال ورود..." : "ورود"}
          </button>
        </form>
      </div>
    </div>
  );
}
