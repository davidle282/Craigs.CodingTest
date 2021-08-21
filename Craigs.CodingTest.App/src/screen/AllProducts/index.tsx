import React, { useState, useEffect } from "react";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux";
import { Box, Paper, Grid, Typography, Button } from "@material-ui/core";
import ViewListIcon from '@material-ui/icons/ViewList';
import AppsIcon from '@material-ui/icons/Apps';
import { actionCreators, RootState} from "../../_redux/index";
import {Product} from "../../_interfaces/product";
import ProductTable from "./childs/ProductTable";
import ProductThumb from "./childs/ProductThumb";
interface IProps {
    history: {
        push(url: string): void;
    };
}
type Direction = "asc" | "desc";
interface IState {
    data: Product[],
    direction: Direction;
}


function index(props: IProps ) {
    // -------------------- init ------------------------------------//

    const dispatch = useDispatch();
    const { getProductList } = bindActionCreators(actionCreators, dispatch);
    const productList = useSelector((state: RootState )=> state.product.productList);
    const [view, setView] = useState('list')
    const [data, setData] = useState<IState['data']>([]);
    const [by, setBy] = useState('');
    const [direction, setDirection] = useState<IState['direction']>('asc');


    // -------------------- handling functions ------------------------------------//
    const handleSort = (id: string) => {
        const isAsc = by === id && direction === "asc";
        setBy(id);
        setDirection(isAsc ? "desc" : "asc");
    };

    const refineData = () => {
        const products = orderBy(data, [by], [direction]);
        setData(products);
    }

    const handleSelectItem = (id: number) => {
        props.history.push(`/${id}`)
    };

    const fetchData = () => {
        getProductList((res: Product[])=>{
            setData(res);
        });
    }

    useEffect(() => {
        refineData();
     }, [by, direction]);

    useEffect(() => {
        fetchData();
    }, []);

    // ------------------------------ RENDER COMPONENTS -------------------------- //

    const renderViewSelection = () => {
        return (
        <Grid container spacing={2} direction="row">
          <Grid item lg={2} md={2} sm={6} xs={6}>
            <Typography variant="h6">Select view</Typography>
          </Grid>
          <Grid item lg={2} md={2} sm={2} xs={3}>
            <Button onClick={()=>setView('list')}>
              <Typography style={{marginRight:5}}>Listview</Typography>
              <ViewListIcon/>
            </Button>
          </Grid>
          <Grid item lg={2} md={2} sm={2} xs={3}>
            <Button onClick={()=>setView('thumb')}>
              <Typography style={{marginRight:5}}>Thumbview</Typography>
              <AppsIcon/>
              
            </Button>
          </Grid>
        </Grid>
        )
    }

    const renderProductList = () => {
        if(view === 'list'){
            return (
                <ProductTable 
                    by={by}
                    direction={direction}
                    handleSort={handleSort}
                    onRowSelect={handleSelectItem}
                    data={data}
                />
            )  
        }
        return <ProductThumb data={data} handleSelect={handleSelectItem}/>
      }

    //---------------------------------- MAIN RENDER -----------------------//
    return (
        <Box component="fieldset" mb={2} borderColor="transparent">
          <Paper style={{ boxShadow:'none'}}>
              {renderViewSelection()}
              {renderProductList()}
             
          </Paper>
          
      </Box>
    )
}

export default index
