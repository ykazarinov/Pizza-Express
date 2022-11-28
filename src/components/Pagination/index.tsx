import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { selectPaginationCurrentPage } from '../../redux/pagination/selectors';

type PaginationProps = {
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
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
      // renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
