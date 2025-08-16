import { useSelector } from "react-redux"
import type { RootState } from "../../app/app"
import { Instagram} from "lucide-react"; 

export default function InformationPage(){
    const {menuInformation} = useSelector((state : RootState) => state.menu)
    return(
        <div className="space-y-5 p-4 overflow-hidden mt-10">
            <div className="flex flex-col justify-center items-center text-white text-2xl font-bold font-BTitr">
                <h1>به کافه {menuInformation.name} </h1>
                <h1>خوش اومدی</h1>
            </div>
            <div className="flex justify-center items-center">
                {menuInformation.logo ? (
                    <img className="w-60 h-40 object-cover rounded-lg" src={menuInformation.logo}></img>
                ) : null}
            </div>
            <div className="flex justify-center items-center text-white text-lg font-bold font-BNazanin">
                {menuInformation.siteDescription ? (
                    <h2>{menuInformation.siteDescription}</h2>
                ) : null}
            </div>
            <div className="flex justify-center items-center text-white text-lg font-medium font-BNazanin">
                {menuInformation.workHour ? (
                    <h2>ساعت کاری : {menuInformation.workHour}</h2>
                ) : null}
            </div>
            <div className="flex justify-center items-center text-white text-lg font-medium font-BNazanin">
                {menuInformation.phoneNumber ? (
                    <h2>شماره تماس : {menuInformation.phoneNumber}</h2>
                ) : null}
            </div>
            <div className="flex justify-center items-center text-white text-lg font-medium font-BNazanin">
                {menuInformation.address ? (
                    <h2>آدرس : {menuInformation.address}</h2>
                ) : null}
            </div>
            <div className="flex justify-end items-center text-white text-lg font-medium px-8">
                <a href={menuInformation.socialMedia ?? undefined}><Instagram className="rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl hover:cursor-pointer duration-300 ease-in-out hover:scale-120"/></a>
            </div>
        </div>
    )
}