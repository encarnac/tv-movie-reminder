![watch-soon](https://user-images.githubusercontent.com/76987299/184469224-16a690f8-74f9-4f21-9b7b-ff007c7bccf1.png)

# tv-movie-reminder (aka watch-soon)
[![Bootstrap][Bootstrap.com]][Bootstrap-url]
[![React][React.js]][React-url]
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)
[![MIT License][license-shield]][license-url]



<!-- TABLE OF CONTENTS -->
## Table of Contents
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#demo">Demo</a>
      <ul>
        <li><a href="#site">Site</a></li>
        <li><a href="#searching-the-movie-database">Searching the Movie Database</a></li>
        <li><a href="#connecting-your-google-calendar">Connecting Your Google Calendar</a></li>
        <li><a href="#adding-and-deleting-reminders">Adding and Deleting Reminders</a></li>
      </ul>
    </li>
    <li><a href="#feature-roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgments</a></li>
  </ol>



<!-- ABOUT THE PROJECT -->
## About The Project
 <table>
<tr>
<td>
  A webapp using The Movie Database API and Google Calendar API. 
  </br> Use it to search for tv shows or movies by title and get reminders on their releases on your Google Calendar. 
</td>
</table>

### Built with 
- [ReactJS](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Create React App](https://create-react-app.dev/) - Create React apps with no build configuration.
- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for node.
- [Bootstrap](http://getbootstrap.com/) - Extensive list of components and  Bundled Javascript plugins.
- [React Oauth2 | Google ](https://github.com/MomenSherif/react-oauth) - Google OAuth2 using the new Google Identity Services SDK for React
- [Google Calendar API](https://developers.google.com/calendar/api) - Integrate your app with Google Calendar, creating new ways for you to engage your users.
- [TheMovieDatabaseAPI](https://developers.themoviedb.org/3) - Millions of movies, TV shows and people to discover. 
- [React Icons](https://react-icons.github.io/react-icons/search) - Include popular icons in your React projects easily with react-icons, which utilizes ES6

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>



<!-- SITE -->
## Demo

### Site
Here is a working live demo: [TBA](#)

### Searching The Movie Database
![](https://github.com/encarnac/tv-movie-reminder/blob/main/search-demo.gif)

### Connecting Your Google Calendar   
![](https://github.com/encarnac/tv-movie-reminder/blob/main/google-login-demo.gif)

### Adding and Deleting Reminders
![](https://github.com/encarnac/tv-movie-reminder/blob/main/add-delete-demo.gif)

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>



<!-- ROADMAP -->
## Feature Roadmap
### v1.0.0
- [x] Configure server to call TMDB for titles
- [x] Display list of results as cards
- [x] Toggle modal with selected card's details
- [x] Authenticate the Google Oauth2 Client
- [x] Display user's Google Calendar events
- [x] Delete a reminder from the user's calendar
- [x] Add a movie to the user's calendar
- [ ] Add a show to the user's calendar
- [ ] Create 'tv-movie' calendar if none exists
- [ ] Display user’s info in offcanvas
### v1.1.0
- [ ] Implement useReducer 
- [ ] Implement useContext
- [ ] Optimize rendering and remove unnecessary useEffect
- [ ] Implement proper React Router 6
- [ ] Add additional animations for cohesiveness
### v2.0.0
- [ ] Sort list of events by most recent
- [ ] Autohide past events from rendering
- [ ] Mass delete content from watchlist
- [ ] Selectively add episode reminders
- [ ] Create a database to store calendar offline
- [ ] Handle refresh tokens
### Other
- [ ] Deploy a live demo


<p align="right">(<a href="#table-of-contents">back to top</a>)</p>



<!-- CONTACT -->
## Contact
[Colene Encarnado](https://github.com/encarnac)

Email: [coleneencarnado@gmail.com](coleneencarnado@gmail.com
) 
  
  Project Link: [https://github.com/encarnac/tv-movie-reminder](https://github.com/encarnac/tv-movie-reminder)

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>



<!-- LICENSE -->
## License
Distributed under the MIT ©  License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
Google Button CSS from [@google-react-login](https://github.com/anthonyjgrove/react-google-login)

Loading spinner from [Contact Mentor](https://contactmentor.com/how-to-add-loading-spinner-react-js/)

Animated scroll icon from [Unused CSS](https://unused-css.com/blog/animated-down-arrow/)

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com

