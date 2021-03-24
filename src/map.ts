import {addPlace, getPlaces} from "./dataService";
import {clearMap} from "./type";
    interface googleMap extends google.maps.Map{
        markerList? : any []
    }
let googleMap: googleMap;

function init() {
    googleMap = new google.maps.Map(document.getElementById('map'), {
        center : { lat : 0, lng: 0},
        zoom: 3
    })

    googleMap.markerList = [];
    googleMap.addListener('click', addMarker);
}

function addMarker(event: { latLng: any; }) {
    addPlace(event.latLng);
    renderMarkers();
}

function renderMarkers(){
    googleMap.markerList.forEach((m: clearMap) => m.setMap(null));
    googleMap.markerList = [];

    getPlaces().forEach(place => {
        const marker  = new google.maps.Marker({
            position: place.position,
            map: googleMap
        });

        googleMap.markerList.push(marker);
    })
}

init();
