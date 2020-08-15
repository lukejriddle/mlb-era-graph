import React, { useState } from 'react'

import Graph from './Graph'
import GraphNav from './GraphNav'

import './Body.css'

function Body() {
    const date = new Date()

    const [year, setYear] = useState(date.getFullYear())

    function updateYear(year) {
        setYear(year)
    }

    return (
        <div className="body">
            <div className="outer" />
            <Graph year={year}/>
            <div className="outer">
                <GraphNav year={year} updateYear={updateYear}/>
            </div>
        </div>
    )
}

export default Body