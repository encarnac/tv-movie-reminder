const express = require('express');
const router = express.Router();
const fs = require('fs');

const imdbInput = '../services/imdb-scraper/imdb_input.txt';

/* Handle request parameters for the IMDB scraper */
router.get('/', function(req, res, next) {
  const category = req.query.category;
  const title = req.query.title;
  const input = `${category}\n${title}`;

  fs.writeFile(imdbInput, input, function (err) {
    if (err) return console.log(err);
    console.log(err);
  });

  res.send('Done');
});

module.exports = router;
