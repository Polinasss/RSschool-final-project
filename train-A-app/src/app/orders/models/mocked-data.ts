export const mockOrders = [
  {
    id: 1,
    rideId: 620,
    routeId: 162,
    userId: 2,
    seatId: 27,
    status: 'active',
    stationStart: 4,
    stationEnd: 139,
    carriages: [
      'carriage4',
      'carriage4',
      'carriage5',
      'carriage3',
      'carriage5',
      'carriage2',
      'carriage4',
      'carriage5',
      'carriage2',
      'carriage2',
      'carriage1',
      'carriage1',
      'carriage3',
      'carriage2',
      'carriage4',
    ],
    path: [
      101, 86, 85, 45, 21, 117, 111, 4, 81, 3, 5, 118, 7, 71, 62, 128, 60, 97, 79, 139, 91, 63, 106,
      99, 83, 51, 153, 66,
    ],
    schedule: {
      segments: [
        {
          time: ['2024-08-25T03:08:32.659Z', '2024-08-26T12:52:32.659Z'],
          price: {
            carriage4: 1650,
            carriage5: 1066,
            carriage3: 378,
            carriage2: 2338,
            carriage1: 328,
          },
        },
        {
          time: ['2024-08-26T13:11:32.659Z', '2024-08-28T10:25:32.659Z'],
          price: {
            carriage4: 2093,
            carriage5: 1064,
            carriage3: 1595,
            carriage2: 818,
            carriage1: 2083,
          },
        },
        {
          time: ['2024-08-28T10:52:32.659Z', '2024-08-30T04:00:32.659Z'],
          price: {
            carriage4: 1120,
            carriage5: 438,
            carriage3: 1142,
            carriage2: 520,
            carriage1: 382,
          },
        },
        {
          time: ['2024-08-30T04:49:32.659Z', '2024-08-31T08:04:32.659Z'],
          price: {
            carriage4: 1382,
            carriage5: 1786,
            carriage3: 2235,
            carriage2: 1572,
            carriage1: 2258,
          },
        },
        {
          time: ['2024-08-31T08:56:32.659Z', '2024-09-02T12:45:32.659Z'],
          price: {
            carriage4: 2425,
            carriage5: 2075,
            carriage3: 1842,
            carriage2: 1102,
            carriage1: 1381,
          },
        },
        {
          time: ['2024-09-02T13:05:32.659Z', '2024-09-05T16:27:32.659Z'],
          price: {
            carriage4: 474,
            carriage5: 1900,
            carriage3: 2079,
            carriage2: 1932,
            carriage1: 805,
          },
        },
        {
          time: ['2024-09-05T16:53:32.659Z', '2024-09-08T19:57:32.659Z'],
          price: {
            carriage4: 1651,
            carriage5: 1673,
            carriage3: 1148,
            carriage2: 237,
            carriage1: 164,
          },
        },
        {
          time: ['2024-09-08T20:52:32.659Z', '2024-09-09T13:41:32.659Z'],
          price: {
            carriage4: 727,
            carriage5: 746,
            carriage3: 327,
            carriage2: 2009,
            carriage1: 934,
          },
        },
        {
          time: ['2024-09-09T14:24:32.659Z', '2024-09-11T17:33:32.659Z'],
          price: {
            carriage4: 805,
            carriage5: 1498,
            carriage3: 129,
            carriage2: 223,
            carriage1: 1340,
          },
        },
        {
          time: ['2024-09-11T18:22:32.659Z', '2024-09-14T16:44:32.658Z'],
          price: {
            carriage4: 816,
            carriage5: 1578,
            carriage3: 1124,
            carriage2: 1502,
            carriage1: 1850,
          },
        },
        {
          time: ['2024-09-14T17:30:32.658Z', '2024-09-17T07:03:32.658Z'],
          price: {
            carriage4: 1967,
            carriage5: 1285,
            carriage3: 804,
            carriage2: 2453,
            carriage1: 1191,
          },
        },
        {
          time: ['2024-09-17T07:39:32.658Z', '2024-09-20T05:49:32.658Z'],
          price: {
            carriage4: 1490,
            carriage5: 551,
            carriage3: 881,
            carriage2: 1649,
            carriage1: 1520,
          },
        },
        {
          time: ['2024-09-20T06:47:32.658Z', '2024-09-23T10:15:32.658Z'],
          price: {
            carriage4: 1964,
            carriage5: 723,
            carriage3: 1893,
            carriage2: 630,
            carriage1: 605,
          },
        },
        {
          time: ['2024-09-23T10:20:32.658Z', '2024-09-25T20:56:32.658Z'],
          price: {
            carriage4: 260,
            carriage5: 582,
            carriage3: 521,
            carriage2: 2467,
            carriage1: 107,
          },
        },
        {
          time: ['2024-09-25T21:19:32.658Z', '2024-09-27T06:01:32.658Z'],
          price: {
            carriage4: 871,
            carriage5: 1622,
            carriage3: 395,
            carriage2: 806,
            carriage1: 330,
          },
        },
        {
          time: ['2024-09-27T06:32:32.658Z', '2024-09-30T16:43:32.658Z'],
          price: {
            carriage4: 1484,
            carriage5: 2188,
            carriage3: 758,
            carriage2: 1517,
            carriage1: 1706,
          },
        },
        {
          time: ['2024-09-30T17:12:32.658Z', '2024-10-03T23:51:32.658Z'],
          price: {
            carriage4: 1613,
            carriage5: 1105,
            carriage3: 2000,
            carriage2: 1789,
            carriage1: 1564,
          },
        },
        {
          time: ['2024-10-04T00:34:32.658Z', '2024-10-07T14:14:32.658Z'],
          price: {
            carriage4: 1491,
            carriage5: 1281,
            carriage3: 1006,
            carriage2: 206,
            carriage1: 531,
          },
        },
        {
          time: ['2024-10-07T14:25:32.658Z', '2024-10-10T21:15:32.658Z'],
          price: {
            carriage4: 1998,
            carriage5: 2160,
            carriage3: 999,
            carriage2: 2201,
            carriage1: 1681,
          },
        },
        {
          time: ['2024-10-10T21:32:32.658Z', '2024-10-14T13:36:32.658Z'],
          price: {
            carriage4: 1533,
            carriage5: 2035,
            carriage3: 570,
            carriage2: 1088,
            carriage1: 277,
          },
        },
        {
          time: ['2024-10-14T14:28:32.658Z', '2024-10-17T02:29:32.658Z'],
          price: {
            carriage4: 1159,
            carriage5: 1005,
            carriage3: 2397,
            carriage2: 1709,
            carriage1: 1738,
          },
        },
        {
          time: ['2024-10-17T03:02:32.658Z', '2024-10-19T16:20:32.658Z'],
          price: {
            carriage4: 623,
            carriage5: 1595,
            carriage3: 2084,
            carriage2: 2472,
            carriage1: 2076,
          },
        },
        {
          time: ['2024-10-19T16:57:32.658Z', '2024-10-22T12:41:32.658Z'],
          price: {
            carriage4: 1432,
            carriage5: 1837,
            carriage3: 1913,
            carriage2: 1946,
            carriage1: 940,
          },
        },
        {
          time: ['2024-10-22T13:22:32.658Z', '2024-10-24T21:32:32.658Z'],
          price: {
            carriage4: 1699,
            carriage5: 2078,
            carriage3: 1573,
            carriage2: 1682,
            carriage1: 1631,
          },
        },
        {
          time: ['2024-10-24T22:09:32.658Z', '2024-10-27T19:15:32.658Z'],
          price: {
            carriage4: 1161,
            carriage5: 1503,
            carriage3: 1215,
            carriage2: 1467,
            carriage1: 2425,
          },
        },
        {
          time: ['2024-10-27T20:03:32.658Z', '2024-10-30T17:32:32.658Z'],
          price: {
            carriage4: 1964,
            carriage5: 1720,
            carriage3: 1228,
            carriage2: 1146,
            carriage1: 1399,
          },
        },
        {
          time: ['2024-10-30T18:16:32.658Z', '2024-11-01T20:52:32.658Z'],
          price: {
            carriage4: 1816,
            carriage5: 2184,
            carriage3: 621,
            carriage2: 1369,
            carriage1: 1787,
          },
        },
        {
          time: ['2024-11-01T21:10:32.658Z', '2024-11-04T12:31:32.658Z'],
          price: {
            carriage4: 1924,
            carriage5: 895,
            carriage3: 695,
            carriage2: 1429,
            carriage1: 2367,
          },
        },
      ],
    },
  },
  {
    id: 2,
    rideId: 542,
    routeId: 142,
    userId: 2,
    seatId: 10,
    status: 'rejected',
    stationStart: 2,
    stationEnd: 47,
    carriages: [
      'carriage3',
      'carriage5',
      'carriage5',
      'carriage3',
      'carriage1',
      'carriage4',
      'carriage4',
      'carriage1',
      'carriage4',
      'carriage1',
      'carriage3',
      'carriage5',
    ],
    path: [136, 83, 99, 49, 2, 141, 31, 12, 130, 100, 90, 84, 144, 74, 54, 146, 139, 47],
    schedule: {
      segments: [
        {
          time: ['2024-08-18T07:49:47.017Z', '2024-08-21T10:23:47.017Z'],
          price: {
            carriage3: 1251,
            carriage5: 1047,
            carriage1: 2311,
            carriage4: 670,
          },
        },
        {
          time: ['2024-08-23T19:21:47.017Z', '2024-08-26T10:03:47.017Z'],
          price: {
            carriage3: 1784,
            carriage5: 1261,
            carriage1: 2324,
            carriage4: 2444,
          },
        },
        {
          time: ['2024-08-26T10:36:47.017Z', '2024-08-28T16:32:47.017Z'],
          price: {
            carriage3: 1745,
            carriage5: 1247,
            carriage1: 1091,
            carriage4: 2409,
          },
        },
        {
          time: ['2024-08-28T17:14:47.017Z', '2024-08-30T18:08:47.017Z'],
          price: {
            carriage3: 1692,
            carriage5: 1486,
            carriage1: 1838,
            carriage4: 1636,
          },
        },
        {
          time: ['2024-08-31T01:11:47.017Z', '2024-09-01T21:56:47.017Z'],
          price: {
            carriage3: 735,
            carriage5: 992,
            carriage1: 688,
            carriage4: 1834,
          },
        },
        {
          time: ['2024-09-02T01:45:47.017Z', '2024-09-04T19:02:47.017Z'],
          price: {
            carriage3: 2249,
            carriage5: 2081,
            carriage1: 1277,
            carriage4: 1779,
          },
        },
        {
          time: ['2024-09-04T19:26:47.017Z', '2024-09-07T10:47:47.017Z'],
          price: {
            carriage3: 1420,
            carriage5: 828,
            carriage1: 1201,
            carriage4: 1637,
          },
        },
        {
          time: ['2024-09-07T11:31:47.017Z', '2024-09-09T19:25:47.017Z'],
          price: {
            carriage3: 2224,
            carriage5: 1855,
            carriage1: 882,
            carriage4: 1475,
          },
        },
        {
          time: ['2024-09-10T03:19:47.017Z', '2024-09-11T17:48:47.017Z'],
          price: {
            carriage3: 2129,
            carriage5: 2352,
            carriage1: 1718,
            carriage4: 2444,
          },
        },
        {
          time: ['2024-09-11T18:29:47.017Z', '2024-09-14T00:31:47.017Z'],
          price: {
            carriage3: 2481,
            carriage5: 1634,
            carriage1: 2014,
            carriage4: 1553,
          },
        },
        {
          time: ['2024-09-14T01:21:47.017Z', '2024-09-16T17:22:47.017Z'],
          price: {
            carriage3: 816,
            carriage5: 1852,
            carriage1: 2129,
            carriage4: 927,
          },
        },
        {
          time: ['2024-09-16T18:17:47.017Z', '2024-09-19T05:17:47.017Z'],
          price: {
            carriage3: 1392,
            carriage5: 1539,
            carriage1: 2271,
            carriage4: 1450,
          },
        },
        {
          time: ['2024-09-19T06:10:47.017Z', '2024-09-21T17:53:47.017Z'],
          price: {
            carriage3: 2361,
            carriage5: 1261,
            carriage1: 2301,
            carriage4: 1689,
          },
        },
        {
          time: ['2024-09-22T04:50:47.017Z', '2024-09-23T19:35:47.017Z'],
          price: {
            carriage3: 2351,
            carriage5: 1385,
            carriage1: 1500,
            carriage4: 1215,
          },
        },
        {
          time: ['2024-09-23T20:29:47.017Z', '2024-09-25T07:52:47.017Z'],
          price: {
            carriage3: 1876,
            carriage5: 1730,
            carriage1: 2422,
            carriage4: 1993,
          },
        },
        {
          time: ['2024-09-25T08:11:47.017Z', '2024-09-27T14:03:47.017Z'],
          price: {
            carriage3: 1340,
            carriage5: 2375,
            carriage1: 2448,
            carriage4: 1533,
          },
        },
        {
          time: ['2024-09-28T02:58:47.017Z', '2024-09-30T16:48:47.017Z'],
          price: {
            carriage3: 1837,
            carriage5: 2447,
            carriage1: 2422,
            carriage4: 848,
          },
        },
        {
          time: ['2024-10-01T04:36:47.017Z', '2024-10-03T21:09:47.017Z'],
          price: {
            carriage3: 2417,
            carriage5: 2368,
            carriage1: 1898,
            carriage4: 1972,
          },
        },
      ],
    },
  },
  {
    id: 3,
    rideId: 542,
    routeId: 142,
    userId: 2,
    seatId: 21,
    status: 'completed',
    stationStart: 12,
    stationEnd: 54,
    carriages: [
      'carriage3',
      'carriage5',
      'carriage5',
      'carriage3',
      'carriage1',
      'carriage4',
      'carriage4',
      'carriage1',
      'carriage4',
      'carriage1',
      'carriage3',
      'carriage5',
    ],
    path: [136, 83, 99, 49, 2, 141, 31, 12, 130, 100, 90, 84, 144, 74, 54, 146, 139, 47],
    schedule: {
      segments: [
        {
          time: ['2024-08-18T07:49:47.017Z', '2024-08-21T10:23:47.017Z'],
          price: {
            carriage3: 1251,
            carriage5: 1047,
            carriage1: 2311,
            carriage4: 670,
          },
        },
        {
          time: ['2024-08-23T19:21:47.017Z', '2024-08-26T10:03:47.017Z'],
          price: {
            carriage3: 1784,
            carriage5: 1261,
            carriage1: 2324,
            carriage4: 2444,
          },
        },
        {
          time: ['2024-08-26T10:36:47.017Z', '2024-08-28T16:32:47.017Z'],
          price: {
            carriage3: 1745,
            carriage5: 1247,
            carriage1: 1091,
            carriage4: 2409,
          },
        },
        {
          time: ['2024-08-28T17:14:47.017Z', '2024-08-30T18:08:47.017Z'],
          price: {
            carriage3: 1692,
            carriage5: 1486,
            carriage1: 1838,
            carriage4: 1636,
          },
        },
        {
          time: ['2024-08-31T01:11:47.017Z', '2024-09-01T21:56:47.017Z'],
          price: {
            carriage3: 735,
            carriage5: 992,
            carriage1: 688,
            carriage4: 1834,
          },
        },
        {
          time: ['2024-09-02T01:45:47.017Z', '2024-09-04T19:02:47.017Z'],
          price: {
            carriage3: 2249,
            carriage5: 2081,
            carriage1: 1277,
            carriage4: 1779,
          },
        },
        {
          time: ['2024-09-04T19:26:47.017Z', '2024-09-07T10:47:47.017Z'],
          price: {
            carriage3: 1420,
            carriage5: 828,
            carriage1: 1201,
            carriage4: 1637,
          },
        },
        {
          time: ['2024-09-07T11:31:47.017Z', '2024-09-09T19:25:47.017Z'],
          price: {
            carriage3: 2224,
            carriage5: 1855,
            carriage1: 882,
            carriage4: 1475,
          },
        },
        {
          time: ['2024-09-10T03:19:47.017Z', '2024-09-11T17:48:47.017Z'],
          price: {
            carriage3: 2129,
            carriage5: 2352,
            carriage1: 1718,
            carriage4: 2444,
          },
        },
        {
          time: ['2024-09-11T18:29:47.017Z', '2024-09-14T00:31:47.017Z'],
          price: {
            carriage3: 2481,
            carriage5: 1634,
            carriage1: 2014,
            carriage4: 1553,
          },
        },
        {
          time: ['2024-09-14T01:21:47.017Z', '2024-09-16T17:22:47.017Z'],
          price: {
            carriage3: 816,
            carriage5: 1852,
            carriage1: 2129,
            carriage4: 927,
          },
        },
        {
          time: ['2024-09-16T18:17:47.017Z', '2024-09-19T05:17:47.017Z'],
          price: {
            carriage3: 1392,
            carriage5: 1539,
            carriage1: 2271,
            carriage4: 1450,
          },
        },
        {
          time: ['2024-09-19T06:10:47.017Z', '2024-09-21T17:53:47.017Z'],
          price: {
            carriage3: 2361,
            carriage5: 1261,
            carriage1: 2301,
            carriage4: 1689,
          },
        },
        {
          time: ['2024-09-22T04:50:47.017Z', '2024-09-23T19:35:47.017Z'],
          price: {
            carriage3: 2351,
            carriage5: 1385,
            carriage1: 1500,
            carriage4: 1215,
          },
        },
        {
          time: ['2024-09-23T20:29:47.017Z', '2024-09-25T07:52:47.017Z'],
          price: {
            carriage3: 1876,
            carriage5: 1730,
            carriage1: 2422,
            carriage4: 1993,
          },
        },
        {
          time: ['2024-09-25T08:11:47.017Z', '2024-09-27T14:03:47.017Z'],
          price: {
            carriage3: 1340,
            carriage5: 2375,
            carriage1: 2448,
            carriage4: 1533,
          },
        },
        {
          time: ['2024-09-28T02:58:47.017Z', '2024-09-30T16:48:47.017Z'],
          price: {
            carriage3: 1837,
            carriage5: 2447,
            carriage1: 2422,
            carriage4: 848,
          },
        },
        {
          time: ['2024-10-01T04:36:47.017Z', '2024-10-03T21:09:47.017Z'],
          price: {
            carriage3: 2417,
            carriage5: 2368,
            carriage1: 1898,
            carriage4: 1972,
          },
        },
      ],
    },
  },
];
