const Event = require('../models/Event');

const insertMovieEvent = async (req, res, next) => {
    try {
        const { content } = req.body;
        if (content.category === 'movie') {
            const { calendarId } = req.body;
            const { oauth2Client } = req;
            const { calendar } = req;
            const event = JSON.stringify(new Event(content));
            const response = await calendar.events.insert({
                auth: oauth2Client,
                calendarId: calendarId,
                requestBody: event
            });
            res.sendStatus(response.status);
        } else next();

    } catch(error) {
        next(error);
    }
};

module.exports = insertMovieEvent