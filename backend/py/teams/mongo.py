import pymongo
import sys

def save(team, year, data):
    client = pymongo.MongoClient(sys.argv[1])

    db = client['Years']
    col = db[str(year)]

    if col.find_one({'name': data.get('name')}) == None:
        col.insert_one({'name': data.get('name'), 'rotation_avg': data.get('rotation_era'), 'bullpen_avg': data.get('bullpen_era'), 'url': data.get('url'), 'team_name': data.get('team_name'), 'player_stats': data.get('player_stats')})
        print('Created entriy for %s %s.' % (year, team))
        sys.stdout.flush()
    else:
        col.replace_one({'name': data.get('name')}, {'name': data.get('name'), 'rotation_avg': data.get('rotation_era'), 'bullpen_avg': data.get('bullpen_era'), 'url': data.get('url'), 'team_name': data.get('team_name'), 'player_stats': data.get('player_stats')})
        print('Updated entry for %s %s.' % (year, team))
        sys.stdout.flush()
