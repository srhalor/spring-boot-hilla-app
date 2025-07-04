import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useEffect, useState } from 'react';
import { getPersons } from '../generated/PersonEndpoint';
import { useSignal } from '@vaadin/hilla-react-signals';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridSortColumn } from '@vaadin/react-components/GridSortColumn.js';
import { EmailField, FormLayout, FormRow, SplitLayout, TextField } from '@vaadin/react-components';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { Icon } from '@vaadin/react-components/Icon.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import type Pagination from '../generated/com/fmd/app/dto/Pagination.js';
import type PageSortRequest from '../generated/com/fmd/app/dto/PageSortRequest.js';
import GridPaginationControls, { defaultPagination } from '../components/pagination/GridPaginationControls';
import { Button } from '@vaadin/react-components/Button.js';
import type { TextFieldChangeEvent } from '@vaadin/react-components/TextField.js';
import type PersonDTO from '../generated/com/fmd/app/dto/PersonDTO.js';

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

export const pageSortRequest = {
  offset: defaultPagination.offset,
  pageSize: defaultPagination.pageSize,
  sortBy: []
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
  // Add filter state
  const [filter, setFilter] = useState<PersonDTO>(defaultFilter);
  const [pendingFilter, setPendingFilter] = useState<PersonDTO>(defaultFilter);

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

  // Update pending filter only
  const handleFilterChange = (e: TextFieldChangeEvent) => {
    const { name, value } = e.target;
    setPendingFilter((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filter on button click
  const applyFilter = () => {
    setFilter(pendingFilter);
  };

  // Reset filter to default
  const resetFilter = () => {
    setPendingFilter(defaultFilter);
    setFilter(defaultFilter);
  }

  // Helper to check if any filter is set
  const isFilterSet = Object.values(pendingFilter).some((v) => v && v.length > 0);

  // Add filter to sortRequest/useEffect
  useEffect(() => {
      console.log('Fetching persons with sortRequest:', sortRequest, 'and filter:', filter);
    getPersons(sortRequest, filter).then((pageResponse) => {
      if (pageResponse && pageResponse.content && pageResponse.pagination) {
        console.log('Fetched persons:', pageResponse);
        setPersons(pageResponse.content);
        setPageData(pageResponse.pagination);
      } else {
        setPersons([]);
        setPageData(defaultPagination);
      }
    }).catch(() => {
      console.error('Failed to fetch persons');
      setPersons([]);
      setPageData(defaultPagination);
    });
  }, [sortRequest, filter]);

  return (
    <VerticalLayout theme="spacing" style={{ padding: 'var(--lumo-space-m)' }}>
      <FormLayout style={{ maxWidth: 900, marginBottom: 'var(--lumo-space-m)' }}>
        <TextField label="First Name" name="firstName" id="firstName" value={pendingFilter.firstName} onChange={handleFilterChange} clearButtonVisible autocomplete="given-name" />
        <TextField label="Last Name" name="lastName" id="lastName" value={pendingFilter.lastName} onChange={handleFilterChange} clearButtonVisible autocomplete="family-name" />
        <EmailField label="Email" name="email" id="email" value={pendingFilter.email} onChange={handleFilterChange} clearButtonVisible autocomplete="email" />
        <TextField label="Phone" name="phone" id="phone" value={pendingFilter.phone} onChange={handleFilterChange} clearButtonVisible autocomplete="tel" />
        <TextField label="Address" name="address" id="address" value={pendingFilter.address} onChange={handleFilterChange} clearButtonVisible autocomplete="street-address" />
        <HorizontalLayout style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button theme="primary" onClick={applyFilter} disabled={!isFilterSet}>Filter</Button>
          <Button onClick={resetFilter} style={{ marginLeft: 'var(--lumo-space-s)' }} disabled={!isFilterSet}>Clear</Button>
        </HorizontalLayout>
      </FormLayout>
      <VerticalLayout theme="spacing-xs" style={{ width: '100%' }}>
        <Grid
            items={persons}
            //all-rows-visible
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
