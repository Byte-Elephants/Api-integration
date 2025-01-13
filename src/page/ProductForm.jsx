import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // Light blue
    },
    secondary: {
      main: "#f48fb1", // Pink
    },
    background: {
      default: "#121212", // Dark background
      paper: "#1e1e1e", // Slightly lighter background for components
    },
    text: {
      primary: "#ffffff", // White text
      secondary: "#bdbdbd", // Grey text
    },
  },
});

const ProductForm = () => {
  const [tabIndex, setTabIndex] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ p: 3, bgcolor: "background.default", color: "text.primary" }}>
        {/* Page Header */}
        <Typography variant="h5" gutterBottom>
          Product Name
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          New
        </Typography>

        {/* Type Selection */}
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Product"
            sx={{ mr: 2 }}
          />
          <FormControlLabel control={<Checkbox color="primary" />} label="Service" />
        </Box>

        {/* Checkbox Options */}
        <Box sx={{ mb: 3 }}>
          <FormControlLabel control={<Checkbox color="primary" />} label="Salable" />
          <FormControlLabel control={<Checkbox color="primary" />} label="Purchase" />
          <FormControlLabel control={<Checkbox color="primary" />} label="Production" />
          <FormControlLabel control={<Checkbox color="primary" />} label="Consumable" />
          <FormControlLabel control={<Checkbox color="primary" />} label="Asset" />
        </Box>

        {/* Tabs */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Product Information" />
          <Tab label="UOM and Conversion Config" />
          <Tab label="Configuration" />
          <Tab label="Vendor Configuration" />
        </Tabs>

        {/* Form Content */}
        <Box sx={{ mt: 3 }}>
          {tabIndex === 0 && (
            <Grid container spacing={2}>
              {/* First Row */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Short Name"
                  variant="outlined"
                  required
                  InputLabelProps={{ style: { color: "#ffffff" } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel style={{ color: "#ffffff" }}>Type</InputLabel>
                  <Select defaultValue="" required>
                    <MenuItem value="type1">Type 1</MenuItem>
                    <MenuItem value="type2">Type 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Second Row */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel style={{ color: "#ffffff" }}>Category</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="category1">Category 1</MenuItem>
                    <MenuItem value="category2">Category 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel style={{ color: "#ffffff" }}>Sub-Category</InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="sub-category1">Sub-Category 1</MenuItem>
                    <MenuItem value="sub-category2">Sub-Category 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Third Row */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Shelf Life (In Days)"
                  variant="outlined"
                  type="number"
                  required
                  InputLabelProps={{ style: { color: "#ffffff" } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="HSN Code (Tax)"
                  variant="outlined"
                  required
                  InputLabelProps={{ style: { color: "#ffffff" } }}
                />
              </Grid>

              {/* Fourth Row */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Weight"
                  variant="outlined"
                  type="number"
                  InputLabelProps={{ style: { color: "#ffffff" } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="TAT (Turn Around Time in Days)"
                  variant="outlined"
                  type="number"
                  InputLabelProps={{ style: { color: "#ffffff" } }}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={3}
                  InputLabelProps={{ style: { color: "#ffffff" } }}
                />
              </Grid>
            </Grid>
          )}
        </Box>

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary">
            Next
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProductForm;
