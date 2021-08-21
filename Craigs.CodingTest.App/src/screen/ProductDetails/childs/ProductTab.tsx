import React from 'react';
import PropTypes from 'prop-types';
import {AppBar, Tabs, Tab, Box, Paper } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import StoreIcon from '@material-ui/icons/Store';
import {IProductDetails} from "../../../_interfaces/product";
import PanelDetail from "./PanelDetail";
import PanelStore from "./PanelStore";

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

  // -------------------- main components ------------------------------------//
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
    return (
      <TabPanel value={value} index={0}>
        <PanelDetail/>
      </TabPanel>
    )
  }

  const renderStockInfo = () => {
      return (
        <TabPanel value={value} index={1}>
          <PanelStore/>
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
