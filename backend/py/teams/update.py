import datetime
import time
import re
import requests
from bs4 import BeautifulSoup as bsoup
from bs4 import Comment
import pandas as pd
from mongo import save

YEAR = datetime.datetime.today().year

def get_data(year):
    teams = get_teams(year)

    for team in teams:
        data = get_team_data(year, team)
        save(team, year, data)
        time.sleep(.1)

def get_team_data(year, team):
    data = {}
    data['starting_er_sum'] = 0
    data['bullpen_er_sum'] = 0
    data['starting_ip'] = 0.0
    data['bullpen_ip'] = 0.0
    player_stats = []

    players, url, team_name = get_players_data(year, team)

    for player in players:
        if player.find('td', {'data-stat':'pos'}) == None\
            or player.find('td', {'data-stat':'earned_run_avg'}).text == ''\
            or player.find('td', {'data-stat':'earned_run_avg'}).text == 'inf'\
            or float(player.find('td', {'data-stat':'IP'}).text) < 5:
            continue
        pl_stats = {}

        name = player.find('td', {'data-stat':'player'}).text
        pl_stats['name'] = re.split("[^\w\s\.\'\-']", name)[0].strip()
        position = None

        pos = player.find('td', {'data-stat':'pos'}).text
        if pos == 'SP':
            pl_stats['pos'] = 'Starter'
        else:
            pl_stats['pos'] = 'Reliever'

        ip = player.find('td', {'data-stat':'IP'}).text.split('.')
        pl_stats['ip'] = float('.'.join(ip))
        innings_pitched = int(ip[0]) + (int(ip[1]) * .33)
        earned_runs = int(player.find('td', {'data-stat':'ER'}).text)

        pl_stats['era'] = float(player.find('td', {'data-stat':'earned_run_avg'}).text)

        if pos == 'SP':
            data['starting_er_sum'] = data.get('starting_er_sum') + earned_runs
            data['starting_ip'] = data.get('starting_ip') + innings_pitched
        else:
            data['bullpen_er_sum'] = data.get('bullpen_er_sum') + earned_runs
            data['bullpen_ip'] = data.get('bullpen_ip') + innings_pitched

        player_stats.append(pl_stats)

    average_starting_era = round(data.get('starting_er_sum') * 9 / data.get('starting_ip'), 2)
    average_bullpen_era = round(data.get('bullpen_er_sum') * 9/ data.get('bullpen_ip'), 2)

    return {'name':team, 'rotation_era':average_starting_era, 'bullpen_era': average_bullpen_era, 'url': url, 'team_name': team_name, 'player_stats': player_stats} 

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

def after_march():
    return datetime.datetime.today().month >= 4


if after_march():
    get_data(YEAR)
