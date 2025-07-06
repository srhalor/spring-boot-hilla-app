import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import PaginationArrow from './PaginationArrow';
import PageSizeSelect from './PageSizeSelect';
import type Pagination from 'Frontend/generated/com/fmd/app/dto/Pagination.js';
import type PageSortRequest from 'Frontend/generated/com/fmd/app/dto/PageSortRequest.js';
import './pagination-styles.css';

interface GridPaginationControlsProps {
  pageData: Pagination;
  onPageChange: (newOffset: number, newPageSize: number) => void;
}

const PAGINATION_DIRECTIONS = ['first', 'previous', 'next', 'last'];

const GridPaginationControls: React.FC<GridPaginationControlsProps> = ({ pageData, onPageChange }) => (
  <HorizontalLayout className="pagination-controls" style={{ alignItems: 'center', gap: '0.3rem', width: '100%' }}>
    <HorizontalLayout style={{ alignItems: 'center' }} theme="spacing-s">
      <PageSizeSelect pageSize={pageData.pageSize} onPageChange={onPageChange} />
    </HorizontalLayout>
    {PAGINATION_DIRECTIONS.map((type) => (
      <PaginationArrow
        key={type}
        type={type as 'first' | 'previous' | 'next' | 'last'}
        pageData={pageData}
        onPageChange={onPageChange}
      />
    ))}
    <span className="text-s px-s" slot="end">
      Page {pageData.pageNumber} of {pageData.totalPages}
    </span>
  </HorizontalLayout>
);

export const defaultPagination: Pagination = {
  empty: true,
  first: true,
  last: true,
  numberOfElements: 0,
  totalElements: 0,
  offset: 0,
  pageNumber: 1,
  totalPages: 1,
  pageSize: 10
};

export const pageSortRequest: PageSortRequest = {
  offset: defaultPagination.offset,
  pageSize: defaultPagination.pageSize,
  sortBy: []
};

export default GridPaginationControls;
