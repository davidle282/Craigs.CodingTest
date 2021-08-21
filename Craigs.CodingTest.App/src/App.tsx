import { Container, } from "@material-ui/core";
import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ProductList from "./screen/AllProducts";
import ProductDetails from "./screen/ProductDetails/ProductDetails";

export default function App() {
  return (
    <Container maxWidth="lg">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route exact path="/:id" component={ProductDetails}/>
        </Switch>
      </BrowserRouter>
    </Container> 
  );
}