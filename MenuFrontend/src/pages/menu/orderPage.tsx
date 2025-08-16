import { useSelector } from "react-redux"
import type { RootState } from "../../app/app"
import { Minus , PlusIcon , Download , Share2} from "lucide-react"; 
import { useOrderSummary } from "../../hooks/useOrderSummary";
import { addOrders , removeOrders} from "../../features/Menu/MenuSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/app";
import { useExportOrder } from "../../hooks/useExportOrder";




export default function OrderPage(){
    const {orders} = useSelector((state : RootState) => state.menu)
    const { totalPrice } = useOrderSummary();

    const { downloadPDF , shareOrder } = useExportOrder("order-list", "my-order");

    const dispatch = useDispatch<AppDispatch>()
    return(
        <div className="space-y-3 p-4 overflow-hidden ">
            <div className="text-2xl font-bold text-white font-BTitr">
                <h1>لیست سفارشات</h1>
            </div>
                <div id="order-list" className="border-1 bg-[#1B2744] border-white rounded-2xl px-2 py-5 mt-8 font-BNazanin">
                    {orders.map((o, index) => (
                        o?.item && (
                            <div key={o.item.id || index} className="flex justify-between items-center border-b-1 border-white px-1 py-2">
                                <div className="flex-2/3 w-full">
                                    <p className="text-lg text-white font-bold">{o.item.name}</p>
                                    {o.item.discountedPrice
                                        ? (
                                            <>
                                                <p className="text-white font-normal">
                                                    {o.item.discountedPrice}
                                                    <span className="text-xs text-white font-extralight"> تومان</span>
                                                </p>
                                                <p className="text-xs font-light text-[#8A8A8A] line-through">{o.item.price}</p>
                                            </>
                                        )
                                        : (
                                            <p className="text-white font-normal">
                                                {o.item.price}
                                                <span className="text-xs text-white font-extralight"> تومان</span>
                                            </p>
                                        )}
                                </div>
                                <div className="flex-1/3 flex space-x-2 justify-center items-center">
                                    <button className="flex justify-center items-center bg-white rounded-full w-5 h-5 duration-300 ease-in-out hover:scale-120 hover:cursor-pointer">
                                        <PlusIcon 
                                        className="w-4 h-4 text-[#1B2744] transition-all" 
                                        onClick={() => dispatch(addOrders(o.item))} />
                                    </button>
                                    <input readOnly value={o.count} className="bg-white w-6 rounded-sm text-center font-bold text-[#1B2744]" />
                                    <button className="flex justify-center items-center bg-white rounded-full w-5 h-5 duration-300 ease-in-out hover:scale-120 hover:cursor-pointer">
                                        <Minus 
                                        className="w-4 h-4 text-[#1B2744] transition-all" 
                                        onClick={() => dispatch(removeOrders(o.item))} />
                                    </button>
                                </div>
                            </div>
                        )
                    ))}
                    <div className="flex justify-between items-center bg-[#40191B] text-white text-xl font-bold px-3 py-5 rounded-2xl mt-5">
                        <h2 className="font-BTitr">جمع سفارشات : </h2>
                        <h2>{totalPrice}</h2>
                    </div>  
                </div>
                <div className="flex justify-end items-center space-x-2">
                    <button 
                    onClick={downloadPDF} 
                    className="bg-[#D9D9D9] text-[#1B2744] rounded-sm w-8 h-8 hover:bg-[#40191B] hover:text-[#D9D9D9] hover:cursor-pointer transition-all duration-300 ease-in-out">
                        <Download className="w-8 h-8"/>
                    </button>
                    <button 
                    onClick={shareOrder} 
                    className="bg-[#D9D9D9] text-[#1B2744] rounded-sm w-8 h-8 hover:bg-[#40191B] hover:text-[#D9D9D9] hover:cursor-pointer transition-all duration-300 ease-in-out">
                        <Share2 className="w-8 h-8"/>
                    </button>
                </div>
            </div>
    )
}