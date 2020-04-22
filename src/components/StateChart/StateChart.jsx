import React, { useState, useEffect } from 'react';
import { fetchDailyStatesData, fetchStatesdata } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './StateChart.module.css';


const StateChart = ({ chartData }, { state1 }) => {
    if (chartData) state1 = chartData.loc;
    const [dailyData, setDailyData] = useState([]);
    const [stateData, setStateData] = useState([]);

    useEffect(() => {

        const fetchMyAPI = async () => {
            const initialData = await fetchDailyStatesData();
            setDailyData(initialData);
            console.log(`Daily Data -> ${JSON.stringify(initialData)}`)
            // console.log(`State1 -> ${JSON.stringify(state1)}`)

            const fetchedStateData = await fetchStatesdata(state1);
            setStateData(fetchedStateData);
        };
        fetchMyAPI();
    }, [state1, stateData]);

    const lineChart = (
        dailyData.length ? (<Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [
                    {
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255,0,0,0.5)',
                        fill: true,
                    },
                    {
                        data: dailyData.map(({ recovered }) => recovered),
                        label: 'Recovered',
                        borderColor: 'red',
                        backgroundColor: 'rgba(0,250,0,0.5)',
                        fill: true,
                    },
                ],
            }}
        />) : null

    );


    const barChart = (
        stateData ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [
                        {
                            label: 'People',
                            backgroundColor: [
                                'rgba(0,0,255,0.5)',
                                'rgba(0,255,0,0.5)',
                                'rgba(255,0,0,0.5)',
                            ],
                            data: [stateData.confirmedCasesIndian, stateData.discharged, stateData.deaths], //chartData.confirmedCasesIndian, chartData.recovered, chartData.deaths
                        },
                    ],
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current State in ${JSON.stringify(state1)}` },
                }}
            />

        ) : null
    )

    return (
        <div className={styles.container}>
            {state1 ? barChart : lineChart}
        </div>
    );
};

export default StateChart;