import { getPlaces, store } from './dataService.js'

store.on('myPlace', renderCities);
function renderCities() {
  // Get the element for rendering the city list...
  const cityListElement = document.getElementById('citiesList');

  // ...clear it...
  cityListElement.innerHTML = '';

  // ...and populate it, one place at a time using forEach function
  const {myPlace} = store.get();
  myPlace.forEach((place) => {
    const cityElement = document.createElement('div');
    cityElement.innerText = place.name;
    cityListElement.appendChild(cityElement);
  });
}



renderCities();
