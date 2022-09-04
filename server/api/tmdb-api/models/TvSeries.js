class TvSeries {
    constructor (series) {
        this.category = 'tv';
        this.id = series.id;
        this.title = series.name;
        this.overview = series.overview;
        this.popularity = series.popularity;
        this.first_release = series.first_air_date;
        this.latest_release = series.last_air_date;
        this.episode_count = series.number_of_episodes; 
        this.season_count = series.number_of_seasons;
        this.status = series.status;
        this.poster = `https://image.tmdb.org/t/p/w500/${series.poster_path}`;
        this.genres = series.genres.map(genre => genre.name);
    }
};

module.exports = TvSeries