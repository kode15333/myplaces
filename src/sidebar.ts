import { getPlaces} from "./dataService";

function renderCities(){
    const cityListElement = document.getElementById('citiesList');

    cityListElement.innerHTML = '';

    getPlaces().forEach(place => {
        const cityElement = document.createElement('div');
        cityElement.innerHTML = place.name;
        cityListElement.appendChild(cityElement);
    })
}

renderCities();
