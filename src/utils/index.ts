import {LatLng} from '../types';

export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
};

export const formatLatLng = (latlng: LatLng) => {
  return `${latlng.latitude.toFixed(7)}, ${latlng.longitude.toFixed(7)}`;
};

export const formatPoints = (points: number = 0) => {
  return points.toFixed(2);
};
