import React from 'react';
import { Select, SelectChangeEvent } from '@vaadin/react-components/Select.js';
import './pagination-styles.css';

interface PageSizeSelectProps {
  pageSize: number;
  onPageChange: (newOffset: number, newPageSize: number) => void;
}

const PAGE_SIZE_OPTIONS = [10, 15, 25, 50, 100];

function handlePageSizeChange(
  e: SelectChangeEvent,
  pageSize: number,
  onPageChange: (newOffset: number, newPageSize: number) => void
) {
  const newValue = parseInt(e.target.value, 10);
  if (!isNaN(newValue) && newValue !== pageSize) {
    onPageChange(0, newValue);
  }
}

const PageSizeSelect: React.FC<PageSizeSelectProps> = ({ pageSize, onPageChange }) => (
  <>
    <span id="page-size-label" className="text-s">
      Page size
    </span>
    <Select
      theme="small"
      aria-labelledby="page-size-label"
      id="page-size-select"
      className="pagination-page-size-select"
      items={PAGE_SIZE_OPTIONS.map((it) => ({ label: it.toString(), value: it.toString() }))}
      value={pageSize.toString()}
      onChange={(e: SelectChangeEvent) => handlePageSizeChange(e, pageSize, onPageChange)}
    />
  </>
);

export default PageSizeSelect;
