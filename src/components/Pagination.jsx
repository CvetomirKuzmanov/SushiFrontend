import React from 'react';
import ReactPaginate from 'react-paginate';

export default function Pagination({ pageCount, onPageChange, pageRangeDisplayed = 3, marginPagesDisplayed = 1 }) {
  if (pageCount <= 1) return null;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="→"
      previousLabel="←"
      onPageChange={onPageChange}
      pageRangeDisplayed={pageRangeDisplayed}
      marginPagesDisplayed={marginPagesDisplayed}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      containerClassName="flex justify-center items-center mt-8 gap-2"
      pageLinkClassName="flex items-center justify-center min-w-[2rem] h-[2rem] px-2 rounded text-sm text-gray-800 hover:bg-gray-100"
      previousLinkClassName="flex items-center justify-center min-w-[2rem] h-[2rem] px-2 rounded text-sm text-gray-800 hover:bg-gray-100"
      nextLinkClassName="flex items-center justify-center min-w-[2rem] h-[2rem] px-2 rounded text-sm text-gray-800 hover:bg-gray-100"
      activeLinkClassName="bg-gray-900 text-white"
      breakClassName="mx-1"
    />
  );
}