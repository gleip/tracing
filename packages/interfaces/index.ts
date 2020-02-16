import { CARRIER } from '../common/constants';

export interface Location {
  lat: number;
  lng: number;
}

export interface Device {
  id: string;
  regionId: string;
  userId: string;
  connected: boolean;
}

export interface User {
  id: string;
  name: string;
  address: string;
}

export interface ConnectedDevice extends Device {
  user: User;
  connected: true;
  location: Location;
}

export type Msg<D = Object> = {
  [CARRIER]?: { [key: string]: string };
} & D;
