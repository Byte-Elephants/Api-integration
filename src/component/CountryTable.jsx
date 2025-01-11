import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CountryTable = ({ data }) => {


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Short Name</TableCell>
            <TableCell>Sort Order</TableCell>
            <TableCell>Insert Date Time</TableCell>
            <TableCell>State Count</TableCell>
            <TableCell>District Count</TableCell>
            <TableCell>Taluka Count</TableCell>
            <TableCell>Area Count</TableCell>
            <TableCell>Beat Count</TableCell>
            <TableCell>Outlet Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow key={data.id}>
              <TableCell component="th" scope="row">
                {data.id}
              </TableCell>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.shortName}</TableCell>
              <TableCell>{data.sortOrder}</TableCell>
              <TableCell>{data.insertDateTime}</TableCell>
              <TableCell>{data.stateCount}</TableCell>
              <TableCell>{data.districtCount}</TableCell>
              <TableCell>{data.talukaCount}</TableCell>
              <TableCell>{data.areaCount}</TableCell>
              <TableCell>{data.beatCount}</TableCell>
              <TableCell>{data.outletCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CountryTable;
