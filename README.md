Inspired by [this](https://www.reddit.com/r/baseball/comments/in3421/team_relief_era_vs_starter_era/) reddit post. 

This website plots every team in the MLB's bullpen era against their rotation era. Teams closer to the origin have better pitching.

### Development
This project was made using the MERN stack - MongoDB, Express.js, React.js, Node.js. It also incorporates a Python script that scrapes baseball-reference.com for the necessary data to create the chart. The charting library used is [recharts](https://recharts.org/en-US/).

The initial script for scraping (back to 1970) is included, as well as a daily script that is run every 24h to keep the current season up-to-date. This script is only live between the months of March and November due to baseball's off-season.

### Team Data
Selecting an individual team will graph that team's pitchers and their respective ERAs, color coded based on whether they are a starter or a reliever. Starter/reliever data is based solely on the data from baseball-reference.com - oftentimes a starter who has just been moved to the reliever role will not be updated as such until his 4th or 5th appearance as a reliever.

Team logos are stored as a url as scraped from baseball-reference.
