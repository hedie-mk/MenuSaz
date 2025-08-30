import MenuInfoBox from "../../../components/dashboard/MenuInfo/menuInfoBox"
export default function MenuInfo() {
    return(
        <div className="flex flex-col w-full justify-center items-center">
            <div className="w-1/2 px-4 py-3 sm:hidden mt-5 flex justify-center rounded-full bg-[#0C1086] text-white shadow-md text-sm font-bold">
                تنظیمات منو
            </div>
            <div className="max-w-[1000px] w-full p-5 sm:p-6">
                <div className="relative flex flex-wrap px-5 py-5 justify-center items-center">
                    <div className="absolute inset-0 bg-white/30 z-0 shadow-xl rounded-2xl py-4 px-6"></div>
                    <div className="relative w-full z-10 flex flex-col gap-4 justify-center items-center ">
                        <MenuInfoBox />
                    </div>
                </div>
            </div>        
        </div>

    )
}