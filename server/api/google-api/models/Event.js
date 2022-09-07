class Event {
    constructor (content) {
        this.endDate = content.release;
        this.startDate = content.release;
        this.summary = content.title;
        this.description = content.overview;
        this.typeColor = content.category;
        this.reminders = this.constructor.reminders;
    }

    static reminders = {
        useDefault: false, 
        overrides: [
            {
                'method': 'email',
                'minutes': 0
            },
            {
                'method': 'popup',
                'minutes': 0
            }
        ]
    };

    set endDate(release) {
        const date = new Date(release);
        date.setDate( date.getDate() + 1 );
        this.end = {
            date: date.toISOString().split( 'T' )[ 0 ]
        };
    };

    set startDate(release) {
        const date = new Date(release);
        this.start = {
            date: date.toISOString().split( 'T' )[ 0 ]
        };
    };

    set typeColor(category) {
        if (category === 'movie') {
            this.colorId = '1';
        } else {
            this.colorId = '2';
        }
    };
};


module.exports = Event;