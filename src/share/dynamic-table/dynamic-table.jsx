import React, { useState } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox
} from '@mui/material';

export default function DynamicTable(props) {
    const [selectedRow, setSelectedRow] = useState(null);

    const tableHeader = props.header.map((res) => (
        <TableCell align="right" key={res.key}>{res.name}</TableCell>
    ));

    const handleSelect = (row, rowIndex) => {
        const id = row.id ?? rowIndex;
        const isSelected = selectedRow === id;

        setSelectedRow(isSelected ? null : id);
        props.onSelect?.(isSelected ? null : row);
    };

    return (
        <TableContainer component={Paper} sx={{ direction: 'rtl', marginTop: '20px' }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                        {tableHeader}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.rows.map((row, rowIndex) => (
                        <TableRow key={row.id ?? rowIndex}>
                            {props.header.map((col) => (
                                <TableCell align="right" key={col.key}>
                                    {col.key === 'select' ? (
                                        <Checkbox
                                            checked={selectedRow === (row.id ?? rowIndex)}
                                            onChange={() => handleSelect(row, rowIndex)}
                                        />
                                    ) : (
                                        row[col.key]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}