import PropTypes from "prop-types";
import styles from "./Pagination.module.css";

function Pagination({ onPageChange, currentPage, todoList, itemsPerPage }) {

  const totalItems = todoList.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div>
      {(currentPage > 1) && (
        <button className={styles.previousButton} onClick={handlePreviousClick}>
          Previous
        </button>
      )}

      {(currentPage > 1) && (currentPage < totalPages) && (
        <span className={styles.pageTitle} disabled={currentPage === 1}>
          Page {currentPage} of {totalPages}
        </span>
      )}

      {(currentPage < totalPages) && (
        <button className={styles.nextButton} onClick={handleNextClick}>
          Next
        </button>
      )}
    </div>
  );
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    onPageChange: PropTypes.func,
}

export default Pagination;
