function parseData(data) {
    let playerData = data.player_stats
    for (let key in playerData) {
        let player = playerData[key]
        player.label = player.name + "\nERA: " + player.era + "\nIP: " + player.ip
    }
    return playerData
}

function getMaxIp(data) {
    let maxStarter = 0
    let maxReliever = 0
    let playerData = data.player_stats
    for (let key in playerData) {
        let ip = playerData[key].ip
        let pos = playerData[key].pos
        if (ip > maxStarter && pos === "Starter") {
            maxStarter = ip
        }
        if (ip > maxReliever && pos !== "Starter")
            maxReliever = ip
        }
    return {'starter': maxStarter, 'reliever': maxReliever}
}

export {
    parseData,
    getMaxIp
}