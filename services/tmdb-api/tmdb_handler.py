# running loop for tmdb_api.py
from tmdb_api import tmdb_api
import time

FILE_IN = 'tmdb_input.txt'
FILE_OUT = 'tmdb_output.json'

while True:
    # Checks if file is empty by converting string from file to list
    if open(FILE_IN, "r").read().splitlines() == []:
        print(False)
        time.sleep(1.0)
        continue
    
    # Saves the input from the file as a list
    with open(FILE_IN, "r+") as file_in:
        data = file_in.read().splitlines()
        file_in.close()


    with open(FILE_OUT, "r+") as file_out:
        info = str(tmdb_api(data[1], data[0]).find())
        file_out.write(info)
        file_out.close()
        
    if data[1] == 'TV':
        with open(FILE_OUT, "a") as file_out:
            eps = str(tmdb_api(data[1], data[0]).get_season_ep())
            file_out.write(eps)
            file_out.close()

    with open(FILE_IN, "r+") as file_clean:
        file_clean.truncate(0)
        file_clean.close()
