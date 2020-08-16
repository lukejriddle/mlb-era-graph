import React from 'react'
import LeagueGraph from '../components/LeagueGraph'
import TeamGraph from '../components/TeamGraph'

const routes = {
    "/": () => (year) => <LeagueGraph year={year} />,
    "/:year/:team": ({team}) => (year) => <TeamGraph year={year} team={team} />
}

export default routes