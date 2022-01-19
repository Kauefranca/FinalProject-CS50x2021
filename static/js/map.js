const center = L.latLng(50, -130);
const loaderImage = document.querySelectorAll('img#guess-img').item(1);
var clicked = false;
var map, markers, lines;
var totalScore = 0;

function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))/2;

    return dist = 4500 * Math.asin(Math.sqrt(a));
}

function adjustZoom(line){
    var latlngs = line.getLatLngs();
    for(var i = 1; i < latlngs.length; i++){
        var newLatLng = map.unproject(map.project(latlngs[i-1])._add(map.project(latlngs[i]))._divideBy(2));
        map.setView(newLatLng, 4);
    }
}

function calculateDistance() {
    cord1 = userMarker.getLatLng();
    cord2 = correctMarker.getLatLng();
    return distance(cord1['lat'], cord1['lng'], cord2['lat'], cord2['lng']);
}

function calculateScore(dist) {
    if (dist <= 3) return 300 // 3 meters margin
    return Math.ceil(Math.max(300 - dist * 300 / 550, 0));
}

function startMap() {
    map = L.map('map', {
        zoom: 2,
    })
    .setView(center, 3)
    .setMaxBounds([[100, -270], [-66.5, 0]]);

    L.tileLayer('static/tiles/{z}/{x}-{y}.jpeg', {
        noWrap: true,
        minZoom: 2,
        maxZoom: 6,
    })
    .addTo(map);

    lines = new L.LayerGroup().addTo(map);
    markers = new L.LayerGroup().addTo(map);

    correctMarker = new L.Marker([50, -131], {
    opacity: 0,
    draggable: false,
    icon: L.icon({
        iconUrl: 'static/images/correctPin.png',
        iconAnchor: [25, 48],
        iconSize: [50, 50]
        })
    }).addTo(markers);

    userMarker = new L.Marker(center, {
    opacity: 0,
    icon: L.icon({
        iconUrl: 'static/images/userPin.png',
        iconAnchor: [25, 48],
        iconSize: [50, 50]
        })
    }).addTo(markers);

    map.on('click', (e) => {
        if (clicked) return;
        document.getElementById('submitGuess').disabled = false;
        userMarker.setLatLng([e.latlng.lat, e.latlng.lng]);
        userMarker.setOpacity(1);
        // console.log(userMarker.getLatLng());
    });
}

function nextLocation() {
    document.getElementById('submitGuess').removeEventListener('click', nextLocation);
    if (currentGame >= 4) return endGame();
    loaderImage.style.display = 'block';
    document.getElementById('submitGuess').innerHTML = 'Submit';
    document.getElementById('submitGuess').disabled = true;
    document.getElementById('score').innerHTML = '';
    window.currentGame++;
    setGuessImg();
    polyline.remove();
    userMarker.setOpacity(0);
    correctMarker.setOpacity(0);
    clicked = false;
}

function startListeners() {
    document.getElementById('submitGuess').addEventListener('click', submitGuess);
    document.getElementById('ok').onclick = function() {
        document.getElementById('textModal').style.display = "none";
    };
    document.getElementById('guess-img').addEventListener('load', () => {
        loaderImage.style.display = 'none';
    })
    // loaderImage
}

function submitGuess() {
    if (document.getElementById('submitGuess').innerHTML == 'Next') {
        nextLocation();
    }
    else {
        clicked = true;
        correctMarker.setOpacity(1);
        correctMarker.setLatLng([window.locations[window.currentGame].lat, window.locations[window.currentGame].long]);
        polyline = L.polyline([userMarker.getLatLng(), correctMarker.getLatLng()], {
            color: "red",
            weight: 3,
            opacity: 1,
            smoothFactor: 1
        }).addTo(lines);
        adjustZoom(polyline);
        document.getElementById('submitGuess').innerHTML = 'Next';
        dist = calculateDistance();
        totalScore += calculateScore(dist);
        document.getElementById('scoreText').innerHTML = `You guessed ${Math.ceil(dist)} meter(s) away and got ${calculateScore(dist)} points`;
        document.getElementById('textModal').style.display = 'block';
    }
}

function endGame() {
    document.getElementById('finalScoreText').innerHTML += 'your total score is';
    document.getElementById('finalScoreNumber').innerHTML = `${totalScore}/1500`;
    document.getElementById('modal').style.display = 'block';
    document.getElementById('restart').addEventListener('click', () => {
       document.location.reload(true);
    });
}


function createGame() {
    startMap();
    startListeners();
}

function setGuessImg() {
    document.getElementById('guess-img').setAttribute('src', window.locations[window.currentGame].url);
}

document.addEventListener("DOMContentLoaded", function() {
    createGame();
});