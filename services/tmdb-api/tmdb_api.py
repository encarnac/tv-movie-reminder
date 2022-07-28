import requests
IMDB_ID_SAMPLE = "tt0436992"
CATEGORY = "TV"


class tmdb_api:
    def __init__(self, imdb_id, category="TV"):
        self.URL = "https://api.themoviedb.org/3/"
        self.params = {"api_key": "c81e0496efc2e52533b8d931d70ee535", }
        self.imdb_id = imdb_id
        self.category = category
        self.response = self.find()

    def find(self):
        """
        Returns the content's TMDB id to retrieve and return the film/series' relevant data 
          Required parameters: 
            api_key,
            external_id (from IMDB),
            external_source (accepted string option)
          Returns:
            The TMDB id and requested film or series' details after calling 
            either movie_details() or tv_details()
        """
        # Uses the known IMDB id to get the TMDB id
        self.params['external_source'] = 'imdb_id'
        r = requests.get(
            self.URL+'find/'+self.imdb_id,
            params=self.params
        ).json()

        # Gets the TMDB id for a film and uses it to get more data from movie_details()
        if self.category == "FT":
            self.id = r['movie_results'][0]['id']
            info = self.movie_details(self.id)
            return info

        # Gets the TMDB id for a series and uses it to get  more data from tv_details()
        elif self.category == "TV":
            # continue with additional requests
            self.id = r['tv_results'][0]['id']
            info = self.tv_details(self.id)
            return info
        del self.params['external_source']

    def movie_details(self, movie_id):
        """
        Returns the requested film's data.
        Required: 
          movie_id (string) from the TMDB API
        Response:
          The film's data in a dictionary containing the
          title, overview, genres, popularity, language, 
          country, runtimes, and status.
        """
        r = requests.get(
            self.URL+f"movie/{movie_id}",
            params=self.params
        ).json()

        movie_info = {
            "title": r['title'],
            "overview": r['overview'],
            "genres":  [x['name'] for x in r['genres']],
            "popularity": r['popularity'],
            "language": r['original_language'],
            "country": r['production_companies'][0]['origin_country'],
            "runtimes": r['runtime'],
            "status": r['status'],
        }

        return movie_info

    def tv_details(self, tv_id):  # get by tv_ID
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
        r = requests.get(self.URL+f"tv/{tv_id}", params=self.params).json()

        tv_info = {
            "title": r['name'],
            "overview": r['overview'],
            "genres": [x['name'] for x in r['genres']],
            "popularity": r['popularity'],
            "language": r['original_language'],
            "country": r['origin_country'][0],
            "status": r['status'],
            "number_of_episodes": r['number_of_episodes'],
            "number_of_seasons": r['number_of_seasons'],
            "first_air_date": r['first_air_date'],
            "last_air_date": r['last_air_date'],
            "episode_run_time": r['episode_run_time'][0],
        }

        return tv_info

    def get_season_ep(self, season_number):
        if self.category != "TV":
            return
        r = requests.get(
            self.URL+f'/tv/{self.id}/season/{season_number}', params=self.params).json()
        # print(r['episodes'])
        season_episodes = []
        for x in range(len(r['episodes'])):
            tv_seasons = {}
            tv_seasons['air_date'] = r['episodes'][x]['air_date']
            tv_seasons['episode_number'] = r['episodes'][x]['episode_number']
            tv_seasons['name'] = r['episodes'][x]['name']
            season_episodes.append(tv_seasons)
        return season_episodes


if __name__ == '__main__':
    # when called by itself, it shows the example tt4574334("stranger things")
    strgr_things = tmdb_api(IMDB_ID_SAMPLE,CATEGORY)
    show_details = strgr_things.find()
    print(show_details)
    print(show_details['number_of_seasons'])
    recent_season_eps = strgr_things.get_season_ep(show_details['number_of_seasons'])
    show_details['season_episodes'] = recent_season_eps
    print(show_details)
    
