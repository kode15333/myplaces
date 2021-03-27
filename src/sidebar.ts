import {getPlaces, subscribe} from "./dataService";
import {position} from "./type";

function renderCities(placesArray: position[]){
    const cityListElement = document.getElementById('citiesList');

    cityListElement.innerHTML = '';

    placesArray.forEach(place => {
        const cityElement = document.createElement('div');
        cityElement.innerHTML = place.name;
        cityListElement.appendChild(cityElement);
    })
}


renderCities(getPlaces());
subscribe(renderCities);
