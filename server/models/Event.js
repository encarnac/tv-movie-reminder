class Event {
    constructor (content) {
        this.endDate = content.release;
        this.startDate = content.release;
        this.summary = content.title;
        this.description = 'content.overvie';
        this.typeColor = content.category;
        this.reminders = this.constructor.reminders
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
    }

    set endDate(release) {
        const date = new Date(release);
        date.setDate( date.getDate() + 1 );
        this.end = {
            date: date.toISOString().split( 'T' )[ 0 ]
        }
    }

    set startDate(release) {
        const date = new Date(release);
        this.start = {
            date: date.toISOString().split( 'T' )[ 0 ]
        }
    }

    set typeColor(category) {
        if (category === 'movie') {
            this.colorId = '1'
        } else {
            this.colorId = '2'
        }
    }
}

// const content1 = {
//     category:"movie",
//     id:616037,
//     title:"Thor: Love and Thunder",
//     overview:"After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor Odinson enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now inexplicably wields Mjolnir as the Relatively Mighty Girl Thor. Together they embark upon a harrowing cosmic adventure to uncover the mystery of the God Butcher’s vengeance and stop him before it’s too late.",
//     genres:["Action","Adventure","Fantasy"],
//     popularity:7686.423,
//     release:"2022-07-06",
//     status:"Released",
//     poster:"https://image.tmdb.org/t/p/w500//pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg"}

// const example = new Event(content1)
// console.log(JSON.stringify(example))



// const content2 = {
//     category: 'tv',
//     id: 204284,
//     title: 'The Rehearsal',
//     overview:
//         'With a construction crew, a legion of actors, and seemingly unlimited resources, Nathan Fielder allows ordinary people to prepare for life’s biggest moments by “rehearsing” them in carefully crafted simulations of his own design. When a single misstep could shatter your entire world, why leave life to chance?',
//     genres: [ 'Comedy', 'Documentary' ],
//     popularity: 42.466,
//     first_release: '2022-07-15',
//     latest_release: '2022-08-19',
//     episode_count: 6,
//     season_count: 1,
//     season_episodes: [
//         {
//             air_date: '2022-07-15',
//             episode_number: 1,
//             name: 'Orange Juice, No Pulp'
//         },
//         {
//             air_date: '2022-07-22',
//             episode_number: 2,
//             name: 'Scion'
//         },
//         {
//             air_date: '2022-07-29',
//             episode_number: 3,
//             name: 'Gold Digger'
//         },
//         {
//             air_date: '2022-08-05',
//             episode_number: 4,
//             name: 'The Fielder Method'
//         },
//         {
//             air_date: '2022-08-12',
//             episode_number: 5,
//             name: 'Apocalypto'
//         },
//         {
//             air_date: '2022-08-19',
//             episode_number: 6,
//             name: 'Pretend Daddy'
//         }
//     ],
//     status: 'Returning Series',
//     poster: 'https://image.tmdb.org/t/p/w500//uI2nDcPa92UDK6c88J4Mni7yHqR.jpg'
// };

// const loop = ( content2 ) => {
//     episodeEvents = []
//     title = content.title;
//     for ( const ep of content.season_episodes ) {
//         content.release = ep.air_date;
//         content.title = `${ title } (S${ content.season_count }x${ ep.episode_number })`;
//         const event = new Event(content)
//         episodeEvents.push(JSON.stringify(event))
//     }
//     console.log(episodeEvents)

// };

// loop( content2 );

module.exports = Event;