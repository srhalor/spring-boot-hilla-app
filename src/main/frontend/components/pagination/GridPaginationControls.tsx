import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import PaginationArrow from './PaginationArrow';
import PageSizeSelect from './PageSizeSelect';
import type Pagination from 'Frontend/generated/com/fmd/app/dto/Pagination.js';
import type PageSortRequest from 'Frontend/generated/com/fmd/app/dto/PageSortRequest.js';
import React from 'react';

interface GridPaginationControlsProps {
  pageData: Pagination;
  onPageChange: (newOffset: number, newPageSize: number) => void;
}

const GridPaginationControls: React.FC<GridPaginationControlsProps> = ({ pageData, onPageChange }) => {
  const totalPages = pageData.totalPages;
  return (
    <HorizontalLayout style={{ alignItems: 'center', gap: '0.3rem', width: '100%' }}>
      <HorizontalLayout style={{ alignItems: 'center' }} theme="spacing-s">
        <PageSizeSelect pageSize={pageData.pageSize} onPageChange={onPageChange} />
      </HorizontalLayout>
      <PaginationArrow
        type="first"
        pageData={pageData}
        onPageChange={onPageChange}
      />
      <PaginationArrow
        type="previous"
        pageData={pageData}
        onPageChange={onPageChange}
      />
      <span className="text-s px-s" slot="end">
        Page {pageData.pageNumber} of {totalPages}
      </span>
      <PaginationArrow
        type="next"
        pageData={pageData}
        onPageChange={onPageChange}
      />
      <PaginationArrow
        type="last"
        pageData={pageData}
        onPageChange={onPageChange}
      />
    </HorizontalLayout>
  );
};

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

export const pageSortRequest: PageSortRequest ={
  offset: defaultPagination.offset,
  pageSize: defaultPagination.pageSize,
  sortBy: []
};

export default GridPaginationControls;
