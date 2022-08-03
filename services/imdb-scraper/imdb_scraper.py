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

    # Gets all the content that matched the search parameters
    result_rows = soup.find_all("td", class_="result_text")
    imdb_results = []
    for result in result_rows:
        imdb_id = result.a['href'][7:-1]
        info = get_info(imdb_id) # Gets more detailed info for each content
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

    # Gets the content's title
    title = soup.find('h1', attrs={'data-testid':'hero-title-block__title'}).get_text()

    # Gets the content's image url
    image = soup.find('img', class_='ipc-image', attrs={'loading':'eager'})
    if image is None:
        image = ''
    else:
        image=image['src']

    # Gets the content's year of release
    metadata = soup.find('ul', attrs={'data-testid':'hero-title-block__metadata'})
    year = metadata.find('a').text
    
    info = {
        'imdb_id' : imdb_id,
        'title' : title,
        'year' : year,
        'image' : image
    }
    return info


def main():
  '''
  Continously reads infile for valid arguments (category, title) to webscrape IMDB results.
  Calls get_results to return tv/movie IMDB id, name, year, and image. 
  '''
  print('Checking infile for input...')
  while True:
      # Read file to get user search parameters
      with open('imdb_input.txt', 'r+') as infile:
        input = infile.read().splitlines()

        if input == []:
          continue
        else: 
          infile.truncate(0)
          infile.close()
          print(True)

          results = get_results(input[0], input[1])
          results = json.dumps(results)
          print(results)

          outfile = open('imdb_output.json', 'w+')
          outfile.truncate(0)
          outfile.write(results)
          outfile.close()
          
          print('Checking infile for input...')




      # infile = open('imdb_input.txt', 'r+')

      # category = infile.readline().rstrip('\n')
      # title = infile.readline().replace(' ', '+')
      # infile.truncate(0)
      # infile.close()

      # Get all results and their basic info from IMDB and writes it to a file
      # if title:
      #     print(True)
      #     results = get_results(category, title)
      #     results = json.dumps(results)
      #     print(results)
      #     outfile = open('imdb_output.json', 'w+')
      #     outfile.truncate(0)
      #     outfile.write(results)
      #     outfile.close()
      #     print('Checking infile for input...')
      # else:
      #     continue
          
      time.sleep(1.0)


if __name__ == '__main__':
    main()