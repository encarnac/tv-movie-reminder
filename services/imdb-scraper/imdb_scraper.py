import requests
from bs4 import BeautifulSoup
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

    tags = soup.find_all('span', class_='ipc-chip__text')
    genre_list = []
    for tag in tags:
        genre = tag.get_text()
        genre_list.append(genre)

    info = {
        'imdb_id' : imdb_id,
        'genres' : genre_list, 
        'title' : title
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
        results = get_results(category, title)
        
        outfile = open('imdb_output.txt', 'w+')
        outfile.truncate(0)
        for result in results:
            outfile.write(f'{result}\n')
        outfile.close()

    else:
        print(False)
    time.sleep(3.0)


