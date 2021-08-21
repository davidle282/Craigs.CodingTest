import React from 'react';
import { sumBy } from "lodash";
import PropTypes from 'prop-types';
import {Grid, AppBar, Tabs, Tab, Typography, Box, Paper } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import StoreIcon from '@material-ui/icons/Store';
import {IProductDetails} from "../../../_interfaces/product";

interface IProps {
    data: IProductDetails,
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Paper style={{padding:20}}>{children}</Paper>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function ScrollProps(index: number) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

export default function ProductTab({data}: IProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };


  const renderBody = () => {
    return(
      <React.Fragment>
        <AppBar position="static" color="default">
          <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable prevent tabs example"
          >
            <Tab label="Details" icon={<InfoIcon />} aria-label="phone" {...ScrollProps(0)} />
            <Tab label="Stock Information" icon={<StoreIcon />} aria-label="favorite" {...ScrollProps(1)} />
          </Tabs>
        </AppBar>
        {renderProductDetails()}
        {renderStockInfo()}
          
      </React.Fragment>
    )
  }

  const renderProductDetails = () => {
    const productName = data?.productName;
    const categoryName = data?.category.categoryName;
    const brandName = data?.brand?.brandName;
    const listPrice = data?.listPrice;
    const modelYear = data?.modelYear;
    return (
      <TabPanel value={value} index={0}>
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
      </TabPanel>
    )
  }

  const renderStockInfo = () => {
    const stocks = data?.stocks;
    const inStock = sumBy(stocks, 'quantity');
      return (
        <TabPanel value={value} index={1}>
          <Grid container spacing={2} direction="row">
            <Grid item lg={6} md={6} sm={6} xs={6}>
                <Typography style={{fontWeight: 'bold'}} >Store Name</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography style={{fontWeight: 'bold'}} >Quantity</Typography>
            </Grid>
        
            {stocks?.map((stock, index) => (
              <React.Fragment key={index}>
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                      <Typography>{stock?.store?.storeName}</Typography>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <Box style={{width:60}}>
                        <Typography style={{ textAlign:'right'}}>{stock?.quantity}</Typography>
                    </Box>
                  </Grid>
              </React.Fragment>

            ))}
            <Grid item lg={6} md={6} sm={6} xs={6}>
                <Typography style={{fontWeight: 'bold'}}>Total</Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Box style={{width:60}}>
                <Typography style={{ textAlign:'right'}}>{inStock}</Typography>
              </Box>
               
            </Grid>
          </Grid>
        </TabPanel>
      )
  }

  //--------------------------- MAIN RENDER -----------------------------------//
  return (
    <div>
      {renderBody()}
    </div>
  );
}
