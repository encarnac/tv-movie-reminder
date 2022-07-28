import requests

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

    def __init__(self, imdb_id, category="TV"):
        ''' Initializes a tmdb_api object.'''
        self.URL = "https://api.themoviedb.org/3/"
        self.params = {"api_key": "c81e0496efc2e52533b8d931d70ee535", }
        self.imdb_id = imdb_id
        self.category = category
        self.tmdb_id = None
        self.info = None


    def find(self):
        '''
        Sends request to the TMDB API '/find/{imdb_id}' endpoint to get the tmdb_id,
        which is used to gather further data on the movie or tv show.
        '''
        self.params['external_source'] = 'imdb_id'
        req_id = requests.get(
            self.URL+'find/'+self.imdb_id,
            params=self.params
        ).json()

        # Uses the listing's tmdb_id to get more info from get_movie_details()
        if self.category == "ft":
            self.tmdb_id = req_id['movie_results'][0]['id']
            self.info = self.get_movie_details(self.tmdb_id)
            return self.info

        # Uses the listing's tmdb_id to get more info from get_tv_details() 
        elif self.category == "tv":
            self.tmdb_id = req_id['tv_results'][0]['id']
            self.info = self.get_tv_details(self.tmdb_id)
            return self.info
        del self.params['external_source']


    def get_movie_details(self, movie_id):
        ''' Sends request to the TMDB API '/movie/{tmdb_id}' endpoint to get movie data'''
        req_movie = requests.get(
            self.URL+f"movie/{movie_id}",
            params=self.params
        ).json()

        movie_info = {
            "title": req_movie['title'],
            "overview": req_movie['overview'],
            "genres":  [x['name'] for x in req_movie['genres']],
            "popularity": req_movie['popularity'],
            "language": req_movie['original_language'],
            "country": req_movie['production_companies'][0]['origin_country'],
            "runtimes": req_movie['runtime'],
            "status": req_movie['status'],
        }
        return movie_info


    def get_tv_details(self, tv_id):  # get by tv_ID
        '''Sends request to the TMDB API '/tv/{tmdb_id}' endpoint to get tv data'''
        req_tv = requests.get(
            self.URL+f"tv/{tv_id}",
             params=self.params
        ).json()

        tv_info = {
            "title": req_tv['name'],
            "overview": req_tv['overview'],
            "genres": [x['name'] for x in req_tv['genres']],
            "popularity": req_tv['popularity'],
            "language": req_tv['original_language'],
            "country": req_tv['origin_country'][0],
            "status": req_tv['status'],
            "number_of_episodes": req_tv['number_of_episodes'],
            "number_of_seasons": req_tv['number_of_seasons'],
            "first_air_date": req_tv['first_air_date'],
            "last_air_date": req_tv['last_air_date'],
            "episode_run_time": req_tv['episode_run_time'][0],
        }
        return tv_info


    def get_season_ep(self, season_number):
        ''' Sends request to the TMDB API '/tv/{tmdb_id}/season/{season_number}' endpoint to get season data'''
        if self.category != "tv":
            return
    
        req_season = requests.get(
            self.URL+f'/tv/{self.tmdb_id}/season/{season_number}', params=self.params).json()

        season_episodes = []
        for x in range(len(req_season['episodes'])):
            tv_seasons = {}
            tv_seasons['air_date'] = req_season['episodes'][x]['air_date']
            tv_seasons['episode_number'] = req_season['episodes'][x]['episode_number']
            tv_seasons['name'] = req_season['episodes'][x]['name']
            season_episodes.append(tv_seasons)
        self.info['episodes'] = season_episodes
        return self.info

