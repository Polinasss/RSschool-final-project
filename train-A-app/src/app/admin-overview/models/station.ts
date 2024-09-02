export interface Station {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: ConnectedCities[];
}

export interface ConnectedCities {
  id: number;
  distance?: number;
}

export interface LocationData {
  city: string;
  latitude: number;
  longitude: number;
}

export interface StationBody {
  city: string;
  latitude: number;
  longitude: number;
  relations: number[];
}

export interface StationResponse {
  id: number;
}
