import React from "react";

function Pagination({ currentPage, setCurrentPage, totalPage }) {
  let pages = Array.from({ length: totalPage }, (x, i) => i + 1);

  
  return (
    <div className="paginationParent">
      {pages.map((number) => (
        <div className={number === currentPage ? "paginationStyle": "pagination"} onClick={() => setCurrentPage(number)}>
          {number}
        </div>
      ))}
    </div>
  );
}

export default Pagination;
