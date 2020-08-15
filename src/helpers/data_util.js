function get_series(team_data) {
    var series = []

    for (let key in team_data['teams']) {
        var team = team_data.teams[key]
        var info = { 
            x: team.rotation_era, 
            y: team.bullpen_era, 
            url: team.url,
            label: `${team.name}: Rotation - ${team.rotation_era} | Bullpen - ${team.bullpen_era}`
        }
        series.push(info)
    }
    return series
}

function get_averages(team_data) {
    return {
        rotation_avg: team_data.rotation_avg,
        bullpen_avg: team_data.bullpen_avg
    }
}

function get_domain(team_data) {
    let x_max = _get_x_max(team_data)
    let y_max = _get_y_max(team_data)
    let x_min = _get_x_min(team_data)
    let y_min = _get_y_min(team_data)

    return {
        x: [x_min, x_max],
        y: [y_min, y_max]
    }
}

function _get_x_max(team_data) {
    let max = 0
    for (let key in team_data['teams']) {
        let team = team_data.teams[key]
        if (team.rotation_era > max) {
            max = team.rotation_era
        }
    }
    return Math.round(max) + 1
}

function _get_y_max(team_data) {
    let max = 0
    for (let key in team_data['teams']) {
        let team = team_data.teams[key]
        if (team.bullpen_era > max) {
            max = team.bullpen_era
        }
    }
    return Math.round(max) + 1
}

function _get_x_min(team_data) {
    let min = 9999
    for (let key in team_data['teams']) {
        let team = team_data.teams[key]
        if (team.rotation_era < min) {
            min = team.rotation_era
        }
    }
    return Math.round(min) - 1
}

function _get_y_min(team_data) {
    let min = 9999
    for (let key in team_data['teams']) {
        let team = team_data.teams[key]
        if (team.bullpen_era < min) {
            min = team.bullpen_era
        }
    }
    return Math.round(min) - 1
}

module.exports = {
    get_series: get_series,
    get_domain: get_domain,
    get_averages: get_averages
}