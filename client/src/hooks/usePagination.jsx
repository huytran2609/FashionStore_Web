import { useMemo } from 'react';
import { BiDotsHorizontalRounded } from "react-icons/bi";

function usePagination(totalCount, currentPage, siblingCount = 1) {
    const paginationArray = useMemo(() => {
        const pageSize = 10;
        const totalPagination = Math.ceil(totalCount / pageSize);
        const totalPaginationItem = siblingCount + 5;

        if(totalPagination <= totalPaginationItem){
            return generateRange(1, totalPagination);
        }

        const isShowLeftWithDots = currentPage > siblingCount + 2;
        const isShowRightWithDots = currentPage < totalPagination - siblingCount - 1;

        if(isShowLeftWithDots && !isShowRightWithDots){
            const leftOffset = totalPaginationItem - 3;
            return [
                1,
                <BiDotsHorizontalRounded className='pt-2 text-[20px]'/>,
                ...generateRange(totalPagination - leftOffset + 1, totalPagination)
            ];
        }
        if(!isShowLeftWithDots && isShowRightWithDots){
            const rightOffset = totalPaginationItem - 3;
            return [
                ...generateRange(1, rightOffset),
                <BiDotsHorizontalRounded className='pt-2 text-[20px]'/>,
                totalPagination
            ];
        }
        const siblingLeft = Math.max(currentPage - siblingCount, 1);
        const siblingRight = Math.min(currentPage + siblingCount, totalPagination);
        if(isShowLeftWithDots && isShowRightWithDots){
            return [
                1,
                <BiDotsHorizontalRounded />,
                ...generateRange(siblingLeft, siblingRight),
                <BiDotsHorizontalRounded />,
                totalPagination
            ];
        }


    }, [totalCount, currentPage, siblingCount]);

    return paginationArray;
}

export default usePagination;

function generateRange(start, end) {
    const length = end - start + 1;

    return Array.from({ length }, (_, index) => index + start);
}
