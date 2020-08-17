function getSeries(team_data) {
    var series = []

    for (let key in team_data['teams']) {
        var team = team_data.teams[key]
        var info = { 
            x: team.rotation_era, 
            y: team.bullpen_era, 
            url: team.url,
            label: `${team.name} - Rotation: ${team.rotation_era} | Bullpen: ${team.bullpen_era}`,
            team_name: team.name
        }
        series.push(info)
    }
    return series
}

function getAverages(team_data) {
    return {
        rotation_avg: team_data.rotation_avg,
        bullpen_avg: team_data.bullpen_avg
    }
}

function getDomain(team_data) {
    let x_max = _getXMax(team_data)
    let y_max = _getYMax(team_data)
    let x_min = _getXMin(team_data)
    let y_min = _getYMin(team_data)

    return {
        x: [x_min, x_max],
        y: [y_min, y_max]
    }
}

function _getXMax(team_data) {
    let max = 0
    for (let key in team_data['teams']) {
        let team = team_data.teams[key]
        if (team.rotation_era > max) {
            max = team.rotation_era
        }
    }
    if(Math.ceil(max) - max > .5) {
        return Math.ceil(max)
    }
    
    return Math.ceil(max) + .25
}

function _getYMax(team_data) {
    let max = 0
    for (let key in team_data['teams']) {
        let team = team_data.teams[key]
        if (team.bullpen_era > max) {
            max = team.bullpen_era
        }
    }
    if(Math.ceil(max) - max > .5) {
        return Math.ceil(max)
    }

    return Math.ceil(max) + .25
}

function _getXMin(team_data) {
    let min = 9999
    for (let key in team_data['teams']) {
        let team = team_data.teams[key]
        if (team.rotation_era < min) {
            min = team.rotation_era
        }
    }
    if (min - Math.floor(min) > .5) {
        return Math.floor(min)
    } 
    return Math.floor(min) - .25
}

function _getYMin(team_data) {
    let min = 9999
    for (let key in team_data['teams']) {
        let team = team_data.teams[key]
        if (team.bullpen_era < min) {
            min = team.bullpen_era
        }
    }
    if (min - Math.floor(min) > .5) {
        return Math.floor(min)
    } 
    return Math.floor(min) - .25
}

function getActiveTeams(team_data) {
    var teams = []
    for (let key in team_data['teams']) {
        teams.push(team_data.teams[key].name)
    }

    return teams.sort()
}

function getAllYears() {
    return [...Array(51).keys()].map(i => i + 1970).reverse()
}

export {
    getSeries,
    getDomain,
    getAverages,
    getActiveTeams,
    getAllYears
}