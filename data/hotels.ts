export type Hotel = {
  name: string;
  area: string;
};

export const HOTELS: Hotel[] = [
  {name: 'Hilton Playa del Carmen', area: 'Playa del Carmen'},
  {name: 'The Fives Beach Hotel & Residences', area: 'Playa del Carmen'},
  {name: 'The Fives Downtown', area: 'Playa del Carmen'},
  {name: 'Mahekal Beach Resort', area: 'Playa del Carmen'},
  {name: 'Hyatt Vivid Playa del Carmen', area: 'Playa del Carmen'},
  {name: 'Thompson Playa del Carmen', area: 'Playa del Carmen'},
  {name: 'The Reef Playacar', area: 'Playa del Carmen'},
  {name: 'Sandos Playacar', area: 'Playa del Carmen'},
  {name: 'Iberostar Tucan', area: 'Playa del Carmen'},
  {name: 'Iberostar Quetzal', area: 'Playa del Carmen'},
  {name: 'Wyndham Alltra Playa del Carmen', area: 'Playa del Carmen'},
  {name: 'Paradisus Playa del Carmen', area: 'Playa del Carmen'},
  {name: 'Occidental at Xcaret Destination', area: 'Playa del Carmen'},
  {name: 'Hotel Riu Palace Mexico', area: 'Playa del Carmen'},
  {name: 'Hotel Riu Lupita', area: 'Playa del Carmen'},
  {name: 'Hotel Riu Tequila', area: 'Playa del Carmen'},
  {name: 'HM Playa del Carmen', area: 'Playa del Carmen'},
  {name: 'Allegro Playacar', area: 'Playa del Carmen'},
  {name: 'Fairmont Mayakoba', area: 'Playa del Carmen'},
  {name: 'Rosewood Mayakoba', area: 'Playa del Carmen'},
  {name: 'Andaz Mayakoba', area: 'Playa del Carmen'},
  {name: 'Banyan Tree Mayakoba', area: 'Playa del Carmen'},
  {name: 'Grand Velas Riviera Maya', area: 'Playa del Carmen'},
  {name: 'Desire Riviera Maya Resort', area: 'Puerto Morelos'},
  {name: 'Excellence Riviera Cancun', area: 'Puerto Morelos'},
  {name: 'Dreams Sapphire Resort & Spa', area: 'Puerto Morelos'},
  {name: 'Now Emerald Cancun', area: 'Puerto Morelos'},
  {name: 'Haven Riviera Cancun', area: 'Puerto Morelos'},
  {name: 'Margaritaville Island Reserve', area: 'Puerto Morelos'},
  {name: 'Hotel Ojo de Agua', area: 'Puerto Morelos'},
  {name: 'Casa Marina Beach & Spa', area: 'Puerto Morelos'},
  {name: 'Posada Amor', area: 'Puerto Morelos'},
  {name: 'Ventus at Marina El Cid', area: 'Puerto Morelos'},
  {name: 'Secrets Akumal Riviera Maya', area: 'Akumal'},
  {name: 'Akumal Bay Beach & Wellness Resort', area: 'Akumal'},
  {name: 'Grand Sirenis Riviera Maya', area: 'Akumal'},
  {name: 'Del Sol Beachfront Hotel', area: 'Akumal'},
  {name: 'Hotel Akumal Caribe', area: 'Akumal'},
  {name: 'Bahia Principe Luxury Akumal', area: 'Akumal'},
  {name: 'Barceló Maya Grand Resort', area: 'Puerto Aventuras'},
  {name: 'Barceló Maya Palace', area: 'Puerto Aventuras'},
  {name: 'Barceló Maya Beach', area: 'Puerto Aventuras'},
  {name: 'Barceló Maya Caribe', area: 'Puerto Aventuras'},
  {name: 'Dreams Puerto Aventuras', area: 'Puerto Aventuras'},
  {name: 'UNICO 20°87° Hotel Riviera Maya', area: 'Puerto Aventuras'},
  {name: 'Grand Palladium White Sand', area: 'Puerto Aventuras'},
  {name: 'Grand Palladium Colonial', area: 'Puerto Aventuras'},
  {name: 'Grand Palladium Kantenah', area: 'Puerto Aventuras'},
  {name: 'Azulik', area: 'Tulum'},
  {name: 'Habitas Tulum', area: 'Tulum'},
  {name: 'Be Tulum', area: 'Tulum'},
  {name: 'Papaya Playa Project', area: 'Tulum'},
  {name: 'Nomade Tulum', area: 'Tulum'},
  {name: 'Hilton Tulum Riviera Maya', area: 'Tulum'},
  {name: 'Dreams Tulum Resort & Spa', area: 'Tulum'},
  {name: 'The Elements Tulum', area: 'Tulum'},
  {name: 'Hotel Esencia', area: 'Tulum'},
  {name: 'Mi Amor Tulum', area: 'Tulum'},
  {name: 'Hyatt Ziva Cancun', area: 'Cancún'},
  {name: 'Hyatt Zilara Cancun', area: 'Cancún'},
  {name: 'Live Aqua Beach Resort Cancun', area: 'Cancún'},
  {name: 'Le Blanc Spa Resort Cancun', area: 'Cancún'},
  {name: 'JW Marriott Cancun', area: 'Cancún'},
  {name: 'Marriott Cancun Resort', area: 'Cancún'},
  {name: 'The Ritz-Carlton, Cancun', area: 'Cancún'},
  {name: 'Grand Fiesta Americana Coral Beach', area: 'Cancún'},
  {name: 'Nizuc Resort & Spa', area: 'Cancún'},
  {name: 'Waldorf Astoria Cancun', area: 'Cancún'},
  {name: 'Finest Playa Mujeres', area: 'Cancún'},
  {name: 'Excellence Playa Mujeres', area: 'Cancún'},
  {name: 'Moon Palace Cancun', area: 'Cancún'},
  {name: 'Hard Rock Hotel Cancun', area: 'Cancún'},
  {name: 'Kempinski Hotel Cancun', area: 'Cancún'}
];

export function suggestHotels(query: string, area: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return HOTELS
    .filter((hotel) => hotel.name.toLowerCase().includes(q))
    .sort((a, b) => {
      const aStart = a.name.toLowerCase().startsWith(q) ? 0 : 1;
      const bStart = b.name.toLowerCase().startsWith(q) ? 0 : 1;
      if (aStart !== bStart) return aStart - bStart;
      const aArea = area && a.area === area ? 0 : 1;
      const bArea = area && b.area === area ? 0 : 1;
      if (aArea !== bArea) return aArea - bArea;
      return a.name.localeCompare(b.name);
    })
    .slice(0, 6);
}
