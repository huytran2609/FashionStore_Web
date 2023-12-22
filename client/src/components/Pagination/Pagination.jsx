import usePagination from '~/hooks/usePagination';
import PaginatedItem  from './PaginatedItem';

function Pagination({ totalCount }) {
    const pagination = usePagination(totalCount, 1);

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
