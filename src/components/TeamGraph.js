import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { parseData, getMaxIp } from '../helpers/teamGraph/dataUtil'

import BackButton from './BackButton'

import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, ZAxis, Cell, Label, LabelList, ResponsiveContainer } from 'recharts'
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent'

function TeamGraph(props) {
    let { team, year } = useParams()
    const history = useHistory()

    const [data, setData] = useState([])
    const [playerData, setPlayerData] = useState([])
    const [maxIp, setMaxIp] = useState([])

    useEffect(() => {
        let newPath = '/' + props.year + '/' + team
        if(newPath.localeCompare(history.location.pathname) != 0) {
            history.push('/' + props.year + '/' + team)
        }
    }, [props.year])

    useEffect(() => {
        fetch('https://mlb-era-graph.com/api/stats/team_stats/' + props.year + '/' + team)
            .then(result => result.json())
            .then(data => {
                setData(data[0])
                setPlayerData(parseData(data[0]))
            })
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
        setMaxIp(getMaxIp(data))
    }, [data])

    useEffect(() => {
        props.setYear(year)
    },[])

    function getContent(e) {
        if(e !=  null && e.payload !=  null && e.payload[0] != null) {
            const newPayload = [
                {
                    name: 'innings',
                    value: e.payload[0].payload.ip,
                    color: '#04c'
                },
                ...e.payload
            ]
            
            return <DefaultTooltipContent {...e} payload={newPayload}/>
        }
    }

    return (
        <div id="graphContainer">
            <div className="graphOuter">
                <BackButton />
            </div>
            <div id="graph">
                <ResponsiveContainer>
                    <BarChart data={playerData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={false} label={"Players"} />
                        <YAxis dataKey="era"/>
                        <ZAxis dataKey="ip"/>
                        <Tooltip content={getContent} cursor={{fill: 'rgba(50,50,50,0.1'}}/>
                        <Bar dataKey="era">
                            {/* <LabelList dataKey="name" position="top" color="#000" angle="270"/> */}
                            {playerData.map((entry, index) => {
                                let opacity = entry.pos === "Starter" ? entry.ip/maxIp.starter : entry.ip/maxIp.reliever
                                return(
                                    <Cell fill={entry.pos === "Starter" ? 'rgba(0,100,0,'+ opacity +')' : 'rgba(0,99,166,' + opacity + ')' }/>
                                )
                            })}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="graphOuter">
                <img className="teamLogo" src={data.url} width={"100vw"} height={"100vw"}/>
            </div>
        </div>
    )
}

export default TeamGraph
