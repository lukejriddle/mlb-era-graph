import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

function TeamGraph(props) {
    let { team } = useParams()
    const history = useHistory()

    useEffect(() => {
        let newPath = '/' + props.year + '/' + team
        if(newPath.localeCompare(history.location.pathname) != 0) {
            history.push('/' + props.year + '/' + team)
        }
    }, [props.year])

    return (
        <div>
            TEAMGRAPH + {team} + {props.year}
        </div>
    )
}

export default TeamGraph