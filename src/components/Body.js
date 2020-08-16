import React, { useState } from 'react'

import LeagueGraph from './LeagueGraph'
import TeamGraph from './TeamGraph'
import GraphNav from './GraphNav'

import './Body.css'
import Switch from 'react-bootstrap/esm/Switch'
import { Route } from 'react-router-dom'

function Body() {
    const date = new Date()

    const [year, setYear] = useState(date.getFullYear())

    function updateYear(year) {
        setYear(year)
    }

    return (
        <div className="body">
                <div className="outer" id="sideMenu">
                    <GraphNav year={year} updateYear={updateYear}/>
                </div>
                <div className="inner">
                    <Switch>
                        <Route path='/' render={() => <LeagueGraph year={year}/>} exact/>
                        <Route path='/:year/:team' render={() => <TeamGraph year={year}/>} />
                    </Switch>
                </div>
                <div className="outer" />
        </div>
    )
}

export default Body