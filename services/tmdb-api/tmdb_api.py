import requests
import time

class tmdb_api:
    def __init__(self, imdb_id, category="TV"):
        self.URL = "https://api.themoviedb.org/3/"
        self.params = {"api_key": "c81e0496efc2e52533b8d931d70ee535", }
        self.imdb_id = imdb_id
        self.category = category
        self.tmdb_id = None
        self.info = None

    def find(self):
        """
        Returns the content's TMDB id to retrieve and return the film/series' relevant data 
        Required parameters: 
            api_key,
            external_id (from IMDB),
            external_source (accepted string option)
        Returns:
            The TMDB id and requested film or series' details after calling 
            either get_movie_details() or get_tv_details()
        """
        # Uses the known IMDB id to get the TMDB id
        self.params['external_source'] = 'imdb_id'
        req_id = requests.get(
            self.URL+'find/'+self.imdb_id,
            params=self.params
        ).json()
        print('FIND TMDB = ', req_id)

        # Gets the TMDB id for a film and uses it to get more data from get_movie_details()
        if self.category == "ft":
            self.tmdb_id = req_id['movie_results'][0]['id']
            print('SELF ID = ', self.tmdb_id)
            self.info = self.get_movie_details(self.tmdb_id)
            return self.info

      # Gets the TMDB id for a series and uses it to get  more data from get_tv_details() 
        elif self.category == "tv":
            # continue with additional requests
            self.tmdb_id = req_id['tv_results'][0]['id']
            print('SELF ID = ', self.tmdb_id)
            self.info = self.get_tv_details(self.tmdb_id)
            return self.info
        del self.params['external_source']

    def get_movie_details(self, movie_id):
        """
        Returns the requested film's data.
        Required: 
          movie_id (string) from the TMDB API
        Response:
          The film's data in a dictionary containing the
          title, overview, genres, popularity, language, 
          country, runtimes, and status.
        """
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
        """
        Returns the requested tv series' data.
        Required:
          tv_id (string) from the TMDB API
        Response:
          The series' data in a dictionary containing the
          title, overview, genres, popularity, language,
          country, status, number of episodes, number of seasons, 
          first airdate, lasgt airdate, and runtime.
        """
        req_tv = requests.get(self.URL+f"tv/{tv_id}", params=self.params).json()

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
        if self.category != "tv":
            return
        r = requests.get(
            self.URL+f'/tv/{self.tmdb_id}/season/{season_number}', params=self.params).json()
        season_episodes = []
        for x in range(len(r['episodes'])):
            tv_seasons = {}
            tv_seasons['air_date'] = r['episodes'][x]['air_date']
            tv_seasons['episode_number'] = r['episodes'][x]['episode_number']
            tv_seasons['name'] = r['episodes'][x]['name']
            season_episodes.append(tv_seasons)
        self.info['episodes'] = season_episodes
        print('----COMPLETE TV INFO ---- = ', self.info)
        return self.info

