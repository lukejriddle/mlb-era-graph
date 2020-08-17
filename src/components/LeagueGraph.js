import React, { useState, useEffect } from 'react'
import { VictoryScatter, VictoryChart, VictoryTheme, VictoryAxis, VictoryLine, VictoryLabel, VictoryTooltip, createContainer, VictoryArea } from 'victory'

import { getSeries, getAverages, getDomain } from '../helpers/dataUtil'
import './Graph.css'
import TeamPoint from './TeamPoint'

function LeagueGraph(props) {
    const [data, setData] = useState({})
    const [series, setSeries] = useState([])
    const [averages, setAverages] = useState({})
    const [domain, setDomain] = useState({})

    useEffect(() => {
        fetch('https://mlb-era-graph.com/api/stats/league_stats/' + props.year)
            .then(result => result.json())
            .then(data => setData(data[0]))
            .catch(error => console.log(error))
    }, [props.year])

    useEffect(() => {
        setSeries(getSeries(data))
        setAverages(getAverages(data))
        setDomain(getDomain(data))
    }, [data])

    useEffect(() => {
        props.setTeam('League')
    }, [])

    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi")
    return (
        <div id="graphContainer">
            <div className="graphOuter" />
            <div id="graph">
                <VictoryChart
                    width={500}
                    height={400}
                    theme={VictoryTheme.material}
                    domain={domain}
                    containerComponent={<VictoryZoomVoronoiContainer/>}>
                    
                    <VictoryLine 
                        style={{
                            data: {stroke: 'grey', strokeDasharray: '3,3', strokeWidth: 1 },
                            labels: { angle: -90, fill: "grey", fontSize: 12 }
                        }}
                        labels={["Average: " + averages.rotation_avg]}
                        labelComponent={<VictoryLabel y={100}/>}
                        x={() => averages.rotation_avg} />

                    <VictoryLine 
                        style={{
                            data: {stroke: 'grey', strokeDasharray: '3,3', strokeWidth: 1 },
                            labels: { fill: "grey", fontSize: 10 }
                        }}
                        labels={["Average: " + averages.bullpen_avg]}
                        labelComponent={<VictoryLabel x={100}/>}
                        y={() => averages.bullpen_avg} />

                    
                    <VictoryAxis
                        label="Rotation ERA"
                        style={{
                        axisLabel: { padding: 30 }
                    }}
                    />
                    <VictoryAxis dependentAxis
                        label="Bullpen ERA"
                        y1={""}
                        style={{
                        axisLabel: { padding: 35 }
                    }}
                    />

                    <VictoryScatter 
                        style={{data: {fill: "#c43a31"}}} 
                        size={3} 
                        labelComponent={<VictoryTooltip dy={-10} />}
                        data={series}
                        dataComponent={<TeamPoint year={props.year} domain={domain}/>}
                        >
                    </VictoryScatter>
                </VictoryChart>
            </div>
            <div className="graphOuter">
                <figure id="scrollFigure">
                    <img src={"mmb.png"} height={"70vh"} width={"70vh"} alt={"scrollwheel"}/>
                    <figcaption id="scroll">Zoom</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default LeagueGraph
