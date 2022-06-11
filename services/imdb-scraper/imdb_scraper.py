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

    result_rows = soup.find_all("tr", class_="findResult")
    all_results = []
    for result in result_rows:
        url = result.td.a['href']
        info = get_info(f"https://www.imdb.com{url}")
        all_results.append(info)

    return (str(all_results))

def get_info(result_url):
    """
    Gets data on the specified tv show or movie using given URL.
    Receives: IMDB URL to scrape
    Returns:
    """
    response = requests.get(result_url)
    soup = BeautifulSoup(response.content, 'html.parser')

    title = soup.find('title')
    print('SOUP=', title)
    return title



while True:
    # Read file to get user search parameters
    infile = open('imdb_input.txt', 'r+') 
    category = infile.readline()
    title = infile.readline().replace(' ', '+')
    infile.truncate(0)
    infile.close()

    # Get all results and their basic info from IMDB and writes it to a file
    if title:
        print(title)
        print(True)
        results = get_results(category, title)
        with open('imdb_output.txt', encoding="utf-8") as outfile:
            outfile.write(results)
    else:
        print(False)
    time.sleep(5.0)


