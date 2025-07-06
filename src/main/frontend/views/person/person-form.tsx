import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useEffect, useState } from 'react';
import { getPersons } from 'Frontend/generated/PersonEndpoint';
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridSortColumn } from '@vaadin/react-components/GridSortColumn.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import type Pagination from 'Frontend/generated/com/fmd/app/dto/Pagination.js';
import type PageSortRequest from 'Frontend/generated/com/fmd/app/dto/PageSortRequest.js';
import GridPaginationControls, { defaultPagination, pageSortRequest } from 'Frontend/components/pagination/GridPaginationControls';
import type PersonDTO from 'Frontend/generated/com/fmd/app/dto/PersonDTO.js';
import { AddFilterDialog, FilterRow } from 'Frontend/components/pagination/AddFilterDialog';

// Define the type for a single sort
interface SortRequest {
  sortBy: string;
  direction: 'ASC' | 'DESC';
}

export const config: ViewConfig = {
  menu: { order: 1, icon: 'line-awesome/svg/user.svg' },
  title: 'Person Form',
  loginRequired: true,
};

export const defaultFilter: PersonDTO = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: ''
};

export default function PersonFormView() {
  const [persons, setPersons] = useState<PersonDTO[]>([]);
  const [pageData, setPageData] = useState<Pagination>(defaultPagination);
  const [sortRequest, setSortRequest] = useState<PageSortRequest>(pageSortRequest);
  const selectedItems = useSignal<PersonDTO[]>([]);
  // Change filter state to array of FilterRow
  const [filter, setFilter] = useState<FilterRow[]>([]);
  const [filterRows, setFilterRows] = useState<FilterRow[]>([
    { id: crypto.randomUUID(), column: '', operator: 'contains', value: '' }
  ]);

  const columns = [
    { label: 'First Name', value: 'firstName' },
    { label: 'Last Name', value: 'lastName' },
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
    { label: 'Address', value: 'address' },
  ];

  const handleApplyFilterDialog = (rows: FilterRow[]) => {
    setFilter(rows);
    setFilterRows(rows);
  };
  const handlePageChanged = (newOffset: number, newPageSize: number) => {
    setSortRequest((prev) => ({ ...prev, offset: newOffset, pageSize: newPageSize }));
  };

  // Multi-sort handler
  const handleSort = (e: CustomEvent) => {
    const direction = e.detail.value;
    // @ts-ignore: Vaadin types do not include path, but it exists on the element
    const path = (e.target as any).path;
    setSortRequest((prev) => {
      let newSortBy = prev.sortBy ? [...prev.sortBy] : [];
      // Remove if direction is null (unsorted)
      if (!direction) {
        newSortBy = newSortBy.filter(s => s?.sortBy !== path);
      } else {
        // Update or add
        const idx = newSortBy.findIndex(s => s?.sortBy === path);
        if (idx > -1) {
          newSortBy[idx] = { sortBy: path, direction: direction.toUpperCase() };
        } else {
          newSortBy.push({ sortBy: path, direction: direction.toUpperCase() });
        }
      }
      return { ...prev, sortBy: newSortBy, offset: 0 };
    });
  };

  const onActiveItemChanged = (e: CustomEvent) => {
    const activeItem = e.detail.value;
    if (activeItem) {
      selectedItems.value = [activeItem];
    } else {
      selectedItems.value = [];
    }
  };

  // Reset filter to default
  const resetFilter = () => {
    setFilter([]);
    setFilterRows([
      { id: crypto.randomUUID(), column: '', operator: 'contains', value: '' }
    ]);
    setSortRequest(pageSortRequest);
    // Remove directions from sort columns
    const sortColumns = document.querySelectorAll('vaadin-grid-sort-column');
    sortColumns.forEach((col) => {
      // @ts-ignore: Vaadin types do not include direction, but it exists on the element
      col.direction = null;
    });
  }

  // Add filter to sortRequest/useEffect
  useEffect(() => {
    getPersons(sortRequest, filter).then((pageResponse) => {
      if (pageResponse?.content && pageResponse?.pagination) {
        setPersons(pageResponse.content);
        setPageData(pageResponse.pagination);
      } else {
        setPersons([]);
        setPageData(defaultPagination);
      }
    }).catch(() => {
      setPersons([]);
      setPageData(defaultPagination);
    });
  }, [sortRequest, filter]);

  return (
    <VerticalLayout theme="spacing" style={{ padding: 'var(--lumo-space-m)' }}>
      <AddFilterDialog
        columns={columns}
        initialRows={filterRows}
        onApply={handleApplyFilterDialog}
        onReset={resetFilter}
        currentFilters={filter}
      />
      <VerticalLayout theme="spacing-xs" style={{ width: '100%' }}>
        <Grid
          items={persons}
          columnReorderingAllowed
          selectedItems={selectedItems.value}
          onActiveItemChanged={onActiveItemChanged}
          multiSort
          multiSortPriority="append"
        >
          <GridSortColumn path="id" header="ID" autoWidth flexGrow={0} resizable onDirectionChanged={handleSort} />
          <GridSortColumn path="firstName" header="First Name" autoWidth flexGrow={0} resizable onDirectionChanged={handleSort} />
          <GridSortColumn path="lastName" header="Last Name" autoWidth flexGrow={0} resizable onDirectionChanged={handleSort} />
          <GridSortColumn path="email" header="Email" autoWidth flexGrow={0} resizable onDirectionChanged={handleSort} />
          <GridSortColumn path="phone" header="Phone" autoWidth flexGrow={0} resizable onDirectionChanged={handleSort} />
          <GridSortColumn path="address" header="Address" resizable onDirectionChanged={handleSort} />

          <span slot="empty-state">No Person found.</span>
        </Grid>
        <GridPaginationControls pageData={pageData} onPageChange={handlePageChanged} />
      </VerticalLayout>
    </VerticalLayout>
  );
}
