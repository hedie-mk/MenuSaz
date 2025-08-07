import { useTimeAgo } from "../../../hooks/useTimeAgo"

type InactiveItemProps = {
  id:  string;
  name: string;
  diactiveDateTime: Date; // یا Date اگر تایپ datetime هست
};

export default function InactiveItem({id, name , diactiveDateTime} : InactiveItemProps){
    const timeAgo = useTimeAgo(diactiveDateTime); 


    return(
        <li key={id} className="flex justify-between px-5 py-1">
            <span className="text-[#5F5F61]">{name}</span>
            <span className="text-red-500 pr-30">{timeAgo}</span>
            
        </li>
    )
}