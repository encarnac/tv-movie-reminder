# running loop for tmdb_api.py
from tmdb_api import tmdb_api
import time
import json

INFILE = 'tmdb_input.txt'
OUTFILE = 'tmdb_output.json'

def main():
    '''
    Continuously reads INFILE for valid arguments (category, imdb_id) to be used with The Movie Database (TMDB) API,
    and writes the returned tv/movie data to OUTFILE.
    '''

    print('Checking for required parameters (category, imdb_id)...')
    while True:
        time.sleep(1.0)
        # Checks input file for 2 lines containing the required category and imdb_id input
        with open(INFILE, "r+") as infile:
            input = infile.read().splitlines()
            if input == []:
                continue
            else: 
                print('Found valid arguments!')
                infile.truncate(0)
                infile.close()
        
                # Requests tv/movie data from TMDB API to write to the output file
                with open(OUTFILE, "w+") as outfile:
                    print('Requesting tv or movie data from TMDB API...')
                    tmdb = tmdb_api(input[1], input[0])
                    data = json.dumps(tmdb.find())
                    print(data)
                    outfile.truncate(0)
                    outfile.write(data)
                    outfile.close()

                # Updates the output file with episode details from TMDB API
                if input[0] == 'tv':
                    with open(OUTFILE, "w+") as outfile:
                        print('Requesting episode data from TMDB API...')
                        season = tmdb.info['number_of_seasons']
                        updated_data = json.dumps(tmdb.get_season_ep(season))
                        outfile.truncate(0)
                        outfile.write(updated_data)
                        outfile.close()

                print('DONE\nChecking for required parameters (category, imdb_id)...')

if __name__ == '__main__':
    main()

