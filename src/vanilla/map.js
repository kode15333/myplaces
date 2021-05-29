import { addPlace, getPlaces, store } from './dataService.js'

let googleMap;

store.on('myPlace', renderMarkers);
function renderMarkers() {
  googleMap.markerList.forEach(m => m.setMap(null)); // remove all markers
  googleMap.markerList = [];

  const {myPlace} = store.get();
  myPlace.forEach((place) => {
    const marker = new google.maps.Marker({
      position: place.position,
      map: googleMap
    });

    googleMap.markerList.push(marker);
  });
}

function init() {
  googleMap = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.49844438289986, lng: 127.35708799732791},
    zoom: 10
  });

  googleMap.markerList = [];
  googleMap.addListener('click', addMarker);
}

function addMarker(event) {
  addPlace(event.latLng);
}

init();
renderMarkers();
