![watch-soon](https://user-images.githubusercontent.com/76987299/184469224-16a690f8-74f9-4f21-9b7b-ff007c7bccf1.png)

# tv-movie-reminder (aka watch-soon)
[![Bootstrap][Bootstrap.com]][Bootstrap-url]
[![React][React.js]][React-url]
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
      <a href="#sample-use">Sample Use</a>
      <ul>
        <li><a href="#searching-the-movie-database">Searching the Movie Database</a></li>
        <li><a href="#using-google-calendar">Using Google Calendar</a></li>
      </ul>
    </li>
    <li>
    <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>



<!-- ABOUT THE PROJECT -->
## About The Project
 <table>
<tr>
<td>
  A webapp using The Movie Database API and Google Calendar API. 
  </br> Use it to search for tv shows or movies by titland get reminders on their releases on your Google Calendar. 
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
## Sample Use

### Searching The Movie Database
![](https://github.com/encarnac/tv-movie-reminder/raw/main/watch-soon-tv.gif)

### Using Google Calendar   
&nbsp;&nbsp;&nbsp;&nbsp; Full implementation still in progress... stay tuned!

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

This repository is meant to be ran locally as a development build on your local machine until further notice. You are expected to alter environment variables beforehand. 

### Installation

Express.js Backend (`/server`)

1. Inside `/server`, create a .env file in the root folder 
   
    ```sh
    PORT = <fourdigits>
    ```

2. Install packages in the `/server` directory, then run
   ```sh
   npm install
   npm start
   ```
<br />
React JS Frontend (`/react-client`)

1. Install packages in the `/react-client` directory, then run
   ```sh
   npm install
   npm start 
   ```

<br />
Python ( `/services `)

1. Create a virtual environment in the `/services` directory
   ```
   python3 -m venv venv
   ```

2. Activate your Python venv
   ```
   venv\Scripts\Activate.ps1
   ```

3. Install the Python packages
    ```
    pip3 install -r requirements.txt 
    ```

4. Run the Python microservice at `/services/tmdb-api`
    ``` 
    py tmdb_handler.py
    ```

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>



<!-- ROADMAP -->
## Feature Roadmap
- [x] Configure server to call TMDB for titles
- [x] Display list of results as cards
- [x] Toggle modal with selected card's details
- [x] Authenticate the Google Oauth2 Client
- [ ] Display user's Google Calendar events
- [ ] Add a show/movie to the user's calendar
- [ ] Delete a reminder from the user's calendar

<p align="right">(<a href="#table-of-contents">back to top</a>)</p>


<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
Google Button CSS from [google-react-login](https://github.com/anthonyjgrove/react-google-login)

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



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com

