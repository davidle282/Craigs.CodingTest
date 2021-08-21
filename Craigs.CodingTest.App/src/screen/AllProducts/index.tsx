import React, { useState, useEffect } from "react";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux"
import { bindActionCreators } from "redux";
import { Box, Paper, Grid } from "@material-ui/core";
import { actionCreators, RootState} from "../../_redux/index";

import {Product} from "../../_interfaces/product";

import ProductTable from "./childs/ProductTable";

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

    const dispatch = useDispatch();
    const { getProductList } = bindActionCreators(actionCreators, dispatch);
    const productList = useSelector((state: RootState )=> state.product.productList);
    const [data, setData] = useState<IState['data']>([]);
    const [by, setBy] = useState('');
    const [direction, setDirection] = useState<IState['direction']>('asc');


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

    const renderProductList = () => {
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

    //---------------------------------- MAIN RENDER -----------------------//
    return (
        <Box component="fieldset" mb={2} borderColor="transparent">
          <Paper style={{ boxShadow:'none'}}>
             
              {renderProductList()}
             
          </Paper>
          
      </Box>
    )
}

export default index
