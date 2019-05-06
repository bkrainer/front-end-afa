// Specifies content for each checkpoint
export const checkpointData = [
  {
    id: 'panAmericanHighway',
    title: 'The Route',
    description: 'Keeping an open mind, Skylar will be adjusting his exact route with each passing day while generally following the Pan-American Highway — a network of roads stretching across the American continents. Measuring 19,000 mi in total length, the Pan-American Highway is the world\'s longest "motorable road" according to Guinness World Records.'
  },
  {
    id: 'washington',
    title: 'Washington, DC',
    description: 'Skylar will start in Washington, DC. Heading south from there through Mexico, Belize, Guatemala, Hondorus, El Salvador, Nicaragua, Costa Rica, and Panama.'
  },
  {
    id: 'mexicoCity',
    title: 'Mexico City',
    description: 'Along the way, Skylar will be hosting support events for those living with Alopecia. The first of these events will be with a support group in Mexico City.'
  },
  {
    id: 'panamaCity',
    title: 'Panama City',
    description: 'After Mexico City, Skylar will venture to Panama city where Adventures for Alopecia will host their second support event with an Alopecia support group that exists there.'
  },
  {
    id: 'darienGap',
    title: 'The Darien Gap',
    description: 'The one known obstacle along the way, the Darien Gap, is a 100-mile swath of treacherous jungle between Colombia and Panama. It’s separates the northern Pan-American highway from its sourthern counterpart, and Skylar will need to either circumnaviate it via a boat from Panama to Colombia, or trek through the Gap with his motorcycle.'
  },
  {
    id: 'buenosAires',
    title: 'Bueno Aires',
    description: 'Another Alopecia support event will take place in Buneos Aires, where there is a susbstanial Alopecia support network.'
  },
  {
    id: 'tierraDelFuego',
    title: 'Tierra Del Fuego',
    description: 'The ultimate destination: the land of the fire. At the southern tip of South America lies this remote mining area. With winter conditions year-round, it’ll be a chilly ride, but the area supposedly brings views more impressive than its name.'
  },
]

// Specifies zoom location and level for each checkpoint
export const checkpointLocations = {
  'panAmericanHighway': {
    duration: 1000,
    center: [-78.223, -4],
    zoom: 2,
    pitch: 0
  },
  'washington': {
    desktop: {
      center: [-81.431, 37.875],
      zoom: 6,
      pitch: 0
    },
    mobile: {
      center: [-77.0369, 38.9072],
      zoom: 6,
      pitch: 0
    }
  },  
  'mexicoCity': {
    center: [-99.12940083018961, 19.4085633410823],
    zoom: 6,
    pitch: 0
  },
  'panamaCity': {
    center: [-79.53423528374223, 8.974817305967207],
    zoom: 6,
    pitch: 0
  },
  'darienGap': {
    // duration: 6000,
    center: [-78.223, 8.711],
    zoom: 5,
    // speed: 0.6,
    pitch: 30
  },
  'buenosAires': {
    center: [-58.4516368231063, -34.63117168498165],
    zoom: 6,
    pitch: 0
  },
  'tierraDelFuego': {
    center: [-68.32415,-54.80548],
    zoom: 6,
    pitch: 20,
    speed: 0.5
  },
};

// Specifies markers for each checkpoint
export const checkpointMarkers = {
  'panAmericanHighway': [
    {
      "type": "Feature",
      "properties": {
        "title": "Washington, DC",
        "icon": "star",
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -77.03238901390978, 38.913188059745586
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "title": "Tierra del Feugo",
        "icon": "star",
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -66.977635233506, -54.730288843741285
        ]
      }
    }
  ],
  'washington': [{
    "type": "Feature",
    "properties": {
      "title": "Washington, DC",
      "icon": "star",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        -77.03238901390978, 38.913188059745586
      ]
    }
  }],
  'mexicoCity': [{
    "type": "Feature",
    "properties": {
      "title": "Mexico City Alopecia Support Event",
      "icon": "star",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-99.12940083018961, 19.4085633410823]
    }
  }],
  'panamaCity': [{
    "type": "Feature",
    "properties": {
      "title": "Panama Alopecia Support Event",
      "icon": "star",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-79.53423528374223, 8.974817305967207]
    }
  }],
  'darienGap': [{
    "type": "Feature",
    "properties": {
      "title": "Darien Gap",
      "icon": "star",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        -77.39700176220218,
        7.37935785894139
      ]
    }
  }],
  'buenosAires': [{
    "type": "Feature",
    "properties": {
      "title": "Argentina Alopecia Support Event",
      "icon": "star",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [-58.4516368231063, -34.63117168498165]
    }
  }],
  'tierraDelFuego': [{
    "type": "Feature",
    "properties": {
      "title": "Tierra del Feugo",
      "icon": "star",
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        -68.32415,-54.80548
      ]
    }
  }]
};
