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
    <li>      
        <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#setup">Setup</a></li>
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
&nbsp;&nbsp;&nbsp;&nbsp; Full implementation still in progress... stay tuned!

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
This repository is meant to be ran locally on your personal machine until further notice. 

It integrates OAuth2.0 for testing and development, but has not been verified by Google for production. The Google accounts able to use its OAuth2 capabilities depends on your Google Cloud Console project and local environment variables setup. 


### Prerequisites
- Get an API KEY from The Movie Database [here](https://www.themoviedb.org/settings/api)  
  - Create `services/config.py` 
        
        api_key=<YOUR_API_KEY_HERE>
        
- You must get an OAuth2.0 <b>client_id</b> and <b>client_secret</b> for a Google Cloud project by following [this guide](https://support.google.com/googleapi/answer/6158849)
     1. Create `react-client/.env`
        ```
        REACT_APP_CLIENT_ID=<YOUR_CLIENT_ID_HERE>
        ```
    1. Create `server/.env`
        ```
        PORT=5000
        CLIENT_ID=<YOUR_CLIENT_ID_HERE>
        CLIENT_SECRET=<YOUR_CLIENT_SECRET_HERE>
        
        ```


### Setup
1. Clone the repository and go to its root directory in your terminal
2. Install packages and run the frontend in `/react-client` and backend in `/server`

    ```
    npm install
    npm start
    ```
3. Run the following commands to create a virtual environment, install packages, and run the API service in `/services`   
    ```
    python3 -m venv venv
    venv\Scripts\Activate.ps1
    pip3 install -r requirements.txt 
    py tmdb_handler.py 
    ```
4. You can now view a live local copy in http://localhost:3000

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>



<!-- ROADMAP -->
## Feature Roadmap
- [x] Configure server to call TMDB for titles
- [x] Display list of results as cards
- [x] Toggle modal with selected card's details
- [x] Authenticate the Google Oauth2 Client
- [x] Display user's Google Calendar events
- [ ] Create 'tv-movie' calendar if none exists
- [x] Add a movie to the user's calendar
- [ ] Add a show to the user's calendar
- [x] Delete a reminder from the user's calendar

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

