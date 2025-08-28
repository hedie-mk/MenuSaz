import ProductCard from "../../components/menu/productCard";
import ProductCardModal from "../../components/menu/productCardModal";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/app";
import type { GetMenuProducts } from "../../features/Menu/MenuTypes";
import { useState } from "react";

type SearchResultProps = {
    search : string
}

export default function SearchResult({search}:SearchResultProps){
    const [isOpen , setIsOpen] = useState(false)
    const [selectedItem , setSelectedItem] = useState<GetMenuProducts | null>(null)
    const onClose = () => {
        setIsOpen(false);
        setSelectedItem(null);
    }
    const { products , liked } = useSelector((state : RootState) => state.menu)
    
    return(
        <div className="space-y-3 p-4 overflow-hidden mt-10">
            <div className="z-1 overflow-hidden">
                <div className=" z-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 space-x-3 space-y-3">
                    {products.filter(p => p.name.includes(search)).map((item, index) => {
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