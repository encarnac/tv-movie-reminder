
const axios = require('axios');
const API_KEY = process.env.API_KEY;

const getResultsId = async (req, res, next) => {
    try {
        if (req.query.title) {
            const category = req.query.category;
            const params = {
                api_key: API_KEY,
                query: req.query.title,
                year: new Date().getFullYear(),
                language: 'en-US', 
                page: 1, 
                include_adult: false
            };

            const requestIds = await axios.get( `https://api.themoviedb.org/3/search/${category}`, { 
                params: params 
            });
            const results = requestIds.data.results;
            let resultIds = []
            results.map( ( item ) =>  {
                const id = item.id;
                resultIds.push(id);
            });

            console.log('Result IDS = ', resultIds)
            req.resultIds = resultIds;
            req.category = category;
            req.apiKey = API_KEY;
            next();
            
        } else res.end();

    } catch( error ) {
        next(error);
    };
    
};

module.exports = getResultsId



// function getMovieTmdb(req, res, next) {
//     console.log('CATEGORY:' , req.category)
//     console.log('SEARCHING FOR MOVIE')
//     try {
//         if (req.category === 'tv') next('route');
//         else{ 


//             res.send('MOVIE'); 
//         }
        
//     } catch(error) {
//         next(error)
//     }
// };
 

// function getTvTmdb(req, res, next) {
//     console.log('SEARCHING FOR TV' )
//     try {
//         res.send('TV');

//     } catch(error) {
//         next(error)
//     }
// };