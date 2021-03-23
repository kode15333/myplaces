import {google, Loader, LoaderOptions} from "google-maps";
import { position} from "./type";
const options: LoaderOptions = {};
const loader = new Loader(`${process.env.GOOGLE_MAP_API}`);
let myPlaces : position[] = []
let googleMap: any;
export async function init() {
    const google = await loader.load();
    googleMap = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
    });
    googleMap.markerList = [];
    googleMap.addListener('click', addPlace);
    const placesFromLocalstorage : position[] = JSON.parse(localStorage.getItem('myPlaces'));
    if(placesFromLocalstorage){
        myPlaces = placesFromLocalstorage;
        renderMarkers()

    }

}

function addPlace (event : google.maps.MapMouseEvent) {
    myPlaces.push({
        "position": event.latLng
    })
    // 마커가 추가되면 랜더링하면서 localStorage와 동기화한다
    localStorage.setItem('myPlaces', JSON.stringify(myPlaces));
    renderMarkers()
}

function renderMarkers () {
    googleMap.markerList.forEach((m: { setMap: (arg0: any) => any; }) => m.setMap(null)) // 모든 마커 제거
    googleMap.markerList = []
    // myPlaces 배열의 요소를 기반으로 마커를 추가한다
    myPlaces.forEach(place => {
        const marker = new google.maps.Marker({
            'position': place.position,
            'map' : googleMap
        })
        googleMap.markerList.push(marker)
    })
}
