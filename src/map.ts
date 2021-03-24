import {addPlace, getPlaces} from "./dataService";
import {clearMap, googleMap} from "./type";
import {Loader} from "google-maps";
const loader = new Loader(`${process.env.GOOGLE_MAP_API}`);

let googleMap: googleMap;

async function init() {
    const google = await loader.load();
    googleMap = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 3
    })

    googleMap.markerList = [];
    googleMap.addListener('click', addMarker);
}

function addMarker(event: { latLng: any; }) {
    addPlace(event.latLng);
    renderMarkers();
}

function renderMarkers() {
    googleMap.markerList.forEach((m: clearMap) => m.setMap(null));
    googleMap.markerList = [];

    getPlaces().forEach(place => {
        const marker = new google.maps.Marker({
            position: place.position,
            map: googleMap
        });

        googleMap.markerList.push(marker);
    })
}

init();
