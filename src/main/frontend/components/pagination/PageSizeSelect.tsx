import { Select } from '@vaadin/react-components/Select.js';
import React from 'react';

interface PageSizeSelectProps {
  pageSize: number;
  onPageChange: (newOffset: number, newPageSize: number) => void;
}

const PAGE_SIZE_OPTIONS = ['10', '15', '25', '50', '100'];

const PageSizeSelect: React.FC<PageSizeSelectProps> = ({ pageSize, onPageChange }) => (
  <>
    <span id="page-size-label" className="text-s">
      Page size
    </span>
    <Select
      theme="small"
      aria-labelledby="page-size-label"
      style={{
        width: '4.8rem',
        '--vaadin-input-field-value-font-size': 'var(--lumo-font-size-s)',
      }}
      items={PAGE_SIZE_OPTIONS.map((it) => ({ label: it, value: it }))}
      value={pageSize.toString()}
      onChange={(e: Event & { target: any }) => {
        const newValue = parseInt(e.target.value);
        if (!isNaN(newValue) && newValue !== pageSize) {
            // Reset to first page when page size changes
          onPageChange(0, newValue);
        }
      }}
    />
  </>
);

export default PageSizeSelect;

