import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import BackButton from './BackButton'

function TeamGraph(props) {
    let { team, year } = useParams()
    const history = useHistory()

    const [data, setData] = useState([])

    useEffect(() => {
        let newPath = '/' + props.year + '/' + team
        if(newPath.localeCompare(history.location.pathname) != 0) {
            history.push('/' + props.year + '/' + team)
        }
    }, [props.year])

    useEffect(() => {
        fetch('https://mlb-era-graph.com/api/stats/team_stats/' + props.year + '/' + team)
            .then(result => result.json())
            .then(data => setData(data[0]))
            .catch(error => console.log(error))
    }, [props.year, team])

    useEffect(() => {
        props.setTeam(team.toUpperCase())
        fetch('https://mlb-era-graph.com/api/stats/active_years/' + team)
            .then(result => result.json())
            .then(data => props.setActiveYears(data[0].years))
            .catch(error => console.log(error))
    }, [team])

    useEffect(() => {
        props.setYear(year)
    },[])

    return (
        <div id="graphContainer">
            <div id="graphOuter">
                <BackButton />
            </div>
            <div id="graph">
                {JSON.stringify(data)}
            </div>
            <div id="graphOuter"/>
        </div>
    )
}

export default TeamGraph
