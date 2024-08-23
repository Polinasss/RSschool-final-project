import { Station } from './station';

export const MOCK_STATIONS: Station[] = [
  {
    id: 1,
    city: 'London',
    latitude: 51.5074,
    longitude: -0.1278,
    connectedTo: [
      { id: '2', distance: 120 },
      { id: '3', distance: 344 },
    ],
  },
  {
    id: 2,
    city: 'Bristol',
    latitude: 51.4545,
    longitude: -2.5879,
    connectedTo: [{ id: '1', distance: 120 }],
  },
  {
    id: 3,
    city: 'Paris',
    latitude: 48.8566,
    longitude: 2.3522,
    connectedTo: [{ id: '1', distance: 344 }],
  },
];
