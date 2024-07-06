import React from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
  
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Eclair', 262, 16.0, 24),
    createData('Cupcake', 305, 3.7, 67),
    createData('Gingerbread', 356, 16.0, 49),
];

const StyledContainer = styled(TableContainer)(() => ({
    backgroundColor: '#3f3f46',
    color: '#fff',
    border: '2px solid #a6a6a6',
    borderRadius: '6px'
}));

const HeadCellWhite = styled(TableCell)(() => ({
    color: '#fff',
    fontSize: '1rem',
    borderColor: '#a6a6a6'
}));

const TableCellWhite = styled(TableCell)(() => ({
    color: '#fff',
    borderColor: '#a6a6a6'
}));

const BillingHistoryTable = ({ historyRecord }) => {

    return (
        <StyledContainer>
            <Table
                sx={{
                    minWidth: 650
                }}
                size="small"
            >
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: 'rgba(25, 118, 210, 0.2)'
                        }}
                    >
                        <HeadCellWhite >Bill Category</HeadCellWhite>
                        <HeadCellWhite align="right"># of Bills</HeadCellWhite>
                        <HeadCellWhite align="right">% of Total Bills</HeadCellWhite>
                        <HeadCellWhite align="right">Bills Total</HeadCellWhite>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {historyRecord.billingNodes.map((node) => (
                        <TableRow
                            key={node.category}
                            sx={{
                                '&:nth-last-child(2) td, &:nth-last-child(2) th': { borderBottom: '2px solid rgba(25, 118, 210, 0.5)' }
                            }}
                        >
                            <TableCellWhite component="th" scope="row">
                                {node.category}
                            </TableCellWhite>
                            <TableCellWhite align="right">{node.count}</TableCellWhite>
                            <TableCellWhite align="right">{node.percentage}</TableCellWhite>
                            <TableCellWhite align="right">${node.total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCellWhite>
                        </TableRow>
                    ))}
                    <TableRow
                        sx={{
                            '&:last-child td, &:last-child th': { border: 0 }
                        }}
                    >
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCellWhite
                            align="right"
                        >
                            Total:&nbsp;$
                            <span className='history-table-bold'>
                                {historyRecord.total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                            </span>
                        </TableCellWhite>
                    </TableRow>
                </TableBody>
            </Table>
        </StyledContainer>
    );
}

export default BillingHistoryTable;