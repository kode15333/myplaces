import Store from './store.js';

export const store = new Store({'myPlace': []});

let myPlaces = [];
const geocoder = new google.maps.Geocoder;

let changeListeners = [];

function subscribe(callbackFunction) {
  changeListeners.push(callbackFunction);
}

function publish(data) {
  changeListeners.forEach((changeListener) => { changeListener(data); });
}

export const addPlace = (latLng) => {
  geocoder.geocode({ 'location': latLng }, function (results) {
    try {
      const cityName = results
        .find(result => result.types.includes('locality'))
        .address_components[0]
        .long_name;

      myPlaces.push({ position: latLng, name: cityName });

      store.set({'myPlace': [...myPlaces]})

      localStorage.setItem('myPlaces', JSON.stringify(myPlaces));
    } catch (e) {
      console.log('No city found in this location! :(');
    }
  });
}

/* ... */



function initLocalStorage() {
  const placesFromLocalstorage = JSON.parse(localStorage.getItem('myPlaces'));
  if (Array.isArray(placesFromLocalstorage)) {
    myPlaces = placesFromLocalstorage;
    console.log(myPlaces)
    store.on('myPlace', () => null);
    store.set({'myPlace': [...myPlaces]})
    console.log(store.get())
  }
}

export const getPlaces = () => {
  return myPlaces;
}
initLocalStorage();

