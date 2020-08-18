import React from 'react'

function TeamGraphLegend() {
    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <svg style={{width:'80%', height:'30px', overflow:'visible'}}>
                <rect style={{fill:'rgb(0,100,0)', height:"14px", width:'14px'}}/>
                <text fontFamily="Courier New" alignmentBaseline="top" x={18} y={12} style={{fill:'black', height:"20%", width:'20%'}}>Starter</text>
            </svg>

            <svg style={{width:'80%', height:'30px', overflow:'visible'}}>
                <rect style={{fill:'rgb(0,99,166)', height:"14px", width:'14px'}}/>
                <text fontFamily="Courier New" alignmentBaseline="top" x={18} y={12} style={{fill:'black', height:"20%", width:'20%'}}>Reliever</text>
            </svg>

            <svg style={{width:'80%', height:'90px', overflow:'visible'}}>
                <defs>
                    <linearGradient spreadMethod="pad" id="gradientStarter" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" style={{'stop-color':'rgba(0, 100, 0, .1)', 'stop-opacity':1}} />
                        
                        <stop offset="100%" style={{'stop-color':'rgb(0, 100, 0)', 'stop-opacity':1}} />
                    </linearGradient>
                </defs>
                <rect width="14px" height="100%" y="0" x="0" fill="url(#gradientStarter)"/> 
                <text fontSize="14px" fontFamily="Courier New" y={12} x={18}>More innings</text>
                <text fontSize="14px" fontFamily="Courier New" y={26} x={18}>pitched</text>

                <text fontSize="14px" fontFamily="Courier New" y={76} x={18}>Fewer innings</text>
                <text fontSize="14px" fontFamily="Courier New" y={90} x={18}>pitched</text>
            </svg>
        </div>
    )
}

export default TeamGraphLegend