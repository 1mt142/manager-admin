import React from "react";
import PropTypes from "prop-types";

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
  showPrevNext,
  showFirstLast,
}) => {
  const pageNumbers = [];
  const maxVisibleButtons = 10;

  let startPage = Math.max(currentPage - Math.floor(maxVisibleButtons / 2), 1);
  let endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages);

  if (endPage === totalPages) {
    startPage = Math.max(endPage - maxVisibleButtons + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (page) => {
    if (page === currentPage) return;
    onPageChange(page);
  };

  return (
    <nav>
      <ul className="pagination">
        {showPrevNext && currentPage > 1 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageClick(currentPage - 1)}
            >
              PRV
            </button>
          </li>
        )}

        {showFirstLast && currentPage > 2 && (
          <li className="page-item">
            <button className="page-link" onClick={() => handlePageClick(1)}>
              FST
            </button>
          </li>
        )}

        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`page-item${currentPage === page ? " active" : ""}`}
          >
            <button className="page-link" onClick={() => handlePageClick(page)}>
              {page}
            </button>
          </li>
        ))}

        {showFirstLast && currentPage < totalPages - 1 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageClick(totalPages)}
            >
              LST
            </button>
          </li>
        )}

        {showPrevNext && currentPage < totalPages && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageClick(currentPage + 1)}
            >
              NXT
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

PaginationComponent.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  showPrevNext: PropTypes.bool,
  showFirstLast: PropTypes.bool,
};

PaginationComponent.defaultProps = {
  showPrevNext: true,
  showFirstLast: true,
};

export default PaginationComponent;
