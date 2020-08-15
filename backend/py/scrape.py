import requests
from bs4 import BeautifulSoup as bsoup
from bs4 import Comment
import pandas as pd
import time

def get_data(year):
    teams = get_teams(year)
    team_data = []

    for team in teams:
        team_data.append(get_team_data(year, team))
        time.sleep(.5)

    rotation_era_sum = 0
    bullpen_era_sum = 0

    for datum in team_data:
        rotation_era_sum += datum['rotation_era']
        bullpen_era_sum += datum['bullpen_era']

    average_rotation_era = round(rotation_era_sum / len(teams), 2)
    average_bullpen_era = round(bullpen_era_sum / len(teams), 2)

    return team_data, average_rotation_era, average_bullpen_era

def get_team_data(year, team):
    data = {}
    data['starting_era_sum'] = 0.0
    data['bullpen_era_sum'] = 0.0
    data['starting_pitchers'] = 0
    data['bullpen_pitchers'] = 0

    players, url, team_name = get_players_data(year, team)

    for player in players:
        if player.find('td', {'data-stat':'pos'}) == None\
            or player.find('td', {'data-stat':'earned_run_avg'}).text == ''\
            or player.find('td', {'data-stat':'earned_run_avg'}).text == 'inf':
            continue
        
        pos = player.find('td', {'data-stat':'pos'}).text
        era = float(player.find('td', {'data-stat':'earned_run_avg'}).text)

        if pos == 'SP':
            data['starting_era_sum'] = data.get('starting_era_sum') + era
            data['starting_pitchers'] = data.get('starting_pitchers') + 1
        else:
            data['bullpen_era_sum'] = data.get('bullpen_era_sum') + era
            data['bullpen_pitchers'] = data.get('bullpen_pitchers') + 1

    average_starting_era = round(data.get('starting_era_sum') / data.get('starting_pitchers'), 2)
    average_bullpen_era = round(data.get('bullpen_era_sum') / data.get('bullpen_pitchers'), 2)

    return {'name':team, 'rotation_era':average_starting_era, 'bullpen_era': average_bullpen_era, 'url': url, 'team_name': team_name} 

def get_players_data(year, team):
    URL = 'https://www.baseball-reference.com/teams/' + str(team) + '/' + str(year) + '.shtml'
    page = requests.get(URL)

    soup_object = bsoup(page.content, 'html.parser')

    players = soup_object.findAll('table', {'id':'team_pitching'})[0].find('tbody').findAll('tr')
    url = soup_object.findAll('img', {'class': 'teamlogo'})[0]['src']
    team_name = soup_object.findAll('h1', {'itemprop': 'name'})[0].findAll('span')[1].text

    return players, url, team_name



def get_teams(year):
    teams = []

    URL = "https://www.baseball-reference.com/leagues/MLB/" + str(year) + ".shtml"
    page = requests.get(URL)

    soup_object = bsoup(page.content, 'html.parser')
    rows = soup_object.findAll('table', {'id':'teams_standard_batting'})[0].find('tbody').findAll('tr')

    for row in rows:
        team = row.find('th', {'data-stat': 'team_ID'}).text
        if len(team) == 3:
            teams.append(team)

    return teams
    
def scrape(year):
    return get_data(year)


