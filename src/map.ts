import {addPlace, getPlaces, subscribe} from "./dataService";
import {clearMap, googleMap} from "./type";
import {googleSetting } from "./google";

let googleMap: googleMap;

export async function showMap()  {
    const google = await googleSetting();
    googleMap = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 3
    })

    googleMap.markerList = [];
    googleMap.addListener('click', addMarker);


    renderMarkers();
    subscribe(renderMarkers);

}

function addMarker(event : google.maps.MapMouseEvent | google.maps.IconMouseEvent) {
    addPlace(event.latLng);
    renderMarkers();
}

function renderMarkers() : void{
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
