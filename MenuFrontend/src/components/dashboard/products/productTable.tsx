
import { useNavigate } from "react-router-dom"
import type { GetProduct } from "../../../features/Products/productTable/productType";
type TableProps = {
    isLoading : boolean,
    filteredItem : any,
    tHead : string[]
}


export default function ProductTable({isLoading , filteredItem , tHead} : TableProps){
    const navigate = useNavigate();
    return(
        <div className="overflow-auto rounded-xl shadow-md">
        <table className="w-full text-sm text-right bg-white">
          <thead className="bg-purple-100 text-purple-800">
            <tr className="text-sm">
                {tHead.map((t) => (
                    <th className="px-4 py-3">{t}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-6">
                  در حال بارگذاری...
                </td>
              </tr>
            ) : (
              filteredItem?.map((item : GetProduct) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2 text-gray-700">
                    <img className="w-[15px] h-[15px]" src={item.photo ?? undefined}></img>
                  </td>
                  <td className="px-4 py-2 font-medium text-[#222]">{item.name}</td>
                  <td className="px-4 py-2 text-gray-600 truncate max-w-[250px]">{item.description}</td>
                  <td className="px-4 py-2 text-[#444]">{item.price}</td>
                  <td className="px-4 py-2 text-[#444]">{item.categoryName}</td>
                  
                  <td className="px-4 py-2 flex gap-2 items-center">
                    <button onClick={() => navigate(`/product/${item.id}`)} className="bg-blue-800 hover:bg-blue-900 text-white p-1 rounded-full">
                      +
                    </button>
                    <button onClick={() => navigate(`/edit-product/${item.id}`)} className="bg-yellow-400 hover:bg-yellow-500 text-white p-1 rounded-full">
                      ✎
                    </button>
                    <button onClick={() => navigate(`/delete-product/${item.id}`)} className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-full">
                      🗑️
                    </button>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={item.state === 'active'} readOnly />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-green-400"></div>
                    </label>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    )
}