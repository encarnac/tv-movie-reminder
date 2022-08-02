import requests
from bs4 import BeautifulSoup
import csv
import time

while True:
    f = open("URL.txt", "r+", encoding = "utf-8")
    URL = f.read()
    if URL == "":
        f.close()
        time.sleep(1)
    else:
        f.truncate(0)
        f.close()

        r = requests.get(URL) # if this line causes an error, run 'pip install requests'
        
        soup = BeautifulSoup(r.content, 'html5lib') # If this line causes an error, run 'pip install html5lib' or install html5lib
        # print(soup.prettify())
        Movie = soup.get_text()

        f = open("FullPage.txt", "a", encoding="utf-8")
        f.truncate(0)
        f.write(Movie)
        f.close()

        ti = Movie.find("IMDb{")
        title = Movie[0 : (ti-2)]
        print(title)

        ri = Movie.find("IMDb RATING")
        rating = Movie[ri+11] + Movie[ri+12] + Movie[ri+13]
        print(rating)

        cri = Movie.find("contentRating")
        cri2 = cri+16
        while Movie[cri2] != '"':
            cri2 = cri2 + 1
        cr = Movie[cri+16 : cri2]
        print(cr)

        f = open("MovieInfo.txt", "a", encoding="utf-8")
        f.truncate(0)
        f.write("title: " + title + "\n")
        f.write("rating: " + rating + "\n")
        f.write("content rating: " + cr + "\n")
        f.close()


