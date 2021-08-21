import { Box, Paper, Link, Grid , Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux";
import { actionCreators, RootState} from "../../_redux/index";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ProductTab from "./childs/ProductTab";
interface IProps {
  match: { params: { id: string } };
  history: {
    push(url: string): void;
  };
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function ProductDetails(props: IProps) {
  
  // -------------------- init ------------------------------------//

  const dispatch = useDispatch();
  const { getProductDetails } = bindActionCreators(actionCreators, dispatch);
  const productDetails = useSelector((state: RootState )=> state.product.productDetails);

   // -------------------- functions ------------------------------------//
  useEffect(() => {
    const productId = props.match.params.id;
    getProductDetails(productId);
  }, [props.match.params.id]);

  const handleSelect = (id: number) => {
    props.history.push(`/${id}`)
  }

  //--------------------------- RENDER COMPONENTS -----------------------------------//

  const renderBody = () => {
    return (
      <Grid container spacing={2} direction="row" alignItems="stretch">
        {renderImage()}
        {renderProductTab()}
      </Grid>
    )
  }
  const renderImage = () => {
    return (
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <img 
          src="https://cdn.shopify.com/s/files/1/2318/5263/products/BMT10828_BJ_01_29459064-0a4c-4fcb-b41c-3eda861e5bd7_800x800.jpg?v=1604167910"
          style={{width:'60%', marginRight:'auto', marginLeft:'auto', display:'flex'}}>
        </img>
      </Grid>
    )
  }

  const renderProductTab = () => {
    
    return (
      <Grid item lg={12} md={12} sm={12} xs={12} >
         <ProductTab data={productDetails} />
      </Grid>
    )
  }

  

  //--------------------------- MAIN RENDER -----------------------------------//

  return (
    <Box component="fieldset" mb={2} borderColor="transparent">
        <Link href="/" style={{display: 'flex'}}>
          <ArrowBackIcon style={{marginRight: 10}}/>
          <Typography>Back to Product List</Typography>
        </Link>
      
      <Paper className="paper-center" style={{boxShadow:'none'}}>
          {renderBody()}
      </Paper>
    </Box>
  )
}

export default ProductDetails;
