import {addPlace, getPlaces, subscribe} from "./dataService";
import {clearMap, googleMap } from "./type";
import {googleSetting } from "./google";

let googleMap: googleMap;

export const showMap : () => void = async () => {
    const google = await googleSetting();
    googleMap = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.49844438289986, lng: 127.35708799732791},
        zoom: 10
    })

    googleMap.markerList = [];
    googleMap.addListener('click', addMarker);


    renderMarkers();
    subscribe(renderMarkers);

}

const addMarker : (event : google.maps.MapMouseEvent | google.maps.IconMouseEvent) => void = (event) => {
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
