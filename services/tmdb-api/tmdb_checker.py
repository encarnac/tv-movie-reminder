### running loop for tmdb_api.py
from tmdb_api import tmdb_api
import os


os.chdir("IMDB_webscrape_api")
FILE_IN = 'tmdb_checker_in.txt'
FILE_OUT = 'tmdb_checker_out.txt'

while True:
        if open(FILE_IN, "r").read().splitlines() == []:
                continue
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