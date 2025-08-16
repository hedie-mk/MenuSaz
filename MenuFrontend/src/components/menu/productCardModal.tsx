import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/app";
import { addOrders , addLikedProducts , removeLikedProducts } from "../../features/Menu/MenuSlice";
import type { GetMenuProducts } from "../../features/Menu/MenuTypes"
import { LucidePlusCircle , Heart} from "lucide-react"; 

type ProductCardModalProps = {
    isOpen : boolean,
    onClose : () => void,
    item : GetMenuProducts | null,
    liked : GetMenuProducts[]
}


export default function ProductCardModal({isOpen, onClose, item , liked } : ProductCardModalProps){
    const dispatch = useDispatch<AppDispatch>();

    const isLiked = liked.some((p) => p.id === item?.id);



    if(item) return(
    <div className={`fixed inset-0 z-55 flex items-center justify-center backdrop-blur-sm bg-black/10 transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="relative p-4 w-80 max-w-md max-h-full">
            <div className="relative bg-[#40191B]  text-white rounded-xl shadow-sm ">
                <button
                
                onClick={onClose}
                type="button"
                className="absolute z-55 top-1 start-1 hover:text-white hover:bg-[#40191B] bg-gray-200 text-gray-900 rounded-full text-sm w-8 h-8 inline-flex justify-center items-center transition-all duration-300 ease-in-out"
                >
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div 
                className="flex justify-end px-2" 
                onClick={() => {
                    if (isLiked) {
                        dispatch(removeLikedProducts(item.id));
                    } else {
                        dispatch(addLikedProducts(item));
                    }
                }}
                >
                    <Heart className={`absolute z-10 mt-1 transition-all duration-300 ease-in-out ${isLiked ? " text-red-600 fill-red-600 scale-140 " : "scale-120"}`}/>
                </div>
                <img
                    src={item.photo ?? undefined}
                    className="w-full h-60 object-cover rounded-b-full transition-all duration-500 ease-in-out group-hover:scale-110 "
                />
                <p className="flex text-xl font-extrabold mt-1 items-center justify-center font-BTitr">{item.name}</p>
                <p className="flex text-sm mt-1 items-center justify-center px-4 mb-3 font-BNazanin">توضیحات : {item.description}</p>
                {
                    item.discountedPrice 
                    ? (
                    <>
                        <p className="flex justify-end text-2xl mt-2 font-BNazanin">{item.discountedPrice}<span className="text-sm px-1 mt-1 font-light">تومان</span></p>
                        <p className="flex justify-end px-9 font-BNazanin text-[#8A8A8A] font-light text-lg line-through mb-10" >{item.price}</p>
                    </>
                    
                    )
                    : (
                        <p className="flex justify-end text-2xl mt-2 mb-10 font-BNazanin">{item.price}<span className="text-sm px-1 mt-1 font-light">تومان</span></p>
                    )
                }
                {item.state === "diactive" ? (
                    <div className="bg-white absolute z-10 bottom-2 rounded-xl mx-1 px-2 py-0.5 text-red-600 font-BTitr text-sm">
                        ناموجود
                    </div>
                ) : (
                    <button type="button" className="flex justify-start px-2 " >
                        <LucidePlusCircle 
                        onClick={() => dispatch(addOrders(item))}
                        className="absolute z-10 bottom-2 w-10 h-10 bg-white text-[#40191B] rounded-full"
                        />
                    </button>
                )}

            </div>
        </div>
    </div>
    )
}