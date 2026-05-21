import React from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { setCurrentPage } from '@/store/slices/wordSlices';
import { useAppDispatch } from '@/store/hooks';


interface PaginationCustomProps {
    totalPages: number;
    currentPage: number;
    totalItems: number;
    search: string;
}
const PaginationCustom = ({ totalPages, currentPage, totalItems, search }: PaginationCustomProps) => {

    const dispatch = useAppDispatch();
    const handleClick = (page: number) => {
        if (page < 1 || page > totalPages) return;
        dispatch(setCurrentPage(page));

    }
    return (
        <Pagination className=' flex justify-end items-end mt-10 w-full ml-auto'>
            {totalItems > 0 && search === '' && (
                <PaginationContent>
                    <PaginationItem className={currentPage === 1 ? 'hidden' : ''}>
                        <PaginationPrevious className='hover:bg-accent hover:text-card' onClick={() => handleClick(currentPage - 1)} />
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink className='hover:bg-accent hover:text-card' onClick={() => handleClick(index + 1)} isActive={index + 1 === currentPage}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem className={`${currentPage === totalPages ? 'hidden' : ''} `}>
                        <PaginationNext className='hover:bg-accent hover:text-card' onClick={() => handleClick(currentPage + 1)} />
                    </PaginationItem>
                </PaginationContent>
            )}
        </Pagination>
    )
}

export default PaginationCustom