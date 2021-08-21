import React, {useState} from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    Paper,
} from "@material-ui/core";
import Loading from "../../../components/Loading";
import { Product } from "../../../_interfaces/product";
interface IProps {
    data: Product[],
    by: string,
    direction: string,
    handleSort: (id: string) => void;
    onRowSelect: (id: number) => void;
}

type Align = "left" | "right" | "center";
interface Header {
    id: string,
    label: string,
    align: Align,
    sortable: boolean,
}

const initHeader: Header[] = [
  { id: "productName",label: "Product Name", align: "left",sortable: true},
  { id: "listPrice", label: "Price", align: "right", sortable: true },
  { id: "modelYear", label: "Year", align: "right", sortable: true },
  { id: "brand.brandName", label: "Brand", align: "left", sortable: true },
  { id: "category.categoryName", label: "Catgory", align: "left", sortable: true },
]

function ProductTable(props: IProps) {
  
  // -------------------- init ------------------------------------//

  const [header, setHeader] = useState<Header[]>(initHeader);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const { data, by, direction, handleSort, onRowSelect } = props;
  const loading = data?.length > 0;


  // -------------------- handling functions ------------------------------------//
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
  };
  
  const handleChangeRowsPerPage = ( event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };

  // -------------------- render components ------------------------------------//
  const renderTableHead = () => {
      const disabled = !(data?.length > 0);
      return (
        <TableHead style={{backgroundColor:'black'}}>
          <TableRow >
            {header?.map((headCell) => {
                return(
                  <TableCell
                    key={headCell.id}
                    align={headCell.align}
                    padding="normal"
                  >
                    {renderTableSortLabel(headCell, disabled)}
                  </TableCell>
                )
            })}
          </TableRow>
        </TableHead>
      );
  };

  const renderTableSortLabel = (headCell: any, disabled: boolean) => {
      if (headCell.sortable) {
        return (
          <TableSortLabel
            disabled={disabled}
            active={by === headCell.id}
            onClick={() => handleSort(headCell.id)}
          >
            {headCell.label}
          </TableSortLabel>
        );
      }
      return headCell.label;
    };
  
  const renderTableBody = () => {
    const length = data?.length || 0;
    let dataRows: Product[] = [];
    if (length > 1) {
      dataRows = data?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    }

    return (
      <TableBody>
        {dataRows?.map((row, index) => renderTableRow(row, index))}
      </TableBody>
    );

  };
  
  const renderTableRow = ( row: Product, index: number ) => {
      return (
        <TableRow
          hover
          tabIndex={-1}
          key={index}
          style={{ cursor: "pointer" }}
          onClick={() => onRowSelect(row?.productId)}
        >
          <TableCell align="left">{row?.productName}</TableCell>
          <TableCell align="right">${row?.listPrice || 0}</TableCell>
          <TableCell align="right">{row?.modelYear}</TableCell>
          <TableCell align="left">{row?.brand?.brandName}</TableCell>
          <TableCell align="left">{row?.category?.categoryName}</TableCell>
        </TableRow>
      );
  };

  const renderTableFooter = () => {
      const { data } = props;
      const length = data?.length;
      if (length > 1) {
        return (
          <TablePagination
            rowsPerPageOptions={[10, 20, 50, 100]}
            component="div"
            count={length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        );
      }
      return null;
    };
  
  // -------------------- render main ------------------------------------//
  return (
    <div style={{ width: "100%", marginTop: 10, marginBottom: 30 }}>
        <TableContainer component={Paper}>
            <Table stickyHeader={true} aria-label="sticky table">
                {renderTableHead()}
                {renderTableBody()} 
            </Table>
        </TableContainer>
        {renderTableFooter()}
        <Loading loading={!loading} />
    </div>
  )
}

export default ProductTable
