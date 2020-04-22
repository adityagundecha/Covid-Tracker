import React from 'react'
import { FullWidthTabs } from './components'
import styles from "./App.module.css"
import coronaImage from './images/corona.png'

class App extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19" />
                <FullWidthTabs />
            </div>
        );
    }
}

export default App;