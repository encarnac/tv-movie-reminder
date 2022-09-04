class Movie {
    constructor (movie) {
        this.category = 'movie';
        this.id = movie.id;
        this.title = movie.title;
        this.overview = movie.overview;
        this.genres = movie.genres.map(genre => genre.name);
        this.popularity = movie.popularity;
        this.release = movie.release_date;
        this.status = movie.status;
        this.poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    };
};

module.exports = Movie