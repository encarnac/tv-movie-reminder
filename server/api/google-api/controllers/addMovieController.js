const axios = require('axios');
const Event = require('../models/Event')


const addMovieEvent = async (req, res, next) => {
    try {
        const { token } = req.body
        const { calendarId } = req.body
        const { content } = req.body 
        
        if (content.category === 'movie') {
            console.log('addMovieEvent')
            const event = JSON.stringify(new Event(content))
            const addRes = await axios({
                method: 'POST',
                url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
                headers: { Authorization: `Bearer ${ token }` },
                data: event
                })
            console.log(addRes.status)
            res.sendStatus(addRes.status)           
        } else next()

    } catch(error) {
        next(error)
    }
}

module.exports = addMovieEvent