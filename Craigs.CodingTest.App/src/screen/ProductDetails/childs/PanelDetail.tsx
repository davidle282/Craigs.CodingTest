import React from 'react';
import {Grid, Typography } from '@material-ui/core';
import { useSelector } from "react-redux";
import { RootState} from "../../../_redux/index";

function PanelDetail() {
    // -------------------- init ------------------------------------//

    const productDetails = useSelector((state: RootState )=> state.product.productDetails);
    const productName = productDetails?.productName;
    const categoryName = productDetails?.category.categoryName;
    const brandName = productDetails?.brand?.brandName;
    const listPrice = productDetails?.listPrice;
    const modelYear = productDetails?.modelYear;

    // -------------------- main render ------------------------------------//
    return (
        <Grid container spacing={2} direction="row" alignItems="center">
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography style={{fontWeight: 'bold'}} >Product Name</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography color='primary'>{productName}</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography style={{fontWeight: 'bold'}}>Brand</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography color='secondary'>{brandName}</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography style={{fontWeight: 'bold'}}>Category</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography>{categoryName}</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography style={{fontWeight: 'bold'}}>Price</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography color='secondary'>${listPrice}</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography style={{fontWeight: 'bold'}}>Model Year</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography>{modelYear}</Typography>
            </Grid>
        </Grid>
    )
}

export default PanelDetail;
