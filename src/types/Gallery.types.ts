import {LatLng} from '.';

export type FBPhoto = {
  title: string;
  photoPath: string;
  photoUrl: string;
  createdAt: string;
  authorID: string;
  location?: LatLng;
};
