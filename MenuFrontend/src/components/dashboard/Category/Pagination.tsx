

type PaginationProps = {
    currentPage : number;
    totalPages : number;
    onChangefunc : (value : number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onChangefunc
}: PaginationProps){

    
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
        if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, 5, "...", totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
        }
        }
        return pages;
    };

    return(
        <div className="flex justify-center mt-2">
          <div className="flex gap-2 bg-[#D8D4FF] rounded-full px-4 py-1">
            {getPageNumbers().map((num , idx) => (
              <button
                key={idx}
                onClick={() => typeof num === "number" && onChangefunc(num)}
                className={`w-7 h-7 rounded-full text-sm font-medium flex items-center justify-center transition ${
                  currentPage === num
                    ? "bg-[#0C1086] text-white"
                    : "text-[#0C1086] hover:cursor-pointer"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
    )
}