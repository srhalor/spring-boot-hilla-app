import React, { useState } from 'react';
import { Dialog } from '@vaadin/react-components/Dialog.js';
import { ComboBox } from '@vaadin/react-components/ComboBox.js';
import { TextField } from '@vaadin/react-components/TextField.js';
import { Button } from '@vaadin/react-components/Button.js';
import { HorizontalLayout } from '@vaadin/react-components/HorizontalLayout.js';
import { VerticalLayout } from '@vaadin/react-components/VerticalLayout.js';
import './pagination-styles.css';

export interface FilterColumnOption {
    label: string;
    value: string;
}

export interface FilterOperatorOption {
    label: string;
    value: string;
}

export interface FilterRow {
    id: string;
    column: string;
    operator: string;
    value: string;
}

interface AddFilterDialogProps {
    columns: FilterColumnOption[];
    operators?: FilterOperatorOption[];
    onApply: (rows: FilterRow[]) => void;
    onClear: () => void;
    currentFilters?: FilterRow[];
}

const DEFAULT_OPERATORS: FilterOperatorOption[] = [
    { label: 'Contains', value: 'contains' },
    { label: 'Equals', value: 'equals' },
    { label: 'Starts with', value: 'startsWith' },
    { label: 'Ends with', value: 'endsWith' },
];

export const AddFilterDialog: React.FC<AddFilterDialogProps> = ({
    columns,
    operators = DEFAULT_OPERATORS,
    onApply,
    onClear,
    currentFilters = [],
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [filterRows, setFilterRows] = useState<FilterRow[]>([
        { id: crypto.randomUUID(), column: '', operator: 'contains', value: '' }
    ]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const handleRowChange = (idx: number, key: keyof FilterRow, value: string) => {
        setFilterRows(rows => rows.map((row, i) => i === idx ? { ...row, [key]: value } : row));
    };

    const addRow = () => setFilterRows(rows => [...rows, { id: crypto.randomUUID(), column: '', operator: 'contains', value: '' }]);

    const removeRow = (idx: number) => setFilterRows(rows => rows.length > 1 ? rows.filter((_, i) => i !== idx) : rows);

    const openDialog = () => {
        setDialogOpen(true);
        setEditIndex(null);
        setFilterRows([{ id: crypto.randomUUID(), column: '', operator: 'contains', value: '' }]);
    };

    const openEditDialog = (idx: number) => {
        setDialogOpen(true);
        setEditIndex(idx);
        const row = currentFilters[idx];
        setFilterRows([{ ...row }]);
    };

    const applyFilters = () => {
        const newRows = filterRows.filter(row => row.column && row.value);
        if (editIndex !== null && newRows.length === 1) {
            // Edit existing filter
            const updated = currentFilters.map((row, i) => i === editIndex ? { ...newRows[0], id: row.id } : row);
            onApply(updated);
        } else {
            // Add new filter(s) as before
            const uniqueRows = newRows.filter(newRow =>
                !currentFilters.some(f => f.column === newRow.column && f.operator === newRow.operator && f.value === newRow.value)
            );
            onApply(uniqueRows.length ? [...currentFilters, ...uniqueRows] : currentFilters);
        }
        setDialogOpen(false);
        setEditIndex(null);
        setFilterRows([{ id: crypto.randomUUID(), column: '', operator: 'contains', value: '' }]);
    };

    const resetFilters = () => {
        setFilterRows([{ id: crypto.randomUUID(), column: '', operator: 'contains', value: '' }]);
        onClear();
        setDialogOpen(false);
        setEditIndex(null);
    };

    const removeChip = (idx: number) => {
        const updated = currentFilters.filter((row, i) => i !== idx && row.column && row.value);
        onApply(updated);
    };

    return (
        <>
            <HorizontalLayout className="pagination-controls">
                {/* Show current filters as chips */}
                {currentFilters.length > 0 && (
                    <>
                        <div className="pagination-chips">
                            {currentFilters.filter(row => row.column && row.value).map((row, i) => (
                                <span
                                    className="pagination-chip"
                                    key={row.id}
                                    onClick={() => openEditDialog(i)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {columns.find(c => c.value === row.column)?.label || row.column} {row.operator} "{row.value}"
                                    <Button
                                        theme="tertiary-inline error"
                                        style={{ marginLeft: 4 }}
                                        onClick={(e: React.MouseEvent) => { e.stopPropagation(); removeChip(i); }}
                                        aria-label="Remove filter"
                                    >
                                        ×
                                    </Button>
                                </span>
                            ))}
                        </div>
                        <Button onClick={resetFilters} style={{ marginLeft: 'var(--lumo-space-s)' }}>Clear All</Button>
                    </>
                )}
                <Button theme="primary" onClick={openDialog} style={{ marginLeft: 'var(--lumo-space-s)' }}>Add Filter</Button>
            </HorizontalLayout>
            <Dialog opened={dialogOpen} onOpenedChanged={e => setDialogOpen(e.detail.value)} headerTitle={editIndex !== null ? 'Edit Filter' : 'Add Filter'}>
                <VerticalLayout style={{ gap: '1rem' }}>
                    {filterRows.map((row, idx) => (
                        <HorizontalLayout key={row.id} style={{ alignItems: 'center', gap: '0.5rem' }}>
                            <ComboBox
                                label="Column"
                                items={columns}
                                itemLabelPath="label"
                                itemValuePath="value"
                                value={row.column}
                                onValueChanged={e => handleRowChange(idx, 'column', e.detail.value)}
                                style={{ width: '10rem' }}
                            />
                            <ComboBox
                                label="Operator"
                                items={operators}
                                itemLabelPath="label"
                                itemValuePath="value"
                                value={row.operator}
                                onValueChanged={e => handleRowChange(idx, 'operator', e.detail.value)}
                                style={{ width: '10rem' }}
                            />
                            <TextField
                                label="Value"
                                value={row.value}
                                onChange={e => handleRowChange(idx, 'value', e.target.value)}
                                style={{ width: '10rem' }}
                            />
                            {filterRows.length > 1 && editIndex === null && (
                                <Button theme="error tertiary" onClick={() => removeRow(idx)}>-</Button>
                            )}
                            {idx === filterRows.length - 1 && editIndex === null && (
                                <Button theme="tertiary" onClick={addRow}>+</Button>
                            )}
                        </HorizontalLayout>
                    ))}
                    <HorizontalLayout style={{ justifyContent: 'flex-end', width: '100%' }}>
                        <Button theme="primary" onClick={applyFilters}>{editIndex !== null ? 'Update' : 'Apply'}</Button>
                        <Button onClick={() => { setDialogOpen(false); setEditIndex(null); }} style={{ marginLeft: 'var(--lumo-space-s)' }}>Cancel</Button>
                    </HorizontalLayout>
                </VerticalLayout>
            </Dialog>
        </>
    );
};
