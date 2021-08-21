import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import Loading from "../../../components/Loading";
import {Product} from "../../../_interfaces/product";
import ProductCard from "../../../components/ProductCard";

interface IProps {
  data: Product[],
  handleSelect: (id: number) => void;
}

const ProductThumb = (props: IProps) =>  {

  // ------------------------------ init -------------------------- //

  const { data, handleSelect } = props;
  const [page, setPage] = React.useState(1);
  const [itemPerPage, setRowsPerPage] = React.useState(21);
  const loading = data?.length > 0;

  const indexOfLastPlace = page * itemPerPage;
  const indexOfFirstPlace = indexOfLastPlace - itemPerPage;
  const currentPlaces = data?.slice(indexOfFirstPlace, indexOfLastPlace);

   // ------------------------------ function -------------------------- //

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
              <ProductCard product = {item} onSelect={()=>handleSelect(item?.brandId)}/>
          </Grid>
          ))}
          
      </Grid>
    )
  }

  const renderPagination = () => {
    const classes = useStyles();
    const length = Math.ceil(data?.length/itemPerPage);
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
    
    <div style={{ width: "100%", marginTop: 10, marginBottom: 30 }}>
        {renderProductList()}
        {renderPagination()}
        <Loading loading={!loading} />
      </div>
        
  );
}
export default  ProductThumb;


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


