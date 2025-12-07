import { useMemo } from 'react';
import { BiDotsHorizontalRounded } from "react-icons/bi";

function usePagination(totalCount, pageSize, currentPage, siblingCount = 1) {
    const paginationArray = useMemo(() => {
        const totalPagination = Math.ceil(totalCount / pageSize);
        const totalPaginationItem = siblingCount + 5;

        if(totalPagination <= totalPaginationItem){
            return generateRange(1, totalPagination);
        }

        const isShowLeftWithDots = currentPage - siblingCount >  2;
        const isShowRightWithDots = currentPage + siblingCount < totalPagination - 1;

        if(isShowLeftWithDots && !isShowRightWithDots){
            const rightStart = totalPagination - 4;
            const rightRange = generateRange(rightStart, totalPagination);
            return [
                1,
                <BiDotsHorizontalRounded className='pt-2 text-[1.25rem]'/>,
                ...rightRange
            ];
        }
        if(!isShowLeftWithDots && isShowRightWithDots){
            const leftRange = generateRange(1, Math.min(5, totalPagination));
            return [
                ...leftRange,
                <BiDotsHorizontalRounded className='pt-2 text-[1.25rem]'/>,
                totalPagination
            ];
        }
        const siblingLeft = Math.max(currentPage - siblingCount, 1);
        const siblingRight = Math.min(currentPage + siblingCount, totalPagination);
        if(isShowLeftWithDots && isShowRightWithDots){
            const middleRange = generateRange(siblingLeft, siblingRight);
            return [
                1,
                <BiDotsHorizontalRounded className='pt-2 text-[1.25rem]' />,
                ...middleRange,
                <BiDotsHorizontalRounded className='pt-2 text-[1.25rem]' />,
                totalPagination
            ];
        }
        return generateRange(1, totalPagination);


    }, [totalCount, pageSize, currentPage, siblingCount]);

    return paginationArray;
}

export default usePagination;

function generateRange(start, end) {
    const length = end - start + 1;

    return Array.from({ length }, (_, index) => index + start);
}
