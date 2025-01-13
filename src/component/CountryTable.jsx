import React from "react";
import { useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CountryTable = () => {
  const location = useLocation();
  const { countryData = [] } = location.state || {}; // Default to an empty array

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
          {countryData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.shortName}</TableCell>
              <TableCell>{item.sortOrder}</TableCell>
              <TableCell>{item.insertDateTime}</TableCell>
              <TableCell>{item.stateCount}</TableCell>
              <TableCell>{item.districtCount}</TableCell>
              <TableCell>{item.talukaCount}</TableCell>
              <TableCell>{item.areaCount}</TableCell>
              <TableCell>{item.beatCount}</TableCell>
              <TableCell>{item.outletCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CountryTable;
