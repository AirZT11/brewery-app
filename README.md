# The Brewery Finder

Welcome to The Brewery Finder! This app enables users to locate breweries all across
the United States. Leveraging the OpenBreweryDB and react-google-maps API, users can query
a datebase of over 7,000 breweries and display their locations on a Google Maps interface.
The current version enables users to signup/login and utilize features such as reviewing &
rating breweries, displaying reviewed breweries, and locating breweries near user location.

## Features

- Sign up and Login
- Review & rate breweries
- Display average ratings for specific brewery
- Search for specific breweries based on name, zip code, state, city
- Locate breweries based on user's current location
- Display personalized list of reviewed breweries
- Find directions to specified brewery
- Display average rating for specific brewery

## Technologies/Libraries/APIs

- React.js
- Redux
- OpenBreweryAPI
- react-google-maps/api
- axios
- react-burger-menu
- react-icons
- react-loading
- react-router-dom
- react-star-ratings
- reactjs-popup

## API Reference

[Backend Repo](https://github.com/AirZT11/breweryApp-backend)

## FAQ

#### Question 1 - npm start resulting in "error:0308010C:digital envelope routines::unsupported"

If you use the current LTS version of Node.js then this error will not come.
Downgrade your Node.js version to the current LTS version (16.13.0).
There can be multiple ways to install the required version.
One of them is using nvm (Node.js version manager).

- Step 1: Install nvm (if not installed, follow Install Node.js Locally with Node Version Manager (nvm))
- Step 2: nvm install 16.13.0 (put your required version here)

Resource: https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported

## Authors

[@AirZT11](https://www.github.com/AirZT11)

## Support

For support, email samjkim11@gmail.com

## Contributing

Contributions are always welcome!

#### Clone repo:

- Frontend: `git clone https://github.com/AirZT11/brewery-app.git`
- Backend: `git clone https://github.com/AirZT11/breweryApp-backend.git`

#### Create your own react-google-maps API Key

- Create a google cloud platform account
- Enable the Maps Javscript API and create a Key (_make sure to establish HTTP restrictions_)
- Implement key into Map component

#### Refer to Brewery App V2 in projects tab

- Please feel free to go through **To do** items
- Make sure to move each **To do** item to **In progress**
- Detail and document each commit
- Provide as many details as possible for any submitted pull requests
