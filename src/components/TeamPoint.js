import React from 'react'
import './Body.css'

class TeamPoint extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const initXDomain = this.props.domain.x
        const initExtent = Math.abs(initXDomain[1] - initXDomain[0])

        const {x, y, datum, scale} = this.props
        const xDomain = scale.x.domain();
        const xExtent = Math.abs(xDomain[1] - xDomain[0]);

        let size = Math.min(Math.max(initExtent/xExtent, 1.25), 3.5)
        const url = datum.url
        const image_width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * (size /  200)
        const image_height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * (size / 200)

        return (
            <image className="dataPoint" href={url} x={x - image_width} y={y - image_height} width={size + "vw"} height={size + "vh"}/>
        )
    }
}

export default TeamPoint