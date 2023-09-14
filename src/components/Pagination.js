import React from 'react';

function Pagination({ itemsPerPage, totalItems, currentPage, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < Math.ceil(totalItems / itemsPerPage);

  return (
    <nav>
      <ul className='pagination'>
      {canGoPrevious && (
          <li onClick={() => onPageChange(currentPage - 1)}>
            <button className='page-link'>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
          >
            <button
              onClick={() => onPageChange(number)}
              className='page-link'
            >
              {number}
            </button>
          </li>
        ))}
        {canGoNext && (
          <li onClick={() => onPageChange(currentPage + 1)}>
            <button className='page-link'>
              <i className="fa-solid fa-chevron-right fa-sm"></i>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
