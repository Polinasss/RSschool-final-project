export type Stations = Station[];

export interface Station {
  id: number;
  city: string;
  latitude: number;
  longitude: number;
  connectedTo: ConnectedTo[];
}

export interface ConnectedTo {
  id: number;
  distance: number;
}
