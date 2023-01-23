import "./Paginado.css";

import React from "react";

export default function Paginado({
  breedsPerPage,
  allBreeds,
  setCurrentPage,
  currentPage,
}) {
  const maxPages = Math.ceil(allBreeds / breedsPerPage);
  let style = "small-btn";
  let styleAct = "small-btn-active";

  const handlePrev = () => {
    if (currentPage > 5) {
      setCurrentPage(currentPage - 5);
    } else {
      setCurrentPage(1);
    }
  };

  const handleNext = () => {
    if (currentPage < maxPages - 5) {
      setCurrentPage(currentPage + 5);
    } else {
      setCurrentPage(maxPages);
    }
  };

  const pageNumbers = [];
  if (currentPage === 1) {
    for (let i = currentPage; i < currentPage + 5; i++) {
      if (i <= maxPages) {
        pageNumbers.push(i);
      }
    }
  } else if (currentPage === maxPages) {
    for (let i = currentPage - 4; i <= currentPage; i++) {
      pageNumbers.push(i);
    }
  } else {
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 0 && i <= maxPages) {
        pageNumbers.push(i);
      }
    }
  }

  return (
    <div>
      <button
        className={style}
        onClick={() => handlePrev()}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pageNumbers.map((p) => (
        <button
          key={p}
          onClick={() => setCurrentPage(p)}
          className={p === currentPage ? `${styleAct} ${style}` : style}
        >
          {p}
        </button>
      ))}
      <button
        className={style}
        onClick={() => handleNext()}
        disabled={currentPage === maxPages}
      >
        Next
      </button>
    </div>
  );
}
