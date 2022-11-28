import { RootState } from '../store';
export const selectPaginationCurrentPage = (state: RootState) => state.pagination.currentPage;
