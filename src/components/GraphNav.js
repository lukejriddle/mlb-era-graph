import React from 'react'

import { Dropdown } from 'react-bootstrap'

function GraphNav(props) {
    const years = [...Array(51).keys()].map(i => i + 1970).reverse().map(function(year){
        return (
            <Dropdown.Item key={year} onClick={() => props.updateYear(year)}>{year}</Dropdown.Item>
        )
    })

    const teams = props.activeTeams.map(function(team){
        return (
            <Dropdown.Item key={team} onClick={() => props.updateTeam(team)}>{team}</Dropdown.Item>
        )
    })


    return (
        <div className="graphNav">
            <span className="h5">Year</span>
            <Dropdown id="yearDropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {props.year}
                </Dropdown.Toggle>

                {}

                <Dropdown.Menu>
                    {years}
                </Dropdown.Menu>
            </Dropdown>

            <span className="h5">Team</span>
            <Dropdown id="teamDropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {props.team}
                </Dropdown.Toggle>

                {}

                <Dropdown.Menu>
                    {teams}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default GraphNav