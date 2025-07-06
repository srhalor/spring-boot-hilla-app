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
    disabled: (pageData: Pagination) => pageData.first,
    getTargetPage: (_: Pagination) => 0,
  },
  previous: {
    ariaLabel: 'Go to previous page',
    icon: 'vaadin:angle-left',
    disabled: (pageData: Pagination) => pageData.first,
    getTargetPage: (pageData: Pagination) => Math.max(0, pageData.offset - 1),
  },
  next: {
    ariaLabel: 'Go to next page',
    icon: 'vaadin:angle-right',
    disabled: (pageData: Pagination) => pageData.last,
    getTargetPage: (pageData: Pagination) => Math.min(pageData.totalPages - 1, pageData.offset + 1),
  },
  last: {
    ariaLabel: 'Go to last page',
    icon: 'vaadin:angle-double-right',
    disabled: (pageData: Pagination) => pageData.last,
    getTargetPage: (pageData: Pagination) => Math.max(0, pageData.totalPages - 1),
  },
};

const PaginationArrow: React.FC<PaginationArrowProps> = ({
  type,
  pageData,
  onPageChange,
  slot = 'end',
}) => {
  const { ariaLabel, icon, disabled, getTargetPage } = typeToProps[type];
  return (
    <Button
      theme="small icon"
      slot={slot}
      aria-label={ariaLabel}
      disabled={disabled(pageData)}
      onClick={() => onPageChange(getTargetPage(pageData), pageData.pageSize)}
    >
      <Icon icon={icon}></Icon>
    </Button>
  );
};

export default PaginationArrow;
