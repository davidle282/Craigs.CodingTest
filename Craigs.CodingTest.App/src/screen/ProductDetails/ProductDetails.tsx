import { Box, Paper, Link, Grid , Typography, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux";
import { actionCreators, RootState} from "../../_redux/index";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Product} from "../../_interfaces/product";
import ProductTab from "./childs/ProductTab";
import ProductCard from "../../components/ProductCard";


interface IProps {
  match: { params: { id: string } };
  history: {
    push(url: string): void;
  };
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function ProductDetails(props: IProps) {

  const dispatch = useDispatch();
  const { getProductDetails } = bindActionCreators(actionCreators, dispatch);
  const productDetails = useSelector((state: RootState )=> state.product.productDetails);
  const productList = useSelector((state: RootState )=> state.product.productList);
  const [filter, setFilter] = useState('category');

  useEffect(() => {
    const productId = props.match.params.id;
    getProductDetails(productId);
  }, [props.match.params.id]);

  const handleSelect = (item: Product) => {
    const id = item?.productId;
    props.history.push(`/${id}`)
  }

  //--------------------------- RENDER COMPONENTS -----------------------------------//

  const renderBody = () => {
    return (
      <Grid container spacing={2} direction="row" alignItems="stretch">
        {renderImage()}
        {renderProductTab()}
        {renderRelatedProduct()}
      </Grid>
    )
  }
  const renderImage = () => {
    return (
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <img 
          src="https://cdn.shopify.com/s/files/1/2318/5263/products/BMT10828_BJ_01_29459064-0a4c-4fcb-b41c-3eda861e5bd7_800x800.jpg?v=1604167910"
          style={{width:'70%', marginRight:'auto', marginLeft:'auto', display:'flex'}}>

        </img>
      </Grid>
    )
  }

  const renderProductTab = () => {
    
    return (
      <Grid item lg={6} md={6} sm={12} xs={12} >
         <ProductTab data={productDetails} />
      </Grid>
    )
  }

  const renderRelatedProduct  = () => {
    let relatedProduct = productList?.filter(item => item.categoryId === productDetails?.categoryId);
    if(filter==='brand'){
      relatedProduct = productList?.filter(item => item.brandId === productDetails?.brandId);
    }
    return (
      <Grid item lg={12} md={12} sm={12} xs={12} >
        <Grid container spacing={2} direction="row">
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <Typography variant="h6">View more related products</Typography>
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <Box display="flex" style={{justifyContent:'space-between'}}>
              <Typography>By category</Typography>
              <Button size="medium" color="primary" variant='outlined' onClick={()=>setFilter('cateogry')}>{productDetails?.category?.categoryName}</Button>
            </Box>
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <Box display="flex" style={{justifyContent:'space-between'}}>
              <Typography>By brand</Typography>
              <Button size="medium" color="secondary" variant='outlined' onClick={()=>setFilter('brand')}>{productDetails?.brand?.brandName}</Button>
            </Box>
          </Grid>
        </Grid>
         
         <Grid container spacing={2} direction="row">
          {relatedProduct?.map((item: Product, index) => 
            (
              <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
                <ProductCard product = {item} onSelect={()=>handleSelect(item)}/>
            </Grid>
            ))}
            
        </Grid>
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
