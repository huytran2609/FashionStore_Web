import { useSearchParams } from "react-router-dom";

function PaginatedItem({children}) {

    const params = useSearchParams();
    

    return ( 
        <div className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white">
            {children}
        </div>
     );
}

export default PaginatedItem;