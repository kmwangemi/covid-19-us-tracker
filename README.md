# COVID-19 US Tracker

### [Live Site](https://kmwangemi.github.io/covid-19-us-tracker/)

![COVID-19 Tracker](https://github.com/kmwangemi/covid-19-us-tracker/blob/main/public/covid-img.png)

## Introduction
This is a code repository for dispaying COVID-19 cases reported in the US states. It mainly focuses on the front end part of the application. 

I have used create-react-app for scaffolding the project. The libraries and packages I have used in the project include: @react-google-maps/api which provides very simple bindings to the google maps api and lets you use it in your app as React components, use-places-autocomplete, which helps you build a UI component with the feature of place autocomplete easily! By leveraging the power of Google Maps Places API, numeral, A javascript library for formatting and manipulating numbers, react-count-animation for animating numbers count and Material UI and SASS for styling the components.

Given additional time, I could have improved more on the UI to look more appealing, and add more features, like charts for displaying the data

API used: I used two Json files, usStates.json for getting US States data and worldwide.json for getting worldwide data, both included in the project repository. I had to manipulate the data to represent the given UI, since the given url `https://www.trackcorona.live/api` was not working.

## Limitations
This application only works on the US States. This includes: Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut,
Delaware, Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Massachusetts,
Michigan, Minnesota, Mississippi, Missouri, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina, North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina, South Dakota, Tennessee, Texas, Utah, 
Vermont, Virginia, Washington, West Virginia, Wisconsin and Wyoming. The latitude and longitudes should be exactly as indicated in
the usStates.json file. Otherwise the data displayed will default to worldwide.json data.

## Setup:
- clone the repository from `https://github.com/kmwangemi/covid-19-us-tracker`
- Move to the folder and open the project in your favorite editor
- Create a .env file 
- Add your google maps api in the following format: REACT_APP_GOOGLE_MAPS_API_KEY="xxx...."
- run ```npm i && npm start```
