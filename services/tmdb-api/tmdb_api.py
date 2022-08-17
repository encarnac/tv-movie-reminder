import requests
import config
from datetime import date

API_KEY = config.api_key


class tmdb_api:
    '''
    A class used to represent usage of The Movie Database (TMDB) API to gather information about a movie or tv show.

    Attributes =
        URL : (str) The base URL to access the API
        params : (dict) Required and optional parameters based on API documentation
        imdb_id : (str) The movie/series' external id from IMDB to be searched in TMDB
        category : (str) Type of content to be searched ['tv', 'ft']
        tmdb_id : (str) The requested movie/series' corresponding TMDB id
        info : (dict) Relevant information about the movie/series gathered from the TMDB API
    
    Methods = 
        find(self) : 
            Uses the imdb_id to return the tmdb_id
        get_movie_details(movie_id=tmdb_id) :  
            Returns a movie's title, overview, genres, popularity, language, country, runtime, and status 
        get_tv_details(tv_id=tmdb_id) :
            Returns a series' title, overview, genres, popularity, language, country, status, number of episodes,
            number of seasons, first air date, last air date, and runtime.
        get_season_ep(season_number)
            Returns the airdate, episode number, and title of a series' most recent season.
    '''

    def __init__(self, category, title):
        ''' Initializes a tmdb_api object.'''
        self.URL = 'https://api.themoviedb.org/3/'
        self.api_key =  API_KEY
        self.category = category
        self.query = title
        self.year = date.today().year
        self.params = {'api_key': self.api_key, 
                       'query': self.query,
                       'year': self.year, 
                       'language': 'en-US',
                       'page' : '1',
                       'include_adult': 'false'}
        self.data = None



    def find(self):
        '''
        Sends request to the TMDB API '/find/{imdb_id}' endpoint to get the tmdb_id,
        which is used to gather further data on the movie or tv show.
        '''
        print(self.year)
        req_id = requests.get(self.URL+'search/'+self.category , params=self.params).json()
        results = req_id['results']
        result_ids = []
        for x in results:
          id = x['id']
          result_ids.append(id)

        # Uses the listing's tmdb_id to get more info from get_movie_details()
        if self.category == "movie":
            self.data = self.get_movie_details(result_ids)
            return self.data

        # Uses the listing's tmdb_id to get more info from get_tv_details() 
        elif self.category == "tv":
            self.data = self.get_tv_details(result_ids)
            return self.data
       


    def get_movie_details(self, movie_ids):
        ''' Sends request to the TMDB API '/movie/{movie_id}' endpoint to get movie data'''

        movie_results = []

        for id in movie_ids:
          req_movie = requests.get(
              f'{self.URL}movie/{id}?api_key={self.api_key}'
          ).json()

          movie = {
              "category": self.category,
              "id": req_movie['id'],
              "title": req_movie['title'],
              "overview": req_movie['overview'],
              "genres":  [x['name'] for x in req_movie['genres']],
              "popularity": req_movie['popularity'],
              "release":  req_movie['release_date'],
              "status": req_movie['status'],
              "poster": f"https://image.tmdb.org/t/p/w500/{req_movie['poster_path']}"
          }
          
          movie_results.append(movie)
        
        return movie_results



    def get_tv_details(self, tv_ids):  # get by tv_ID
        '''Sends request to the TMDB API '/tv/{tv_id}' endpoint to get tv data'''

        tv_results = []

        for id in tv_ids:
          req_tv = requests.get(
              f'{self.URL}tv/{id}?api_key={self.api_key}'
          ).json()

          tv_show = {
              "category": self.category,
              "id": req_tv['id'],
              "title": req_tv['name'],
              "overview": req_tv['overview'],
              "genres": [x['name'] for x in req_tv['genres']],
              "popularity": req_tv['popularity'],
              "first_release": req_tv['first_air_date'],
              "latest_release": req_tv['last_air_date'],
              "episode_count": req_tv['number_of_episodes'],
              "season_count": req_tv['number_of_seasons'],
              "season_episodes": self.get_season_ep(id, req_tv['number_of_seasons']),
              "status": req_tv['status'],
              "poster": f"https://image.tmdb.org/t/p/w500/{req_tv['poster_path']}"
          }
          tv_results.append(tv_show)

        return tv_results

    def get_season_ep(self, tv_id, season_number):
      ''' Sends request to the TMDB API '/tv/{tmdb_id}/season/{season_number}' endpoint to get season data'''
      if season_number < 1:
        return ''

      req_season = requests.get(
          f'{self.URL}tv/{tv_id}/season/{season_number}?api_key={self.api_key}').json()

      season_episodes = []
      for ep in req_season['episodes']:
        episode = {}
        episode['air_date'] = ep['air_date']
        episode['episode_number'] = ep['episode_number']
        episode['name'] = ep['name']
        season_episodes.append(episode)
      return season_episodes
