import { useSelector } from "react-redux";
import type { RootState } from "../../app/app";
import { useState ,useEffect} from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "../../components/menu/productCard";
import ProductCardModal from "../../components/menu/productCardModal";
import type { GetMenuProducts } from "../../features/Menu/MenuTypes"
import { useNavigate } from "react-router-dom";
type MainPageProps = {
    mainCategory : string
}

export default function MainPage({mainCategory}: MainPageProps){
    const navigate = useNavigate();

    const {categories , products , liked } = useSelector((state : RootState) => state.menu)
    const [isOpen , setIsOpen] = useState(false)
    const [selectedItem , setSelectedItem] = useState<GetMenuProducts | null>(null)
    const [isLoading , setIsLoading]=useState(false)

    const [filteredCategories, setFilteredCategories] = useState<{id: string; name: string}[]>([]);
    useEffect(() => {
        setIsLoading(true)
        if(categories){
            const filtered = categories.filter((c) => c.parentCategoryName === mainCategory).filter(c => c.state === "active").map((c) => ({id: c.id , name : c.name}));
            setFilteredCategories(filtered);
        } 
        setIsLoading(false)
    },[mainCategory , categories])
    const onClose = () => {
        setIsOpen(false);
        setSelectedItem(null);
    }

    return(
        <>
            <div className="space-y-3 p-4 overflow-hidden mt-">
                {isLoading ?? (
                    <>
                        <h3>در حال بارگذاری</h3>
                    </>
                )}
                {filteredCategories.map((cat) => (
                    <div key={cat.id}>
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-white mb-3 font-BTitr">{cat.name}</h2>
                            <a className="font-BNazanin text-white hover:cursor-pointer transition-all duration-300 ease-in-out hover:scale-120" onClick={()=> navigate(`/menu/${cat.name}`)}>همه</a>
                        </div>
                        <Swiper 
                        spaceBetween={10} 
                        slidesPerView={2} 
                        effect={`fade`}
                        breakpoints={{
                            640: {
                            slidesPerView: 4,
                            },
                            1024: {
                            slidesPerView: 6,
                            },
                            1440: { 
                            slidesPerView: 8,
                            },
                        }}
                        >
                            
                            {products?.filter((p) => p.categoryId === cat.id).map((item) => {
                                const isLiked = liked.some((p) => p.id === item.id);
                                return( 
                                    <SwiperSlide key={item.id} >
                                            <ProductCard 
                                            setIsOpen={setIsOpen} 
                                            setSelectedItem={setSelectedItem} 
                                            item={item} 
                                            isLiked={isLiked}/>     
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                ))}
                <ProductCardModal isOpen={isOpen} onClose={onClose} item={selectedItem} liked={liked}/>

            </div>
        </>

    )
}