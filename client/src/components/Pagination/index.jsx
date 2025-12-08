import usePagination from '~/hooks/usePagination';
import PaginatedItem from './PaginatedItem';
import { useSearchParams } from 'react-router-dom';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import classNames from 'classnames';

function Pagination({ totalCount, pageSize = 10 }) {
    const [params, setParams] = useSearchParams();
    const pagination = usePagination(totalCount, pageSize, +params.get('page'), 2);
    const handleClickPrev = () => {
        setParams({ page: (+params.get('page') - 1).toString() });
    };

    const handleClickNext = () => {
        setParams({ page: (+params.get('page') + 1).toString() });
    }

    return (
        <div className="flex items-center justify-center font-semibold">
            <button
                className={classNames(
                    'flex cursor-pointer justify-center items-center rounded-md font-bold text-sm bg-neutral-50 hover:bg-neutral-200 disabled:bg-transparent min-w-[2.5rem] h-10',
                    {
                        'opacity-25': +params.get('page') - 1 < 1,
                    },
                )}
                onClick={handleClickPrev}
                disabled={+params.get('page') - 1 < 1}
            >
                <MdOutlineNavigateBefore size={20} />
            </button>

            {pagination?.map((el) => (
                <PaginatedItem key={el}>{el}</PaginatedItem>
            ))}

            <button
                className={classNames(
                    'flex cursor-pointer justify-center items-center rounded-md font-bold text-sm bg-neutral-50 hover:bg-neutral-200 disabled:bg-transparent min-w-[2.5rem] h-10',
                    {
                        'opacity-25': +params.get('page') + 1 > Math.ceil(totalCount/pageSize),
                    },
                )}
                onClick={handleClickNext}
                disabled={+params.get('page') + 1 > Math.ceil(totalCount/pageSize)}
            >
                <MdOutlineNavigateNext size={20} />
            </button>
        </div>
    );
}

export { Pagination };
export default Pagination;
