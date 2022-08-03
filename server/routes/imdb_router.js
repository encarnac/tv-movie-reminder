const express = require('express');
const router = express.Router();
const fs = require('fs');
const imdbInput = '../services/imdb-scraper/imdb_input.txt';
const imdbOutput = '../services/imdb-scraper/imdb_output.json';

// Handle request for the communication pipeline with the IMDB scraper
router.get('/', imdbReq, imdbRes);


function imdbReq(req, res, next) {
  // Write the search request to a text file for web scraping
  const category = req.query.category;
  const title = req.query.title;
  const input = `${category}\n${title}`;

  if (title) {
    fs.writeFile(imdbInput, input, function (err) {
      if (err) throw err;
      else next();
    })
  } else res.send('')
}


function imdbRes (req, res) {
  // Read IMDB web scrape results from the output file and send as response to frontend 
  console.log('Awaiting output in outfile')
  setTimeout(() => {
    const text = fs.readFileSync(imdbOutput, 'utf8')
    // const data = JSON.parse(text)
    fs.truncate(imdbOutput, 0,  function(){console.log('File Truncated Successfully !!!')} )
    res.send(text)
  }, 5000);
};

module.exports = router;
