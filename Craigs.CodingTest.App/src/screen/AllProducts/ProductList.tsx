import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux";

import { Box, Paper, Grid } from "@material-ui/core";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import { actionCreators, RootState} from "../../_redux/index";

import {Product} from "../../_interfaces/product";
import ProductCard from "../../components/ProductCard";

interface IProps {
  history: {
    push(url: string): void;
  };
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  component: string,
  count: number,
  page: number
}

const ProductList = (props: IProps) =>  {

  const dispatch = useDispatch();
  const { getProductList } = bindActionCreators(actionCreators, dispatch);
  const productList = useSelector((state: RootState )=> state.product.productList);


  useEffect(() => {
    //childsgetProductList();
  }, []);


  const handleSelect = (item: Product) => {
    const id = item?.productId;
    props.history.push(`/${id}`)
  }


  const [page, setPage] = React.useState(1);
  const [itemPerPage, setRowsPerPage] = React.useState(21);

  const indexOfLastPlace = page * itemPerPage;
  const indexOfFirstPlace = indexOfLastPlace - itemPerPage;
  const currentPlaces = productList?.slice(indexOfFirstPlace, indexOfLastPlace);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  

  // ------------------------------ RENDER COMPONENTS -------------------------- //


  const renderProductList = () => {
    return (
      <Grid container spacing={2} direction="row">
        {currentPlaces?.map((item: Product, index) => 
           (
            <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
              <ProductCard product = {item} onSelect={()=>handleSelect(item)}/>
          </Grid>
          ))}
          
      </Grid>
    )
  }

  const renderPagination = () => {
    const classes = useStyles();
    const length = Math.ceil(productList?.length/itemPerPage);
    return (
      <Grid container spacing={2} direction="row">
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <div className={classes.root}>
            <Pagination count={length} page={page} onChange={handleChange} color="primary"/>
          </div>
        </Grid>
      </Grid>
      
    )
  }

  //---------------------------------- MAIN RENDER -----------------------//
  return (
    
      <Box component="fieldset" mb={2} borderColor="transparent">
          <Paper style={{ boxShadow:'none'}}>
              {renderPagination()}
              {renderProductList()}
              {renderPagination()}
          </Paper>
          
      </Box>
        
  );
}
export default  ProductList;


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
        justifyContent:"center",
        display:'flex',
      },
    },
  }),
);


