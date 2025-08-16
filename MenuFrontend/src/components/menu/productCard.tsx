import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/app";
import { addOrders , addLikedProducts , removeLikedProducts } from "../../features/Menu/MenuSlice";
import type { GetMenuProducts } from "../../features/Menu/MenuTypes"
import { LucidePlusCircle , Heart ,BadgePercent} from "lucide-react"; 
type ProductCardProps = {
    setIsOpen : (value : boolean) => void ,
    setSelectedItem : (value : GetMenuProducts) => void ,
    item : GetMenuProducts,
    isLiked : boolean
}
export default function ProductCard({setIsOpen,setSelectedItem, item , isLiked} :ProductCardProps){

    const dispatch = useDispatch<AppDispatch>();
    if(!item) return null
    return(
        <div className="releative bg-[#40191B] text-white h-auto rounded-xl overflow-hidden pb-4" >
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
                <Heart 
                className={`absolute z-10 mt-1 transition-all duration-300 ease-in-out 
                ${isLiked ? " text-red-600 fill-red-600 scale-120 " : "scale-100"}`
                }
                />
            </div>
            {item.discountedPrice ? (
                <div className="flex justify-start px-2">
                    <BadgePercent className="absolute z-10 mt-1 text-red-600"/>
                </div>
            ) : null}

            <img
                src={item.photo ?? undefined}
                className="w-full h-40 object-cover rounded-b-full "
                onClick={() => {
                    setSelectedItem(item)
                    setIsOpen(true)
                }}
            />
            <p className="flex text-sm font-bold mt-1 items-center justify-center font-BTitr">{item.name}</p>
            {
                item.discountedPrice 
                ? (
                <div className="relative">
                    <p className="flex justify-end text-sm mt-2 font-BNazanin">{item.discountedPrice}<span className="text-xs px-0.5 font-extralight">تومان</span></p>
                    <p className="absolute bottom--1 left-0 flex justify-end px-7 py-0 text-[#8A8A8A] font-light text-xs line-through font-BNazanin" >{item.price}</p>
                </div>
                
                )
                : (
                    <p className="flex justify-end text-sm mt-2 font-BNazanin">{item.price}<span className="text-xs px-0.5 font-extralight">تومان</span></p>
                )
            }
            {item.state === "diactive" ? (
                <div className="bg-white absolute z-10 bottom-2 rounded-xl mx-1 px-2 py-0.5 text-red-600 font-BTitr text-sm">
                    ناموجود
                </div>
            ) : (
                <button type="button" 
                className="relative flex justify-start px-2 " >
                    <LucidePlusCircle 
                    onClick={() => dispatch(addOrders(item))}
                    className="absolute z-10 bottom-0 bg-white text-[#40191B] rounded-full transition-all duration-300 ease-in-out hover:scale-120 focus:outline-2 focus:outline-offset-2 focus:outline-green-700 active:bg-green-700"
                    />
                </button>
            )}

        </div>
    )
}