import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchMyAPI = async () => {
            const initialData = await fetchDailyData();
            setDailyData(initialData);
        };
        fetchMyAPI();
    }, []);

    const lineChart = (
        dailyData.length ? (<Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: 'magenta',
                    backgroundColor: 'rgba(255,0,255,0.1)',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true,
                }, {
                    data: dailyData.map(({ active }) => active),
                    label: 'Active',
                    borderColor: 'black',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    fill: true,
                }],
            }}
        />) : null
    );


    const barChart = (
        confirmed ? (
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
                            data: [confirmed.value, recovered.value, deaths.value, confirmed],
                        },
                    ],
                }}
                options={{
                    legend: { display: true },
                    title: { display: true, text: `Current State in ${country}` },
                }}
            />

        ) : null
    )

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    );
};

export default Chart;