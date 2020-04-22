import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl, } from '@material-ui/core';
import styles from './StatePicker.module.css';
import { fetchStates } from '../../api';
import InputLabel from '@material-ui/core/InputLabel';

const StatePicker = ({ handleStateChange }) => {
    const [fetchedState, setFetchedState] = useState([]);

    useEffect(() => {
        const FetchAPI = async () => {
            setFetchedState(await fetchStates());
        }

        FetchAPI();
    }, [setFetchedState]);

    return (

        <FormControl variant="outlined" className={styles.FormControl}>
            <InputLabel shrink className={styles.InputLabel} >Select State from dropdown</InputLabel>
            <NativeSelect defaultValue="" onChange={(e) => handleStateChange(e.target.value)}>
                <option value="">Overall India Data</option>
                {fetchedState.map((state, i) => <option key={i} value={state}> {state} </option>)}
            </NativeSelect>
        </FormControl>

    );
}

export default StatePicker;