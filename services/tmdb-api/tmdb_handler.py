# running loop for tmdb_api.py
from tmdb_api import tmdb_api
import time

INFILE = 'tmdb_input.txt'
OUTFILE = 'tmdb_output.json'

print('Checking infile for input...')
while True:
    time.sleep(1.0)
    # Checks if file is empty by converting string from file to list
    if open(INFILE, "r").read().splitlines() == []:
        print(False)
        continue

    # Saves the input from the file as a list [category, imdb_id]
    with open(INFILE, "r+") as infile:
        print(True)
        input = infile.read().splitlines()
        infile.truncate(0)
        infile.close()

    # Calls the TMDB API with the saved inputs to get and write the film/series' input to a file
    with open(OUTFILE, "r+") as outfile:
        print('Calling TMDB API...')
        tmdb = tmdb_api(input[1], input[0])
        data = tmdb.find()
        outfile.write(str(data))
        
        print('Finished calling TMDB API...')
        outfile.close()

    print(input[0])
    # Calls the TMDB API to append input to the file about the series' seasons
    if input[0] == 'tv':
        with open(OUTFILE, "w+") as outfile:
            print('Calling TMDB API for episode data...')
            season = tmdb.info['number_of_seasons']
            updated_data = str(tmdb.get_season_ep(season))
            print('EPS = ', updated_data)
            outfile.write(updated_data)
            print('Finished calling TMDB API for episode data...')
            outfile.close()




