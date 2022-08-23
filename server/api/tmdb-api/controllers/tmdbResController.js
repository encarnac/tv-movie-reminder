const fs = require('fs');
const tmdbOutput = '../services/tmdb_output.json';

function tmdbRes (req, res) {
  // Read the data from the TMDB API from the output file and send as response to frontend
  console.log('Awaiting output in outfile');
  setTimeout(() => {
    const text = fs.readFileSync(tmdbOutput, 'utf8');
    fs.truncate(tmdbOutput, 0,  function(){console.log('Output retrieved and outfile cleared successfully.')} );
    res.send(text);
  }, 5000);
};

module.exports = tmdbRes;