class Movie {
    constructor (series) {
        this.category = 'tv';
        this.id = series.id;
        this.title = series.name;
        this.overview = series.overview;
        this.genres = series.genres.map(genre => genre.name);
        this.popularity = series.popularity;
        this.firstRelease = series.first_air_date;
        this.latestRelease = series.last_air_date;
        this.episodeCount = series.number_of_episodes; 
        this.seasonCount = series.number_of_seasons;
        this.status = series.status;
        this.poster = `https://image.tmdb.org/t/p/w500/${series.poster_path}`;
    };
};

module.exports = Movie