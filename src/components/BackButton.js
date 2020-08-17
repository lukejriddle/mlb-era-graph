import React from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'

function BackButton() {
    return (
        <div id="backbuttonDiv">
            <Link id="backbutton" to="/">
                <ArrowLeft size={32}/>
            </Link>
        </div>
    )
}

export default BackButton