import {google} from "google-maps";

export interface position {
    position: google.maps.LatLng;
    name: string
}

export interface clearMap {
    setMap: (arg0: any) => any;
}

export interface googleMap extends google.maps.Map {
    markerList?: any []
}
