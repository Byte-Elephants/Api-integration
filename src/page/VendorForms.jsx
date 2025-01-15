import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const ProductForm = () => {
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

  // Fetch initial product types on component mount
  useEffect(() => {
    fetchProductTypes();
  }, []);

  const fetchProductTypes = async () => {
    try {
      const response = await fetch(
        "/v1/product/get-product-type-name-hsn-code"
      );
      const data = await response.json();
      if (data?.data?.productType) {
        setOptions((prev) => ({
          ...prev,
          productTypes: data.data.productType,
          hsnCodes: data.data.taxHsnCode || [],
        }));
      }
    } catch (error) {
      console.error("Error fetching product types:", error);
    }
  };

  const fetchCategories = async (productTypeId) => {
    try {
      const response = await fetch(
        `/v1/product/get-product-category-by-product-type?productTypeId=${productTypeId}`
      );
      const data = await response.json();
      if (data?.data?.categories) {
        setOptions((prev) => ({
          ...prev,
          categories: data.data.categories,
        }));
        // Reset dependent fields
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
    try {
      const response = await fetch(
        `/v1/product/get-product-sub-category-by-category?categoryId=${categoryId}`
      );
      const data = await response.json();
      if (data?.data?.subCategories) {
        setOptions((prev) => ({
          ...prev,
          subCategories: data.data.subCategories,
        }));
        // Reset dependent fields
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
        // Reset dependent field
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

    // Trigger the appropriate fetch based on which dropdown changed
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
      default:
        break;
    }
  };

  return (
    <Grid container spacing={2}>
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
              <MenuItem key={type.productTypeId} value={type.productTypeId}>
                {type.typeName}
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
              <MenuItem key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Sub-Category Dropdown */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel style={{ color: "#ffffff" }}>Sub-Category</InputLabel>
          <Select
            name="productSubCategory"
            value={formInput.productSubCategory}
            onChange={handleInputChange}
            disabled={!formInput.productCategory}>
            {options.subCategories.map((subCategory) => (
              <MenuItem
                key={subCategory.subCategoryId}
                value={subCategory.subCategoryId}>
                {subCategory.subCategoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Sub-Group Dropdown */}
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel style={{ color: "#ffffff" }}>Sub-Group</InputLabel>
          <Select
            name="productSubGroup"
            value={formInput.productSubGroup}
            onChange={handleInputChange}
            disabled={!formInput.productSubCategory}>
            {options.subGroups.map((subGroup) => (
              <MenuItem key={subGroup.subGroupId} value={subGroup.subGroupId}>
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
    </Grid>
  );
};

export default ProductForm;
