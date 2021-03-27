import {Loader} from "google-maps";

export const loader = new Loader(`${process.env.GOOGLE_MAP_API}`);

export const googleSetting = async () => await loader.load();
