import React from 'react'

class TeamPoint extends React.Component {
    render() {
        const {x, y, datum, scale} = this.props
        const url = datum.url
        
        const xDomain = scale.x.domain();
        const xExtent = Math.abs(xDomain[1] - xDomain[0]);

        let size = Math.min(10/xExtent, 3.5)

        const image_width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * (size /  200)
        const image_height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * (size / 200)

        return (
            <image href={url} x={x - image_width} y={y - image_height} width={size + "vw"} height={size + "vh"}/>
        )
    }
}

export default TeamPoint