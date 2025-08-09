import MenuInfoBox from "../../../components/dashboard/MenuInfo/menuInfoBox"
export default function MenuInfo() {
    return(
        <div className="w-[1000px] p-5.5">
            <div className="relative flex flex-wrap px-5 py-5 justify-center items-center">
                <div className="absolute inset-0 bg-white/30 z-0 shadow-xl rounded-2xl py-4 px-6"></div>
                <div className="relative z-10 flex flex-col gap-4 justify-center items-center ">
                    <MenuInfoBox />
                </div>
            </div>
        </div>
    )
}