import React, { useEffect, useState } from "react";
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
  Radio,
  RadioGroup,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bdbdbd",
    },
  },
});

const ProductForm = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formInput, setFormInput] = useState({
    productType: "", // Change this to store selected value
    productTypeName: "",
    productHsnCode: "",
    productCategory: "",
    productSubCategory: "",
    productSubGroup: "",
  });
  const [productTypeOptions, setProductTypeOptions] = useState([]); // New state for options
  const [hsnCodeOptions, setHsnCodeOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/v1/product/get-product-type-name-hsn-code"
        );
        const data = await response.json();
        if (data?.data?.productType) {
          setProductTypeOptions(data.data.productType); // Store options separately
        }
        if (data?.data?.taxHsnCode) {
          setHsnCodeOptions(data.data.taxHsnCode); // You'll need to create this state
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("asdfasdf");
      } catch {}
    };
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          p: 3,
          bgcolor: "background.default",
          color: "text.primary",
          mx: "auto",
          maxHeight: "100vh",
          borderRadius: 2,
        }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ wordWrap: "break-word", maxWidth: "100%" }}>
          Product Name
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          gutterBottom
          sx={{ wordWrap: "break-word", maxWidth: "100%" }}>
          New
        </Typography>
        <Grid item xs={12} sm={6}>
          <TextField id="standard-basic" label="Name" variant="standard" />
          <TextField id="standard-basic" label="email" variant="standard" />

          <TextField
            id="standard-basic"
            label="Mobile No."
            variant="standard"
          />
        </Grid>
        <Box sx={{ mb: 3 }}>
          <FormControl component="fieldset">
            <RadioGroup row>
              <FormControlLabel
                value="product"
                control={<Radio color="primary" />}
                label="Product"
                sx={{ mr: 2 }}
              />
              <FormControlLabel
                value="service"
                control={<Radio color="primary" />}
                label="Service"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Salable"
            sx={{ mr: 2 }}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Purchase"
            sx={{ mr: 2 }}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Production"
            sx={{ mr: 2 }}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Consumable"
            sx={{ mr: 2 }}
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Asset"
          />
        </Box>

        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ mb: 3 }}>
          <Tab label="Product Information" />
          <Tab label="UOM and Conversion Config" />
          <Tab label="Configuration" />
          <Tab label="Vendor Configuration" />
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {tabIndex === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Short Name"
                  variant="outlined"
                  required
                  InputLabelProps={{ style: { color: "#ffffff" } }}
                />
              </Grid>

              {/* Product Type   */}

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel style={{ color: "#ffffff" }}>Type</InputLabel>
                  <Select
                    value={formInput.productType}
                    onChange={(e) =>
                      setFormInput((prev) => ({
                        ...prev,
                        productType: e.target.value,
                      }))
                    }
                    defaultValue=""
                    required>
                    {productTypeOptions.map((product) => (
                      <MenuItem
                        key={product.productTypeId}
                        value={product.productTypeId}>
                        {product.typeName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

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
                  <InputLabel style={{ color: "#ffffff" }}>
                    Sub-Category
                  </InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="sub-category1">Sub-Category 1</MenuItem>
                    <MenuItem value="sub-category2">Sub-Category 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel style={{ color: "#ffffff" }}>
                    Sub-Group
                  </InputLabel>
                  <Select defaultValue="">
                    <MenuItem value="sub-Group1">Sub-Group 1</MenuItem>
                    <MenuItem value="sub-Group2">Sub-Group 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* HSN CODE */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel style={{ color: "#ffffff" }}>HSN Code</InputLabel>
                  <Select
                    value={formInput.productHsnCode || ""} // Correct value mapping
                    onChange={(e) =>
                      setFormInput((prev) => ({
                        ...prev,
                        productHsnCode: e.target.value, // Correctly update the selected HSN code
                      }))
                    }
                    required>
                    {hsnCodeOptions.map((hsn) => (
                      <MenuItem key={hsn.taxId} value={hsn.hsnCode}>
                        {hsn.hsnCode}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

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
                  label="Weight"
                  variant="outlined"
                  type="number"
                  InputLabelProps={{ style: { color: "#ffffff" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Moisture level"
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

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary">
            Next
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ProductForm;
