const express = require('express');
const router = express.Router();
const fs = require('fs');
const tmdbInput = '../services/tmdb_input.txt';
const tmdbOutput = '../services/tmdb_output.json';

// Handle request for the communication pipeline with the TMDB scraper
router.get('/', tmdbReq, tmdbRes);


function tmdbReq(req, res, next) {
  // Write the request to a text file to use with the TMDB API
  const category = req.query.category;
  const title= req.query.title;
  const input = `${category}\n${title}`
  console.log(input)

  if (title) {
    fs.writeFile(tmdbInput, input, function (err) {
      if (err) throw err;
      else next();
    })
  } else res.send('')
}


function tmdbRes (req, res) {
  // Read the data from the TMDB API from the output file and send as response to frontend
  console.log('Awaiting output in outfile')
  setTimeout(() => {
    const text = fs.readFileSync(tmdbOutput, 'utf8')
    // const data = JSON.stringify(text)
    fs.truncate(tmdbOutput, 0,  function(){console.log('Output retrieved and outfile cleared successfully.')} )
    res.send(text)
  }, 5000);
};

module.exports = router;
