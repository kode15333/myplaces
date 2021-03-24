import {google} from "google-maps";

export interface position{
    position : google.maps.LatLng;
}

export interface clearMap{
  setMap: (arg0: any) => any;
}
