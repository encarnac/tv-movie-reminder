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
                print('Found valid arguments!', input)
                infile.truncate(0)
                infile.close()
                category = input[0]
                title = input[1]
        
                # Requests tv/movie data from TMDB API to write to the output file
                with open(OUTFILE, "w+") as outfile:
                    print('Requesting tv or movie data from TMDB API...')
                    tmdb = tmdb_api(category, title)
                    data = json.dumps(tmdb.find())
                    print(data)
                    outfile.truncate(0)
                    outfile.write(data)
                    outfile.close()

                print('DONE\nChecking for required parameters (category, imdb_id)...')

if __name__ == '__main__':
    main()