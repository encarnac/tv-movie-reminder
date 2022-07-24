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
        # self.get_season_ep(self.response['number_of_seasons'])
        # json.dump(self.main(), f"{r_file}.json")

    def find(self):
        self.params['external_source'] = 'imdb_id'
        r = requests.get(
            self.URL+'find/'+self.imdb_id,
            params=self.params
        ).json()
        if self.category == "FT":
            # add-in additional fixes for conditions of multiple results
            self.id = r['movie_results'][0]['id']
            info = self.movie_details(self.id)
            return info

            # genres = requests.get(
            #     self.URL+"genres/movie/list", params=self.params).json()
            # print([genre['name'] for genre in genres if genre['id'] in info['genres']])

            # info['genres'] = [z['name'] for z in genres if z['id'] in info['genres']]
        elif self.category == "TV":
            # continue with additional requests
            self.id = r['tv_results'][0]['id']
            info = self.tv_details(self.id)
            return info
        del self.params['external_source']

    def movie_details(self, movie_id):  # get by movie_ID
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
    strgr_things = tmdb_api(IMDB_ID_SAMPLE)
    show_details = strgr_things.find()
    recent_season_eps = strgr_things.get_season_ep()

    print(show_details)
    print(recent_season_eps)
