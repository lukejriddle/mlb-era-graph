import pymongo
import datetime
import sys
from scrape import scrape

string = sys.argv[1]
client = pymongo.MongoClient(string)

YEAR = datetime.datetime.today().year
QUERY = {"year": YEAR}

def after_march():
    return datetime.datetime.today().month >= 4

def create_or_update_entry():
    data = scrape(YEAR)
    document_data = {'year': YEAR, 'teams': data[0], 'rotation_avg': data[1], 'bullpen_avg': data[2]}

    if not entry_exists():
        create_entry(document_data)
    else:
        update_entry(document_data)

def entry_exists():
    db = client['Years']
    col = db['Years']

    if col.find_one(QUERY) is not None:
        return True
    else:
        return False

def create_entry(document_data):
    db = client['Years']
    col = db['Years']

    col.insert_one(document_data)
    print('Created entry for %s.' % YEAR)
    sys.stdout.flush()

def update_entry(document_data):
    db = client['Years']
    col = db['Years']

    col.replace_one(QUERY, document_data)
    print('Updated entry for %s.' % YEAR)
    sys.stdout.flush()

if after_march():
    create_or_update_entry()
    
