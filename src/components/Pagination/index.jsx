import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { selectPaginationCurrentPage } from '../../redux/slices/paginationSlice';

export const Pagination = ({ onChangePage }) => {
  const currentPage = useSelector(selectPaginationCurrentPage);
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
