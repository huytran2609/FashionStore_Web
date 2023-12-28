import usePagination from '~/hooks/usePagination';
import PaginatedItem  from './PaginatedItem';
import { useSearchParams } from 'react-router-dom';

function Pagination({ totalCount, pageSize = 10 }) {

    const [params] = useSearchParams();
    const pagination = usePagination(totalCount,pageSize, +params.get('page'), 2);

    return (
        <div className='flex items-center justify-center font-semibold'>
            {pagination?.map(el => (
                <PaginatedItem key={el}>
                    {el}
                </PaginatedItem>
            ))}
        </div>
    );
}

export default Pagination;
