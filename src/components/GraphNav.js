import React from 'react'

import { Dropdown } from 'react-bootstrap'

function GraphNav(props) {
    const years = [...Array(51).keys()].map(i => i + 1970).reverse().map(function(year){
        return (
        <Dropdown.Item key={year} onClick={() => props.updateYear(year)}>{year}</Dropdown.Item>
        )
    })


    return (
        <div className="graphNav">
            <figure>
                <img src={"mmb.png"} height={"70vh"} width={"70vh"} alt={"scrollwheel"}/>
                <figcaption id="scroll">Zoom</figcaption>
            </figure>
            <Dropdown id="yearDropdown">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {props.year}
                </Dropdown.Toggle>

                {}

                <Dropdown.Menu>
                    {years}
                </Dropdown.Menu>
            </Dropdown>
            
        </div>
    )
}

export default GraphNav