// Canvas dimensions
export const CANVAS = {
  width: 1080,
  mvpHeight: 3240,   // 3 checkpoints × 1080px
  fullHeight: 19440, // 18 checkpoints × 1080px
  segmentHeight: 1080,
};

// All 18 checkpoints — index 0 = Copenhagen (bottom), index 17 = Lisbon (top)
// Full map y-coords from BUILD_SPEC.md (segment_height ≈ 1143.5px on full map)
// MVP y-coords use segment_height = 1080px (3240 / (3-1) ... but centered in segment)
// MVP: y = canvasHeight - (i * segHeight) - (segHeight / 2)
export const CHECKPOINTS = [
  {
    id: 'cp-01', index: 0, name: 'Copenhagen', country: 'Denmark',
    mvp: { x: 540, y: 2970 },
    full: { x: 540, y: 18868 },
    state: 'unlocked', // 'locked' | 'unlocked' | 'current'
    km: 0,
    card: {
      front: { title: 'Copenhagen', image: null },
      back: {
        story: 'Your journey begins in the City of Spires. Copenhagen sits on the island of Sjælland, where the Little Mermaid watches over the harbour. The canals of Nyhavn reflect centuries of Nordic seafaring spirit.',
        fact: 'Copenhagen has been the capital of Denmark since the 15th century.'
      }
    }
  },
  {
    id: 'cp-02', index: 1, name: 'Odense', country: 'Denmark',
    mvp: { x: 540, y: 1890 },
    full: { x: 540, y: 17725 },
    state: 'locked',
    km: 165,
    card: {
      front: { title: 'Odense', image: null },
      back: {
        story: 'The birthplace of Hans Christian Andersen. Flat Funen farmland stretches in every direction, dotted with half-timbered houses and the slow turning of windmills.',
        fact: 'Odense is the third largest city in Denmark, situated on the island of Funen.'
      }
    }
  },
  {
    id: 'cp-03', index: 2, name: 'Hamburg', country: 'Germany',
    mvp: { x: 540, y: 810 },
    full: { x: 540, y: 16581 },
    state: 'locked',
    km: 390,
    card: {
      front: { title: 'Hamburg', image: null },
      back: {
        story: 'Germany\'s gateway to the world. The Elbe river carries cargo ships past the red-brick Speicherstadt warehouses to the open North Sea. A city that has always looked outward.',
        fact: 'Hamburg\'s port is the third largest in Europe by container traffic.'
      }
    }
  },
  {
    id: 'cp-04', index: 3, name: 'Hannover', country: 'Germany',
    full: { x: 540, y: 15437 },
    state: 'locked', km: 560,
    card: {
      front: { title: 'Hannover', image: null },
      back: {
        story: 'The baroque Herrenhausen Gardens bloom in the heart of Lower Saxony. Hannover is a city rebuilt after war, yet its gardens endure as a testament to European grandeur.',
        fact: 'The Herrenhausen Gardens were laid out in the 17th century and are among Europe\'s finest baroque gardens.'
      }
    }
  },
  {
    id: 'cp-05', index: 4, name: 'Cologne', country: 'Germany',
    full: { x: 540, y: 14294 },
    state: 'locked', km: 720,
    card: {
      front: { title: 'Cologne', image: null },
      back: {
        story: 'The twin spires of the Dom rise above the Rhine, a landmark visible for miles. Cologne has stood at this river crossing for two thousand years.',
        fact: 'Cologne Cathedral took over 600 years to complete, finally finished in 1880.'
      }
    }
  },
  {
    id: 'cp-06', index: 5, name: 'Brussels', country: 'Belgium',
    full: { x: 540, y: 13150 },
    state: 'locked', km: 870,
    card: {
      front: { title: 'Brussels', image: null },
      back: {
        story: 'The Grand Place glitters at the heart of Europe. Brussels is a city of contradictions — the capital of a divided country and the unofficial capital of a continent.',
        fact: 'The Grand Place in Brussels is considered one of the most beautiful town squares in the world.'
      }
    }
  },
  {
    id: 'cp-07', index: 6, name: 'Paris', country: 'France',
    full: { x: 540, y: 12006 },
    state: 'locked', km: 1050,
    card: {
      front: { title: 'Paris', image: null },
      back: {
        story: 'The Eiffel Tower pierces the sky above the Seine\'s great bend. Paris needs no introduction — it simply needs to be experienced.',
        fact: 'The Eiffel Tower was originally intended to be a temporary structure for the 1889 World\'s Fair.'
      }
    }
  },
  {
    id: 'cp-08', index: 7, name: 'Orléans', country: 'France',
    full: { x: 540, y: 10863 },
    state: 'locked', km: 1210,
    card: {
      front: { title: 'Orléans', image: null },
      back: {
        story: 'The Loire Valley begins here, France\'s garden and its châteaux country. Joan of Arc liberated this city in 1429, turning the tide of a hundred years of war.',
        fact: 'The Loire Valley is the largest UNESCO-listed site in France.'
      }
    }
  },
  {
    id: 'cp-09', index: 8, name: 'Bordeaux', country: 'France',
    full: { x: 540, y: 9719 },
    state: 'locked', km: 1430,
    card: {
      front: { title: 'Bordeaux', image: null },
      back: {
        story: 'The Garonne bends around the Port de la Lune — the Port of the Moon. Vineyard rows stretch to every horizon. This is the wine capital of the world.',
        fact: 'The Bordeaux wine region produces over 700 million bottles per year.'
      }
    }
  },
  {
    id: 'cp-10', index: 9, name: 'San Sebastián', country: 'Spain',
    full: { x: 540, y: 8575 },
    state: 'locked', km: 1620,
    card: {
      front: { title: 'San Sebastián', image: null },
      back: {
        story: 'The Bay of Biscay curves into La Concha, the most beautiful urban beach in Europe. Basque mountains tumble into the sea. The pintxos bars of the old town call to every traveller.',
        fact: 'San Sebastián has more Michelin stars per capita than almost any other city on Earth.'
      }
    }
  },
  {
    id: 'cp-11', index: 10, name: 'Burgos', country: 'Spain',
    full: { x: 540, y: 7431 },
    state: 'locked', km: 1810,
    card: {
      front: { title: 'Burgos', image: null },
      back: {
        story: 'The high Castilian plateau stretches endlessly under a vast sky. The Cathedral of Burgos rises in gothic splendour. You are now walking the ancient Camino de Santiago.',
        fact: 'Burgos Cathedral, begun in 1221, is a UNESCO World Heritage Site and one of the finest Gothic cathedrals in Spain.'
      }
    }
  },
  {
    id: 'cp-12', index: 11, name: 'Valladolid', country: 'Spain',
    full: { x: 540, y: 6288 },
    state: 'locked', km: 1960,
    card: {
      front: { title: 'Valladolid', image: null },
      back: {
        story: 'The dry meseta stretches in every direction, golden and sparse. This was once the capital of the Spanish Empire, where Columbus died and Cervantes lived.',
        fact: 'Christopher Columbus died in Valladolid in 1506, never knowing he had reached a new continent.'
      }
    }
  },
  {
    id: 'cp-13', index: 12, name: 'Madrid', country: 'Spain',
    full: { x: 540, y: 5144 },
    state: 'locked', km: 2100,
    card: {
      front: { title: 'Madrid', image: null },
      back: {
        story: 'The bear reaches for the madroño berry on the Puerta del Sol. Madrid sits at the geographic heart of the Iberian Peninsula, the highest capital city in the EU.',
        fact: 'Madrid is located at 667 metres above sea level, making it the highest capital city in the European Union.'
      }
    }
  },
  {
    id: 'cp-14', index: 13, name: 'Ávila', country: 'Spain',
    full: { x: 540, y: 4000 },
    state: 'locked', km: 2220,
    card: {
      front: { title: 'Ávila', image: null },
      back: {
        story: 'The most perfectly preserved medieval city walls in Europe encircle a city that still lives within them. At 1,132 metres, the air is thin and the stone is ancient.',
        fact: 'Ávila\'s medieval walls, built in the 11th century, stretch for 2.5 kilometres with 88 towers.'
      }
    }
  },
  {
    id: 'cp-15', index: 14, name: 'Salamanca', country: 'Spain',
    full: { x: 540, y: 2857 },
    state: 'locked', km: 2340,
    card: {
      front: { title: 'Salamanca', image: null },
      back: {
        story: 'The oldest university in Spain casts golden light across the Plaza Mayor. Salamanca glows at dusk — the sandstone absorbs the sun and gives it back slowly.',
        fact: 'The University of Salamanca, founded in 1218, is the oldest university in the Hispanic world.'
      }
    }
  },
  {
    id: 'cp-16', index: 15, name: 'Vilar Formoso', country: 'Portugal',
    full: { x: 540, y: 1713 },
    state: 'locked', km: 2460,
    card: {
      front: { title: 'Vilar Formoso', image: null },
      back: {
        story: 'You cross into Portugal through the border gate. Eucalyptus forests close in around the road. The light softens. The Atlantic is close now.',
        fact: 'Vilar Formoso was the entry point for thousands of Jewish refugees fleeing Nazi Europe in World War II, aided by consul Aristides de Sousa Mendes.'
      }
    }
  },
  {
    id: 'cp-17', index: 16, name: 'Coimbra', country: 'Portugal',
    full: { x: 540, y: 569 },
    state: 'locked', km: 2620,
    card: {
      front: { title: 'Coimbra', image: null },
      back: {
        story: 'The University of Coimbra crowns its hill above the Mondego river. Fado was born here, the mournful Portuguese song of longing. Saudade. You can feel it in the air.',
        fact: 'Coimbra\'s university, founded in 1290, is one of the oldest continuously operating universities in the world.'
      }
    }
  },
  {
    id: 'cp-18', index: 17, name: 'Lisbon', country: 'Portugal',
    full: { x: 540, y: 200 },
    state: 'locked', km: 2800,
    card: {
      front: { title: 'Lisbon', image: null },
      back: {
        story: 'The Tagus opens to the Atlantic. The 25 de Abril bridge stretches across the water. Tram 28 clangs up the hills past azulejo-tiled facades. You have arrived at the edge of the world.',
        fact: 'Lisbon is the westernmost capital city in continental Europe, once the launch point of the Age of Discovery.'
      }
    }
  },
];

// Progress state — 0.0 (at start) to 1.0 (journey complete)
// Represents how far along the entire route the group currently is
export const journeyState = {
  progress: 0.15, // demo: 15% through the journey (just past Copenhagen)
  activeCheckpoint: 1, // cp-01 = unlocked, rest = locked
};
