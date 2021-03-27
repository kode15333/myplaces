import {position} from "./type";
import {googleSetting} from "./google";

let myPlaces: position[] = [];
const changeListeners: any[] = [];

export const subscribe:(callbackFunction: Function) => void  = (callbackFunction) => {
    changeListeners.push(callbackFunction);
}


const publish :(data?: position[]  ) => void = (data = []) => {
    changeListeners.forEach((changeListener) => {
        changeListener(data);
    });
}

export const addPlace: (latLng: google.maps.LatLng) => Promise<void> = async (latLng) => {
    const google = await googleSetting();
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({location: latLng}, function (results) {
        try {
            const cityName = results
                .find(result => result.types.includes('locality'))
                .address_components[0]
                .long_name;

            myPlaces.push({position: latLng, name: cityName});
            publish(myPlaces);

            localStorage.setItem('myPlaces', JSON.stringify(myPlaces));
        } catch (e) {
            console.error('No city found in this location! :(')
        }
    })
}

export function getPlaces(): position[] {
    return myPlaces;
}

function initLocalStorage() {
    const placesFromLocalstorage = JSON.parse(localStorage.getItem('myPlaces'));
    if (Array.isArray(placesFromLocalstorage)) {
        myPlaces = placesFromLocalstorage;
        publish();
    }
}

initLocalStorage();
