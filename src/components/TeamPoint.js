import React from 'react'
import './Body.css'

function TeamPoint(props) {
    const initXDomain = props.domain.x
    const initExtent = Math.abs(initXDomain[1] - initXDomain[0])

    const {x, y, datum, scale} = props
    const xDomain = scale.x.domain();
    const xExtent = Math.abs(xDomain[1] - xDomain[0]);

    let size = Math.min(Math.max(initExtent/xExtent, 1), 2)
    const url = datum.url
    const imageWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * (size /  200)
    const imageHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * (size / 200)

    return (
        <image className="dataPoint" href={url} x={x} y={y} 
            width={size + "em"} height={size + "em"} 
            style={{transform: 'translate(-'+size/2 +"em,-" + size/2 + "em)"}}/>
    )
}

export default TeamPoint