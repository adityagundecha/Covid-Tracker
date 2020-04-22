import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import cx from 'classnames';
import CountUp from 'react-countup';
import styles from './StateCards.module.css';


const StateCards = ({ stateData }) => {
    if (!stateData) {
        return 'Loading....';
    }
    if (stateData.confirmedCasesIndian) {
        stateData.totalConfirmed = stateData.confirmedCasesIndian + stateData.confirmedCasesForeign;
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={stateData.totalConfirmed} duration={2.5} separator="," />
                        </Typography>
                        <Typography color="textSecondary">{new Date().toDateString()}</Typography>
                        <Typography variant="body2">Number of active cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={stateData.discharged} duration={2.5} separator="," />
                        </Typography>
                        <Typography color="textSecondary">{new Date().toDateString()}</Typography>
                        <Typography variant="body2">Number of recovered cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={stateData.deaths} duration={2.5} separator="," />
                        </Typography>
                        <Typography color="textSecondary">{new Date().toDateString()}</Typography>
                        <Typography variant="body2">Number of deaths caused by COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    );
}

export default StateCards;