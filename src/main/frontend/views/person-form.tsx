import { ViewConfig } from '@vaadin/hilla-file-router/types.js';
import { useEffect, useState } from 'react';
import { getPersons } from '../generated/PersonEndpoint';
import { Grid } from '@vaadin/react-components/Grid.js';
import { GridColumn } from '@vaadin/react-components/GridColumn.js';
import type Person from '../generated/com/fmd/app/data/Person';

export const config: ViewConfig = {
  menu: { order: 1, icon: 'line-awesome/svg/user.svg' },
  title: 'Person Form',
  loginRequired: true,
};

export default function PersonFormView() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [pageInfo, setPageInfo] = useState<{
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
    first: boolean;
    last: boolean;
  }>({
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    pageSize: 10,
    first: true,
    last: true
  });

  useEffect(() => {
    // Create PageSortRequest object to match backend expectation
    const pageSortRequest = {
      offset: 0,
      pageSize: 10,
      direction: 'ASC' as const,
      sortBy: 'firstName'
    };

    getPersons(pageSortRequest).then((pageResponse) => {
        console.log('Persons page response:', pageResponse);

        // Handle PageResponse structure
        if (pageResponse && pageResponse.content) {
          setPersons(pageResponse.content);
          setPageInfo({
            totalElements: pageResponse.totalElements || 0,
            totalPages: pageResponse.totalPages || 0,
            currentPage: pageResponse.pageNumber || 0,
            pageSize: pageResponse.pageSize || 10,
            first: pageResponse.first || true,
            last: pageResponse.last || true
          });
        } else {
          console.warn('Unexpected response structure:', pageResponse);
          setPersons([]);
        }
    }).catch((error) => {
        console.error('Error fetching persons:', error);
        setPersons([]);
    });
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '1rem', padding: '1rem',  borderRadius: '4px' }}>
        <p>
          Showing {persons.length} of {pageInfo.totalElements} persons
        </p>
        <p>
          Page {pageInfo.currentPage + 1} of {pageInfo.totalPages}
          {pageInfo.first && ' (First Page)'}
          {pageInfo.last && ' (Last Page)'}
        </p>
        <p>Page Size: {pageInfo.pageSize}</p>
      </div>

      <Grid items={persons}>
        <GridColumn path="firstName" header="First Name" />
        <GridColumn path="lastName" header="Last Name" />
        <GridColumn path="email" header="Email" />
        <GridColumn path="phone" header="Phone" />
        <GridColumn path="address" header="Address" />
      </Grid>
    </div>
  );
}
