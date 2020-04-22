import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { fetchData, fetchStatesdata } from '../../api'
import { Cards, Chart, CountryPicker, StatePicker, StateCards, StateChart } from '../'

import styles from './Tabs.module.css';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography component="div" role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={2}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};



const FullWidthTabs = () => {
    const [data, setData] = useState();
    const [stateData, setstateData] = useState();
    const [country, setCountry] = useState("");
    const [state1, setState1] = useState("");
    const [value, setValue] = useState(0);

    useEffect(() => {
        async function fetchDataFromAPI() {
            try {
                const fetchedData = await fetchData();
                setData(fetchedData);
                const fetchedStateData = await fetchStatesdata("");
                setstateData(fetchedStateData);
            } catch (error) {
                console.log(error)
            }
        };
        fetchDataFromAPI();
    }, []);

    const handleChange = async (event, newValue) => {
        setValue(newValue);
        const fetchedStateData = await fetchStatesdata("");
        setstateData(fetchedStateData);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        setData(fetchedData);
        setCountry(country);
    }
    const handleStateChange = async (state) => {
        const fetchedStateData = await fetchStatesdata(state);
        setstateData(fetchedStateData);
        setState1(state);
    }

    if (!data) {
        return 'Loading....'
    }
    return (
        <div>
            
            <AppBar position="static" color="inherit" className={styles.container}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth">
                    <Tab label="Global Data" />
                    <Tab label="India Data" />
                </Tabs>
            </AppBar >
            <SwipeableViews

                index={value}
                onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} className={styles.tabPanel}>
                    <CountryPicker handleCountryChange={handleCountryChange} />
                    <Cards data={data} />
                    <Chart data={data} country={country} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <StatePicker handleStateChange={handleStateChange} />
                    <StateCards stateData={stateData} />
                    <StateChart chartData={stateData} state1={state1} />
                </TabPanel>
            </SwipeableViews>
        </div>
    );
}

export default FullWidthTabs

