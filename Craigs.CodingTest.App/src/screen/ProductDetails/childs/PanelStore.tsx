import React from 'react';
import { sumBy } from "lodash";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { RootState} from "../../../_redux/index";
import { IStock } from "../../../_interfaces/product";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function PanelStore() {

     // -------------------- init ------------------------------------//

    const classes = useStyles();
    const productDetails = useSelector((state: RootState )=> state.product.productDetails);
    const stocks = productDetails?.stocks;
    const inStock = sumBy(stocks, 'quantity');

     // -------------------- main component ------------------------------------//
    const renderTableBody = () => {
        return(
            <TableBody>
                {stocks.map((row, index) => (
                    renderTableRow(row, index)
                ))}
                <TableRow>
                    <TableCell colSpan={2}/>
                    <TableCell style={{fontWeight:'bold'}}>Total</TableCell>
                    <TableCell align="right"  style={{fontWeight:'bold'}}>{inStock}</TableCell>
                </TableRow>
            </TableBody>
        )
    }
    const renderTableRow = (row: IStock, index: number) => {
        const street = row?.store?.street;
        const state = row?.store?.state;
        const city = row?.store?.city;
        const address = `${street}, ${state}, ${city}`;
        return (
            <TableRow key={index}>
              <TableCell>{row?.store?.storeName}</TableCell>
              <TableCell align="left">{address}</TableCell>
              <TableCell align="left">{row?.store?.phone}</TableCell>
              <TableCell align="right">{row?.quantity}</TableCell>
            </TableRow>
        )
    }

    // -------------------- main render ------------------------------------//
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell>Store name</TableCell>
                        <TableCell align="left">Address</TableCell>
                        <TableCell align="left">Phone</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                    </TableRow>
                </TableHead>
                {renderTableBody()}
            </Table>
        </TableContainer>
    );
}
