export interface Station {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: ConnectedCities[];
}

export interface ConnectedCities {
  id: string;
  distance: number;
}

export interface LocationData {
  city: string;
  latitude: number;
  longitude: number;
}
