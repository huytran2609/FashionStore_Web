import classNames from 'classnames';
import { useSearchParams, useNavigate, createSearchParams, useLocation } from 'react-router-dom';

function PaginatedItem({ children }) {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const pathname = useLocation().pathname;

    const handlePagination = () => {
        const queries = Object.fromEntries([...params]);
        if (Number(children)) queries.page = children;
        navigate({
            pathname: pathname,
            search: createSearchParams(queries).toString(),
        });
    };

    return (
        <button
            onClick={handlePagination}
            disabled={!Number(children)}
            className= {
                classNames(
                    +params.get('page') === +children && 'bg-neutral-300'
                    ,"relative block rounded  px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-200 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"                
                )
            }
        >
            {children}
        </button>
    );
}

export default PaginatedItem;
