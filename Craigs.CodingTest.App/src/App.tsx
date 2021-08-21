import { Box, Paper, Button, Grid , Card, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux";
import { actionCreators, RootState} from "./_redux/index";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import ProductList from "./screen/ProductList/ProductList";
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