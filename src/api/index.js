import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';
const indiaURL = 'https://api.rootnet.in/covid19-in/stats/latest';
const statesDailyData = 'https://api.covid19india.org/data.json';
let statesData = [];
let alldata = {};
export const fetchData = async (country) => {
    let changableURL = url;
    if (country) {
        changableURL = `${url}/countries/${country}`;
    }
    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changableURL);
        return { confirmed, recovered, deaths, lastUpdate };
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            active: dailyData.confirmed.total - dailyData.deaths.total,
            date: dailyData.reportDate,
        }));

        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyStatesData = async () => {
    try {
        const { data: { cases_time_series } } = await axios.get(statesDailyData);
        const modifiedData = cases_time_series.map((dailyData) => ({
            confirmed: dailyData.totalconfirmed,
            deaths: dailyData.totaldeceased,
            recovered: dailyData.totalrecovered,
            active: dailyData.totalconfirmed - (dailyData.totaldeceased + dailyData.totalrecovered),
            date: dailyData.date,
        }));
        return modifiedData;
    } catch (error) {
        console.log("Caught error in fetchStatesdata");
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    } catch (error) {
        console.log(error);
    }
}

export const fetchStates = async () => {
    try {
        alldata = await axios.get(indiaURL);

        statesData = alldata.data.data.regional;
        return statesData.map((region) => region.loc);
    } catch (error) {

    }
}

export const fetchStatesdata = async (state) => {
    try {
        if (state) {
            for (var counter = 0; counter < statesData.length; counter++) {
                if (statesData[counter].loc === state) {
                    return statesData[counter];
                }
            }
        }
        else {
            if (Object.keys(alldata).length === 0) {
                fetchStates();
            }
            return alldata.data.data.summary;
        }
    } catch (error) {
    }

}