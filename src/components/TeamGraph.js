import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import BackButton from './BackButton'

function TeamGraph(props) {
    let { team } = useParams()
    const history = useHistory()

    useEffect(() => {
        let newPath = '/' + props.year + '/' + team
        console.log('new path: ' + newPath)
        if(newPath.localeCompare(history.location.pathname) != 0) {
            history.push('/' + props.year + '/' + team)
        }
    }, [props.year])

    useEffect(() => {
        props.setTeam(team)
    }, [team])

    return (
        <div id="graph_container">
            <div id="graphOuter">
                <BackButton />
            </div>
            <div id="graph"/>
            <div id="graphOuter"/>
        </div>
    )
}

export default TeamGraph