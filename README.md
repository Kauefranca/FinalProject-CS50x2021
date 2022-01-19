# Guenshinguessrr

### Video Demo:  https://www.youtube.com/watch?v=jD2-LjISAr8

### Description:
The main idea behind this project was a site called geoguessr, on this site you need to point as close as you can to a given location on the map by just looking at a street view of somewhere.
The routes for the project were made by using the flask module from python.
For making the interactive map I used a javascript lib called Leaflet (probably the hardest part), at the start I didn't have any knowledge of maps and tiles but with some google searches I managed to get it correct.

### main.py
This file is the root to the project, it’s the place where everything starts. For this file I used some templates from pset9/finance and it basically just returns a html for some routes and parse data from the database.

### templates/layout.html
This file is the site layout that helps with no need to repeat the entire doctype html, title etc.

### templates/index.html
It’s the index for the site that uses some template from layout.html and has a form that asks the user for their name.

### templates/play.html
Here is where the magic happens, this file is the main game, after the user writes their name and clicks play on the index, they post this url that gets random images from the database from another route called /getlocations and this page renders the map and image for the user to make their guess.There’s also a trick for loading images, i placed a loading gif on the top of the guess image that disappears when it loads for complete.

### static/images
This place is where I store every image that the site renders including guess locations, pins and the loading gif.

### static/js
Here is the only javascript file that controls the game and renders the map place markers, lines and controls zooming. He uses a lib called [Leaflet](https://leafletjs.com).

### static/tiles
That's probably the hardest part for making an interactive map, I needed to make a helper for downloading every image from the game map with the correct name for tiles that leaflet uses. The helper is on /download.js (I explain better what it does on the next topic).

### download.js
For this file I used [Node.js](https://nodejs.org/en/) because it's probably the language that I'm most comfortable with. This file uses a module called request for downloading images from the original game map. It was a little tricky not gonna lie, the original map uses some routes and redirects for rendering the images, I spent a long time trying to understand how that was actually working.

### static/*.css
Here is all the site css, I tried to make it as simple as possible and responsive as possible, after testing it i feel very comfortable with the result.

### locations.db
This is my database that I used sqlite3. It only has a single table that stores every location with their id, url, latitude and longitude.

### templates.sql
This is the file that i use for keep on track how is my .db file and it helps me to add more locations

## Conclusion
I’m also hosting this app on [heroku](https://genshinguessr.herokuapp.com) and I have plans to add more locations and keep it updated.
I loved working on this project, I loved this entire course. It was an incredible experience for me that I'm never gonna forget.