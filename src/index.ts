import * as _ from 'lodash';
import {Loader, LoaderOptions} from "google-maps";
const options: LoaderOptions = {};
const loader = new Loader(`${process.env.GOOGLE_MAP_API}`);
let myPlaces : Array<object> = []

loader.load().then(function (google) {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
    });
    map.addListener('click', addPlace)
});


function addPlace (event : google.maps.MapMouseEvent) {
    myPlaces.push({
        position: event
    })
    // 마커가 추가되면 랜더링하면서 localStorage와 동기화한다
    localStorage.setItem('myPlaces', JSON.stringify(myPlaces))
}

// function renderMarkers () {
//     googleMap.markerList.forEach(m => m.setMap(null)) // 모든 마커 제거
//     googleMap.markerList = []
//     // myPlaces 배열의 요소를 기반으로 마커를 추가한다
//     myPlaces.forEach(place => {
//         const marker = new google.maps.Marker({
//             position: place.position,
//             map: googleMap
//         })
//         googleMap.markerList.push(marker)
//     })
// }
