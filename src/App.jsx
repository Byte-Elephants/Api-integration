import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import CountryTable from "./component/CountryTable";
import ProductForm from "./page/ProductForm";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/table" element={<CountryTable />} />
          <Route path = "/productform" element = {<ProductForm />} />
          <Route path = "*" element = {<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
