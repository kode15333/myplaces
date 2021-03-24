let myPlaces: { position: any; name: string; }[] = [];
const geocoder = new google.maps.Geocoder();

export function addPlace(latLng: any) {
    geocoder.geocode({location: latLng}, function (results){
        try {
            const cityName = results
                .find(result => result.types.includes('locality'))
                .address_components[0]
                .long_name;

            myPlaces.push({position: latLng, name: cityName});

            localStorage.setItem('myPlaces', JSON.stringify(myPlaces));
        } catch (e) {
            console.error('No city found in this location! :(')
        }
    })
}

export function getPlaces() {
    return myPlaces;
}

function initLocalStorage() {
    const placeFromLocalStorage = JSON.parse(localStorage.getItem('myPlaces'));
    if(Array.isArray(placeFromLocalStorage)) {
        myPlaces = placeFromLocalStorage;
        // publish();
    }
}

initLocalStorage();
