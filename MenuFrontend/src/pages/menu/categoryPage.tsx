import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import type { RootState } from "../../app/app";
import type { GetMenuProducts } from "../../features/Menu/MenuTypes";
import {  useMemo, useState } from "react";
import ProductCard from "../../components/menu/productCard";
import ProductCardModal from "../../components/menu/productCardModal";


export default function CategoryPage(){
    const [isOpen , setIsOpen] = useState(false)
    const [selectedItem , setSelectedItem] = useState<GetMenuProducts | null>(null)
    const onClose = () => {
        setIsOpen(false);
        setSelectedItem(null);
    }

    const { categoryName } = useParams();
    const decodedCategoryName = decodeURIComponent(categoryName || "");

    const { products , liked } = useSelector((state : RootState) => state.menu)
    let filterdProducts : GetMenuProducts[] = useMemo(()=>{
        return products.filter(p => p.categoryName === decodedCategoryName);
    },[decodedCategoryName, products])


    return(
        <div className="space-y-3 px-4 overflow-hidden ">
            <div className="flex flex-col justify-centr items-center">
                <div className="w-1/2 px-4 py-3 mt-1س flex justify-center bg-[#40191B] rounded-2xl font-BTitr text-lg shadow-xl/30 text-white">{categoryName}</div>
            </div>
            <div className=" z-1 overflow-hidden">
                <div className=" z-1 grid grid-cols-2 space-x-3 space-y-3">
                    {filterdProducts.map((item, index) => {
                        const isLiked = liked.some((p) => p.id === item.id);
                        return(
                            <div key={index} className="relative w-full px-1">
                                <ProductCard
                                setIsOpen={setIsOpen} 
                                setSelectedItem={setSelectedItem} 
                                item={item} 
                                isLiked={isLiked}/>
                            </div>

                        );
                    })}
                </div>
                
            </div>
            <ProductCardModal isOpen={isOpen} onClose={onClose} item={selectedItem} liked={liked}/>
        </div>
    )
}