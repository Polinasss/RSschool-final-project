import { Order } from './order';

export const mockOrders: Order[] = [
  {
    id: 101,
    rideId: 45,
    routeId: 18,
    seatId: 33,
    userId: 4,
    status: 'active',
    path: [156, 15, 52, 31, 88, 157],
    carriages: ['carriage_type_1'],
    schedule: {
      segments: [
        {
          time: ['2024-08-15T20:28:00Z', '2024-08-15T23:00:00Z'],
          price: {
            'dynamic-carriage-type-1': 250,
          },
        },
      ],
    },
  },
  {
    id: 102,
    rideId: 46,
    routeId: 19,
    seatId: 10,
    userId: 4,
    status: 'completed',
    path: [43, 10, 72, 21, 58, 44],
    carriages: ['carriage_type_3'],
    schedule: {
      segments: [
        {
          time: ['2024-08-14T18:00:00Z', '2024-08-14T22:30:00Z'],
          price: {
            'dynamic-carriage-type-3': 180,
          },
        },
      ],
    },
  },
  {
    id: 103,
    rideId: 47,
    routeId: 20,
    seatId: 45,
    userId: 4,
    status: 'rejected',
    path: [153, 5, 62, 11, 48, 154],
    carriages: ['carriage_type_5'],
    schedule: {
      segments: [
        {
          time: ['2024-08-16T07:00:00Z', '2024-08-16T12:00:00Z'],
          price: {
            'dynamic-carriage-type-5': 100,
          },
        },
      ],
    },
  },
];
