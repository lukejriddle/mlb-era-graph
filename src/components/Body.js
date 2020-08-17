import React, { useState, useEffect } from 'react'

import LeagueGraph from './LeagueGraph'
import TeamGraph from './TeamGraph'
import GraphNav from './GraphNav'

import './Body.css'
import Switch from 'react-bootstrap/esm/Switch'
import { Route, useHistory } from 'react-router-dom'

import { get_active_teams } from '../helpers/data_util'

function Body() {
    const date = new Date()
    const history = useHistory()

    const [year, setYear] = useState(date.getFullYear())
    const [team, setTeam] = useState('League')
    const [activeTeams, setActiveTeams] = useState([])

    useEffect(() => {
        fetch('https://mlb-era-graph.com/api/stats/league/' + year)
            .then(result => result.json())
            .then(data => setActiveTeams(get_active_teams(data[0])))
            .catch(error => console.log(error))
        
    },[year])

    useEffect(() => {
        if (team.localeCompare('League') == 0 || history.location.pathname.includes(team)) {
            return
        } else {
            history.push('/' + year + '/' + team)
        }
    }, [team])


    function updateYear(year) {
        setYear(year)
    }

    function updateTeam(team) {
        setTeam(team)
    }

    return (
        <div className="body">
                <div className="outer" id="sideMenu">
                    <GraphNav year={year} team={team} activeTeams={activeTeams} updateYear={updateYear} updateTeam={updateTeam}/>
                </div>
                <div className="inner">
                    <Switch>
                        <Route path='/' render={() => <LeagueGraph setTeam={setTeam} year={year}/>} exact/>
                        <Route path='/:year/:team' render={() => <TeamGraph setTeam={setTeam} year={year}/>} />
                    </Switch>
                </div>
                <div className="outer" />
        </div>
    )
}

export default Body