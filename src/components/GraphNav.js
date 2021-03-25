import React from 'react'

import { Dropdown } from 'react-bootstrap'

function GraphNav(props) {

    const numYears = new Date().getFullYear() - 1970 + 1;
    const yearList = props.team == "League" ? [...Array(numYears).keys()].map(i => i + 1970).reverse() : [...props.activeYears].reverse()

    const years = yearList.map(function(year){
        return (
            <Dropdown.Item key={year} onClick={() => props.setYear(year)}>{year}</Dropdown.Item>
        )
    })

    const teams = props.activeTeams.map(function(team){
        return (
            <Dropdown.Item key={team} onClick={() => props.setTeam(team)}>{team}</Dropdown.Item>
        )
    })


    return (
        <div className="graphNav">
            <span className="h5">Year</span>
            <Dropdown id="yearDropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {props.year}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {years}
                </Dropdown.Menu>
            </Dropdown>

            <span className="h5">Team</span>
            <Dropdown id="teamDropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {props.team}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {teams}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default GraphNav