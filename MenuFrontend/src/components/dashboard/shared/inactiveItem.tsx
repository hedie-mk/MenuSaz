import { useTimeAgo } from "../../../hooks/useTimeAgo"

type InactiveItemProps = {
  id:  string;
  name: string;
  diactiveDateTime: Date; 
};

export default function InactiveItem({id, name , diactiveDateTime} : InactiveItemProps){
    console.log(diactiveDateTime)
    const timeAgo = useTimeAgo(diactiveDateTime); 


    return(
        <li key={id} className="flex justify-between px-5 py-1 font-BNazanin">
            <span className="text-[#5F5F61] text-lg flex-1">{name}</span>
            <span className="text-red-500 pr-25 flex-1.5 text-sm">{timeAgo}</span>
        </li>
    )
}