import { useSelector } from "react-redux";
import type { RootState } from "../../app/app";
import { Trash2 , PlusIcon} from "lucide-react"; 
import { addOrders , removeLikedProducts } from "../../features/Menu/MenuSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/app";
import { toast } from "react-toastify";



export default function FavoritePage(){
    const {liked } = useSelector((state : RootState) => state.menu)
    const dispatch = useDispatch<AppDispatch>()

 return(
    <div className="space-y-3 p-4 overflow-hidden">
        <div className="text-2xl font-bold text-white font-BTitr">
            <h1>علاقه مندی ها</h1>
        </div>
        <div className="mt-8">
            {liked.map((item)=> (
                <div key={item.id} className="flex justify-between space-x-2 bg-[#40191B] rounded-xl px-1 py-1 mb-2 transition-all duration-300 ease-in-out">
                    <div className="flex justify-center items-center rounded-full">
                        <img
                            src={item.photo ?? undefined}
                            className="w-15 h-15 object-cover rounded-full"
                        />
                    </div>
                    <div className="flex-2/4">
                        <p className="text-lg text-white font-bold font-BTitr">{item.name}</p>
                        {item.discountedPrice 
                        ? (
                            <>
                                <p className="text-white font-normal font-BNazanin">{item.discountedPrice}<span className="text-xs text-white font-extralight" >تومان</span></p>
                                <p className="text-xs font-light text-gray-500 line-through font-BNazanin">{item.price}</p>
                            </>
                        ) 
                        : (
                            <p className="text-white font-normal font-BNazanin">{item.price}<span className="text-xs text-white font-extralight" >تومان</span></p>
                        )}
                        
                    </div>
                    <div className="flex justify-center items-center">
                        {item.state === "diactive" ? (
                            <div className="bg-white  rounded-xl mx-1 px-2 py-2 text-[#40191B] font-BTitr text-sm">
                                ناموجود
                            </div>
                        ) :(
                            <button 
                            onClick={() =>
                            {
                                dispatch(addOrders(item))
                                toast.success(`${item.name} به سفارشات اضافه شد`)
                            } }
                            className="w-10 h-10 flex justify-center items-center bg-white rounded-lg mx-1"
                            >
                                <PlusIcon className="w-9 h-9 duration-300 ease-in-out hover:scale-120 hover:cursor-pointer"/>
                            </button>
                        )}

                        <button onClick={() => dispatch(removeLikedProducts(item.id))}>
                            <Trash2 className="text-[#A16265] mx-1 hover:cursor-pointer duration-300 ease-in-out hover:scale-120 hover:text-red-600"/>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
 )
}