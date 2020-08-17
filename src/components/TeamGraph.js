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
        fetch('http://localhost:5000/api/stats/' + props.year + '/' + team)
            .then(result => result.json())
            .then(data => setData(data[0]))
            .catch(error => console.log(error))
    }, [props.year, team])

    useEffect(() => {
        props.setTeam(team)
    }, [team])

    useEffect(() => {
        props.setYear(year)
    },[])

    return (
        <div id="graph_container">
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