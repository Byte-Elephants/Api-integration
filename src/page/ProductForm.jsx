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
    productType: "",
    productCategory: "",
    productSubCategory: "",
    productSubGroup: "",
    productHsnCode: "",
  });

  const [options, setOptions] = useState({
    productTypes: [],
    categories: [],
    subCategories: [],
    subGroups: [],
    hsnCodes: [],
  });

  useEffect(() => {
    fetchProductTypes();
  }, []);
    const domain = "https://distributiondevelop.byteelephants.com";


  const fetchProductTypes = async () => {

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${domain}/api/erpdevelop/v1/product/get-apis-for-add-form?productId=`,
        {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("Product data:", data);
      if (data?.data?.productType) {
        console.log("ProductType data:", data?.data?.productType);
        setOptions((prev) => ({
          ...prev,
          productTypes: data.data.productType,
        }));
      }
    } catch (error) {
      console.error("Error fetching product types:", error);
    }
  };

  const fetchCategories = async (productTypeId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://distributiondevelop.byteelephants.com/api/erpdevelop/v1/category/by-product-types",
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: [productTypeId],
          }),
        }
      );
      const data = await response.json();
      console.log("Category data:", data);
      if (data?.data) {
        console.log("CategoryType data:", data?.data);
        setOptions((prev) => ({
          ...prev,
          categories: data.data,
        }));
        setFormInput((prev) => ({
          ...prev,
          productCategory: "",
          productSubCategory: "",
          productSubGroup: "",
        }));
        setOptions((prev) => ({
          ...prev,
          subCategories: [],
          subGroups: [],
        }));
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "https://distributiondevelop.byteelephants.com/api/erpdevelop/v1/sub-category/by-categories",
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: [categoryId],
          }),
        }
      );
      const data = await response.json();
      console.log("SubCategory data:", data);
      if (data?.data) {
        console.log("SubCategoryType data:", data?.data);
        setOptions((prev) => ({
          ...prev,
          subCategories: data.data,
        }));
        setFormInput((prev) => ({
          ...prev,
          productSubCategory: "",
          productSubGroup: "",
        }));
        setOptions((prev) => ({
          ...prev,
          subGroups: [],
        }));
      }
    } catch (error) {
      console.error("Error fetching sub-categories:", error);
    }
  };

  const fetchSubGroups = async (subCategoryId) => {
    try {
      const response = await fetch(
        `/v1/product/get-product-sub-groups?subCategoryId=${subCategoryId}`
      );
      const data = await response.json();
      if (data?.data?.subGroups) {
        setOptions((prev) => ({
          ...prev,
          subGroups: data.data.subGroups,
        }));
        setFormInput((prev) => ({
          ...prev,
          productSubGroup: "",
        }));
      }
    } catch (error) {
      console.error("Error fetching sub-groups:", error);
    }
  };


  const fetchHsnCodes = async (subCategoryId) => {
    try {
      const response = await fetch(
        `/v1/product/get-product-sub-groups?subCategoryId=${subCategoryId}`
      );
      const data = await response.json();
      if (data?.data?.subGroups) {
        setOptions((prev) => ({
          ...prev,
          subGroups: data.data.subGroups,
        }));
        setFormInput((prev) => ({
          ...prev,
          productSubGroup: "",
        }));
      }
    } catch (error) {
      console.error("Error fetching sub-groups:", error);
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));

    switch (name) {
      case "productType":
        await fetchCategories(value);
        break;
      case "productCategory":
        await fetchSubCategories(value);
        break;
      case "productSubCategory":
        await fetchSubGroups(value);
        break;
        case "productHsnCode":
        await fetchHsnCodes(value);
        break;
      default:
        break;
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

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
              {/* product short name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Short Name"
                  variant="outlined"
                  required
                  InputLabelProps={{ style: { color: "#ffffff" } }}
                />
              </Grid>

              {/* Product Type Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel style={{ color: "#ffffff" }}>Type</InputLabel>
                  <Select
                    name="productType"
                    value={formInput.productType}
                    onChange={handleInputChange}
                    required>
                    {options.productTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Category Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel style={{ color: "#ffffff" }}>Category</InputLabel>
                  <Select
                    name="productCategory"
                    value={formInput.productCategory}
                    onChange={handleInputChange}
                    disabled={!formInput.productType}>
                    {options.categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Sub-Category Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel style={{ color: "#ffffff" }}>
                    Sub-Category
                  </InputLabel>
                  <Select
                    name="productSubCategory"
                    value={formInput.productSubCategory}
                    onChange={handleInputChange}
                    disabled={!formInput.productCategory}>
                    {options.subCategories.map((subCategory) => (
                      <MenuItem
                        key={subCategory.id}
                        value={subCategory.id}>
                        {subCategory?.shortName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Sub-Group Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel style={{ color: "#ffffff" }}>
                    Sub-Group
                  </InputLabel>
                  <Select
                    name="productSubGroup"
                    value={formInput.productSubGroup}
                    onChange={handleInputChange}
                    disabled={!formInput.productSubCategory}>
                    {options.subGroups.map((subGroup) => (
                      <MenuItem
                        key={subGroup.subGroupId}
                        value={subGroup.subGroupId}>
                        {subGroup.subGroupName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* HSN Code Dropdown */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel style={{ color: "#ffffff" }}>HSN Code</InputLabel>
                  <Select
                    name="productHsnCode"
                    value={formInput.productHsnCode}
                    onChange={handleInputChange}
                    required>
                    {options.hsnCodes.map((hsn) => (
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
