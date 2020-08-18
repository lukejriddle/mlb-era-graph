import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { parseData, getMaxIp } from '../helpers/teamGraph/dataUtil'

import BackButton from './BackButton'
import TeamGraphLegend from './TeamGraphLegend'

import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, ZAxis, Cell, Label, ReferenceLine, ResponsiveContainer, Legend } from 'recharts'
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
            let posColor = e.payload[0].payload.pos === 'Starter' ? 'rgb(0,100,0)' : 'rgb(0,99,166)'

            const newPayload = [
                {
                    value: e.payload[0].payload.pos,
                    color: posColor
                },
                {
                    name: 'innings',
                    value: e.payload[0].payload.ip,
                    color: '#777'
                },
                ...e.payload
            ]
            
            return <DefaultTooltipContent {...e} payload={newPayload}/>
        }
    }

    const customLabel = (props) => {
        console.log(JSON.stringify(props))
        let rotate = `rotate(-30,${props.x},${props.y})`
        let translate = `translate(${props.x},${props.y+5})`
        return <text fontFamily="Courier New" fill="black" textAnchor="end" alignmentBaseline="middle" transform={`${rotate} ${translate}`}>{playerData[props.index].name}</text>
    }

    return (
        <div id="graphContainer">
            <div className="graphOuter">
                <BackButton />
            </div>
            <div id="graph" className="mb-4">
                <ResponsiveContainer>
                    <BarChart data={playerData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                        <XAxis interval={0} dataKey="name" tick={customLabel} />
                        <YAxis dataKey="era" label={<Label value="earned run avg" angle={-90} dx={-20}/>}/>
                        <Tooltip content={getContent} cursor={{fill: 'rgba(50,50,50,0.1'}}/>
                        <Bar dataKey="era">
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
                <div className="imageContainer d-flex flex-column align-items-center">
                    <div className="graphImageNav">
                        <img className="teamLogo" src={data.url} width={"100vw"} height={"100vw"}/>
                        <text className="h5">{year}</text>
                        <TeamGraphLegend />
                    </div>
                    <div className="arrangementNav">
                        <i style={{fontSize: "12px"}}>In order of rank</i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamGraph
