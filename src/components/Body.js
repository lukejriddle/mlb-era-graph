import React, { useState, useEffect } from 'react'

import LeagueGraph from './LeagueGraph'
import TeamGraph from './TeamGraph'
import GraphNav from './GraphNav'

import './Body.css'
import Switch from 'react-bootstrap/esm/Switch'
import { Route, useHistory } from 'react-router-dom'

import { getActiveTeams, getAllYears } from '../helpers/dataUtil'

function Body() {
    const date = new Date()
    const history = useHistory()

    const [year, setYear] = useState(date.getFullYear())
    const [team, setTeam] = useState('League')
    const [activeTeams, setActiveTeams] = useState([])
    const [activeYears, setActiveYears] = useState(getAllYears())

    useEffect(() => {
        fetch('https://mlb-era-graph.com/api/stats/league_stats/' + year)
            .then(result => result.json())
            .then(data => setActiveTeams(getActiveTeams(data[0])))
            .catch(error => console.log(error))
        
    },[year])

    useEffect(() => {
        if (team.localeCompare('League') == 0 || history.location.pathname.includes(team)) {
            return
        } else {
            history.push('/' + year + '/' + team)
        }

        if (team.localeCompare('League') == 0) {
            setActiveYears(getAllYears())
        }
    }, [team])

    return (
        <div className="body">
                <div className="outer" id="sideMenu">
                    <GraphNav year={year} team={team} activeTeams={activeTeams} activeYears={activeYears} setYear={setYear} setTeam={setTeam}/>
                </div>
                <div className="inner">
                    <Switch>
                        <Route path='/' render={() => <LeagueGraph setTeam={setTeam} year={year}/>} exact/>
                        <Route path='/:year/:team' render={() => <TeamGraph setTeam={setTeam} setYear={setYear} setActiveYears={setActiveYears} year={year}/>} />
                    </Switch>
                </div>
                <div className="outer" />
        </div>
    )
}

export default Body