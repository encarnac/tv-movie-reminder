import requests
from bs4 import BeautifulSoup
import json
import time

def get_results(category, title):
    """
    Scrapes the IMDB results page for each result's URL 
    Receives: query = [category = tv or film, title = search terms] 
    Returns: list of every matching item's info in a dictionary 
    """

    search_url = f"https://www.imdb.com/find?q={title}&s=tt&ttype={category}&exact=true&ref_=fn_tt_ex"
    response = requests.get(search_url)
    soup = BeautifulSoup(response.content, 'html.parser')
    result_rows = soup.find_all("td", class_="result_text")
    imdb_results = []
    for result in result_rows:
        imdb_id = result.a['href'][7:-1]
        info = get_info(imdb_id)
        imdb_results.append(info)

    return (imdb_results)


def get_info(imdb_id):
    """
    Gets data on the specified tv show or movie using given URL.
    Receives: IMDB URL to scrape
    Returns:
    """
    imdb_page = f"https://www.imdb.com/title/{imdb_id}/"
    response = requests.get(imdb_page)
    soup = BeautifulSoup(response.content, 'html.parser')

    title = soup.find('h1', attrs={'data-testid':'hero-title-block__title'}).get_text()

    image = soup.find('img', class_='ipc-image')['src']

    imdb_genres = soup.find_all('span', class_='ipc-chip__text')
    genres = []
    for tag in imdb_genres:
        genre = tag.get_text()
        genres.append(genre)

    score = soup.find('div', attrs={'data-testid':'hero-rating-bar__aggregate-rating__score'})
    if score is None:
        score = '--/10'
    else:
        score = score.get_text()

    metadata = soup.find('ul', attrs={'data-testid':'hero-title-block__metadata'})
    year = metadata.find('a').text[:4]
    
    info = {
        'imdb_id' : imdb_id,
        'title' : title,
        'year' : year,
        'genres' : genres,
        'score' : score,
        'image' : image
    }
    return info

while True:
    # Read file to get user search parameters
    infile = open('imdb_input.txt', 'r+') 
    
    category = infile.readline().rstrip('\n')
    title = infile.readline().replace(' ', '+')
    infile.truncate(0)
    infile.close()

    # Get all results and their basic info from IMDB and writes it to a file
    if title:
        print(True)
        results = get_results(category, title)
        results = json.dumps(results)
        outfile = open('imdb_output.json', 'w+')
        outfile.truncate(0)
        outfile.write(results)
        outfile.close()
    else:
        print(False)
        
    time.sleep(1.0)


