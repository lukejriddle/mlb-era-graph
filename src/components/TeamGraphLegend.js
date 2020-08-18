import React from 'react'

function TeamGraphLegend() {
    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <svg style={{width:'80%', height:'30px', overflow:'visible'}}>
                <rect style={{fill:'rgb(0,100,0)', height:"14px", width:'14px'}}/>
                <text fontFamily="Courier New" alignmentBaseline="top" x={16} y={12} style={{fill:'black', height:"20%", width:'20%'}}>Starter</text>
            </svg>

            <svg style={{width:'80%', height:'30px', overflow:'visible'}}>
                <rect style={{fill:'rgb(0,99,166)', height:"14px", width:'14px'}}/>
                <text fontFamily="Courier New" alignmentBaseline="top" x={16} y={12} style={{fill:'black', height:"20%", width:'20%'}}>Reliever</text>
            </svg>

            <svg style={{width:'80%', height:'30px', overflow:'visible'}}>
                <defs>
                    <linearGradient spreadMethod="pad" id="gradientStarter" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{'stop-color':'rgba(0, 100, 0, .1)', 'stop-opacity':1}} />
                        <stop offset="50%" style={{'stop-color':'rgba(0, 100, 0, .4)', 'stop-opacity':1}} />
                        <stop offset="100%" style={{'stop-color':'rgb(0, 100, 0)', 'stop-opacity':1}} />
                    </linearGradient>
                    <linearGradient spreadMethod="pad" id="gradientReliever" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{'stop-color':'rgba(0, 99, 166, .1)', 'stop-opacity':1}} />
                        <stop offset="50%" style={{'stop-color':'rgba(0, 99, 166, .4)', 'stop-opacity':1}} />
                        <stop offset="100%" style={{'stop-color':'rgb(0, 99, 166)', 'stop-opacity':1}} />
                    </linearGradient>
                </defs>
                <rect width="100%" height="14px" y="0" x="0" fill="url(#gradientStarter)"/> 
                <rect width="100%" height="14px" y="16" x="0" fill="url(#gradientReliever)"/> 
                <text fontFamily="Courier New" y={50}># Innings</text>
            </svg>
        </div>
    )
}

export default TeamGraphLegend