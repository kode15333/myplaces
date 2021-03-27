import {getPlaces, subscribe} from "./dataService";
import {position} from "./type";

const renderCities = (placesArray: position[]): void => {
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
