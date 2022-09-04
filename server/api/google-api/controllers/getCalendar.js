
const getCalendar = async (req, res, next) => {
    try {
        const { calendarId } = req.query;
        if (!calendarId) {
            res.end();
        } else {
            const { oauth2Client } = req;
            const { calendar } = req;
            const response = await calendar.events.list({
                auth: oauth2Client,
                calendarId: calendarId,
                maxResults: 2500,
                showDeleted: false
            });
            let events = [];
            response.data.items.map( ( item ) =>  {
                const event = {
                    id: item.id,
                    title: item.summary, 
                    start: item.start.date,
                    allDay: true,
                    url: item.htmlLink,
                    overview: item.overview
                }
                events.push(event)
            });
            // console.log('BACKEND EVENTS = ', events);
            res.send({
                events: events,
                authUser: req.authUser
            });
        }
        
    } catch ( error ) {
        next( error );
    };
};

module.exports = getCalendar