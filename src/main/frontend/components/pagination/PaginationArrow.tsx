import React from 'react';
import { Button } from '@vaadin/react-components/Button.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import type Pagination from 'Frontend/generated/com/fmd/app/dto/Pagination.js';

interface PaginationArrowProps {
  type: 'first' | 'previous' | 'next' | 'last';
  pageData: Pagination;
  onPageChange: (newOffset: number, newPageSize: number) => void;
  slot?: string;
}

const typeToProps = {
  first: {
    ariaLabel: 'Go to first page',
    icon: 'vaadin:angle-double-left',
    isDisabled: (p: Pagination) => p.first,
    getTarget: (_: Pagination) => 0,
  },
  previous: {
    ariaLabel: 'Go to previous page',
    icon: 'vaadin:angle-left',
    isDisabled: (p: Pagination) => p.first,
    getTarget: (p: Pagination) => Math.max(0, p.offset - 1),
  },
  next: {
    ariaLabel: 'Go to next page',
    icon: 'vaadin:angle-right',
    isDisabled: (p: Pagination) => p.last,
    getTarget: (p: Pagination) => Math.min(p.totalPages - 1, p.offset + 1),
  },
  last: {
    ariaLabel: 'Go to last page',
    icon: 'vaadin:angle-double-right',
    isDisabled: (p: Pagination) => p.last,
    getTarget: (p: Pagination) => Math.max(0, p.totalPages - 1),
  },
};

const PaginationArrow: React.FC<PaginationArrowProps> = ({ type, pageData, onPageChange, slot = 'end' }) => {
  const { ariaLabel, icon, isDisabled, getTarget } = typeToProps[type];
  return (
    <Button
      theme="small icon"
      slot={slot}
      aria-label={ariaLabel}
      disabled={isDisabled(pageData)}
      onClick={() => onPageChange(getTarget(pageData), pageData.pageSize)}
    >
      <Icon icon={icon} />
    </Button>
  );
};

export default PaginationArrow;
