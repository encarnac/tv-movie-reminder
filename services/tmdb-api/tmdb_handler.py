# running loop for tmdb_api.py
from tmdb_api import tmdb_api
import time

INFILE = 'tmdb_input.txt'
OUTFILE = 'tmdb_output.json'

while True:
    time.sleep(1.0)
    # Checks if file is empty by converting string from file to list
    if open(INFILE, "r").read().splitlines() == []:
      print(False)
      continue
    
    # Saves the input from the file as a list [category, imdb_id]
    with open(INFILE, "r+") as infile:
      print(True)
      data = infile.read().splitlines()
      infile.truncate(0)
      infile.close()

    # Calls the TMDB API with the saved inputs to get and write the film/series' data to a file
    with open(OUTFILE, "r+") as outfile:
      info = str(tmdb_api(data[1], data[0]).find())
      outfile.write(info)
      outfile.close()
  
    # Calls the TMDB API to append data to the file about the series' seasons 
    if data[1] == 'TV':
      with open(OUTFILE, "a") as outfile:
        eps = str(tmdb_api(data[1], data[0]).get_season_ep())
        outfile.write(eps)
        outfile.close()

