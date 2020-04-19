import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl, } from '@material-ui/core';
import styles from './CountryPicker.module.css';
import { fetchCountries } from '../../api';
import InputLabel from '@material-ui/core/InputLabel';

const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountry, setFetchedCountry] = useState([]);

    useEffect(() => {
        const FetchAPI = async () => {
            setFetchedCountry(await fetchCountries());
        }

        FetchAPI();
    }, [setFetchedCountry]);

    return (

        <FormControl variant="outlined" className={styles.FormControl}>
            <InputLabel shrink className={styles.InputLabel} >Select Country from dropdown</InputLabel>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountry.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>

    );
}

export default CountryPicker;