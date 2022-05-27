import requests
from bs4 import BeautifulSoup
import time
import json


def find_title(query):
  """
  Scrapes the IMDB results page for each result's URL 
  Receives: query = [category = tv or film, title = search terms] 
  Returns: list of every matching item's info in a dictionary 
  """

  BASE_URL = f"https://www.imdb.com/find?q={query[0]}&s=tt&ttype={query[1]}&exact=true&ref_=fn_tt_ex"
  
  response = requests.get(BASE_URL)
  soup = BeautifulSoup(response.content, "html.parser")
   
  
  all_results = []

  result_rows = soup.find_all("tr", class_="findResult")
  for result in result_rows:
    url = result.td.a['href']
    info = get_info(f"https://www.imdb.com{url}")
    all_results.append(info)

  return all_results


def get_info(url):
  """
  Uses the a .txt file to access the IMDB scraper microservice 
  Receives: IMDB URL to scrape
  Returns: dictionary containing the title, rating, content rating, description,  id, and image url
  """

  # Writes an IMDB URL to scrape
  with open('../IMDB Scrapper/URL.txt','w') as outfile:
    outfile.write(url)

  time.sleep(2.0) 

  imdb_info = {} 
  mpaa = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'TV-Y', 'TV-YZ', 'TV-G', 'TV-PG', 'TV-14', 'TV-MA','Not Rated']

  # Gets title, rating, and content rating from MovieInfo.txt
  with open('../IMDB Scrapper/MovieInfo.txt', 'r') as infile_1:
    for line in infile_1:
      key, val = line.strip().split(': ', 1)
      imdb_info[f'{key}'] = val

    if imdb_info['rating'][1] != ".":
      imdb_info['rating'] = "0.0"
      
    if imdb_info['content rating'] not in mpaa:
      imdb_info['content rating'] = "Not Rated"

  # Gets the description text and date from FullPage.txt
  with open("../IMDB Scrapper/FullPage.txt") as infile_2:
    text = infile_2.read()
    data = text.split("/*!sc*/")[0].split("IMDb")[1].split("@media screen ")[0].lstrip("IMDb")
    data = json.loads(data)
    

    imdb_info['imdb_id'] = data['url'][7:-1]
    
    if 'image' in data:
      imdb_info['image'] = data["image"] 
    else:
      imdb_info['image'] = ""
  
  return imdb_info



