This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Title

Welcome to Movie War!

## Motivation
My classmates and I love movies. And we love arguing over them even more. When it came time to dream up a project, we thought that we could replicate that dynamics using the rules to the classic card game "war", but with IMDb scores, since unlike Metracritic an Rotten Tomatoes, IMDb scores are user derived and as such, are a better reflection of popular opinion. 

## Build Status
The game is mostly complete. The other devs and I are discussing implementing new and more modular rules, which will be implemented at some point int he future. 

## Code Style
Indentation.

## Frameworks
This app uses React and Rails API with a Postgres database on the back end. The API is seeded from sanitized data however, and movies are not called from the API. 

## Installation
This was a group project, and the most final version has been deployed to heroku. To experience the project, please visit https://moviewar.herokuapp.com/

## How to use
There are two ways to play the game. The user can either create their own hand (Generate Your Own Deck). When they click on this option, they must use the search bar to select ten movies. They may also jump right in with a randomly generated deck (Play With a Random Deck). Either way, each turn the program will command the user to try and select a movie with an IMDb rating of either higher or lower score than the "House Card", whose score is not known to the player. Only your knowledge of pop cinema can determine that! The player must than select a card 

## License
GNU 
