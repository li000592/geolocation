// If a Geocoding Error occurs then display a message with the reason for the error.
let currentLat = '';
let currentlng = '';
let button = document.getElementById('button');

document.addEventListener('DOMContentLoaded', init);

function init(){  
    button.addEventListener('click', clicked);
}

// Once the geolocation call has begun, it should tell the user that it is trying to determine the current location.
function clicked(){
    let info = document.getElementById('info');
    let p = document.createElement('p');     
    p.textContent = "It is trying to determine the current location...";
    info.appendChild(p);  
    if(navigator.geolocation){
        options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

// Once the position has been found display a message that includes the latitude and longitude.
    navigator.geolocation.getCurrentPosition(gotPost, postFail, options); 
    }else{
// If a Geolocation Error occurs then display a message with the reason for the error.
    let info = document.getElementById('info');
    let p = document.createElement('p');     
    p.textContent = "errors in ";
    info.textContent = 'err';
    }
}

// After the geocoding call is returned, display the user's formatted_address from the first result in the result set.
function gotPost(position){
    let info = document.getElementById('info');
    let p = document.createElement('p');     
    currentLat = position.coords.latitude;
    currentlng = position.coords.longitude;
    buildMyMap(position);
    p.textContent = "Your lat is " + currentLat + "  and lng is " + currentlng + '.' ;   
    info.appendChild(p);
    const KEY= 'AIzaSyDqaIZXk5oph6al8EfUF1dOEWFP--mSCqc'
    let LAT = currentLat;
    let LNG = currentlng;
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${LAT},${LNG}&key=${KEY}`;

    fetch(url)
    .then(response => response.json())
    .then( data => {
            let info = document.getElementById('info');
            let p = document.createElement('p');     
            p.textContent = "Your formatted address is " + data.results[0].formatted_address + '.';
            info.appendChild(p);  
    })
    .catch(err => console.warn(err.message));
}

function postFail(err){
    let errors = {
        1: 'No permission',
        2: 'Unable to determine',
        3: 'Took too long'
    }
    let info = document.getElementById('info');
    let p = document.createElement('p');     
    p.textContent = errors[err];;
    info.appendChild(p); 
}

function buildMyMap(position){
    let myLatLng = {lat: currentLat, lng: currentlng};
    let map = new google.maps.Map(document.getElementById("map"),{
        center:{
            lat: currentLat,
            lng: currentlng
        },
        zoom:14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    })
    let marker = new google.maps.Marker({
        position: myLatLng,
        title: 'Hellow World!'
    });
    marker.setMap(map);
}