const fs = require('fs');
const tmdbInput = '../services/tmdb_input.txt';

function tmdbReq(req, res, next) {
  // Write the request to a text file to use with the TMDB API
  const category = req.query.category;
  const title= req.query.title;
  const input = `${category}\n${title}`;
  console.log(input);

  if (title) {
    fs.writeFile(tmdbInput, input, function (err) {
      if (err) throw err;
      else next();
    })
  } else res.send('');
}

module.exports = tmdbReq