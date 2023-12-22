import { useEffect } from 'react';
import { useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';

function PaginatedItem({ children }) {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    // useEffect(() => {
    //     let param = []
    //     for(let p of params.entries()) param.push(p)

    //     console.log(param);
    // }, [params])

    const handlePagination = () => {
        param = []
        for(let p of params.entries()) param.push(p)
        const queries = {};
        if (Number(children)) queries.page = children;
        navigate({
            pathname: '/manage-user',
            search: createSearchParams(params).toString(),
        });
    };

    return (
        <button
            onClick={handlePagination}
            disabled={!Number(children)}
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
        >
            {children}
        </button>
    );
}

export default PaginatedItem;
