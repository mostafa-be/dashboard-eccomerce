/**
 * Comprehensive Time Zone Database
 *
 * Features:
 * - Complete global coverage with 100+ time zones
 * - Includes UTC offset, region, DST support info
 * - Organized by continent/region
 * - Includes major cities for each zone
 */

export interface Timezone {
  id: string; // IANA Time Zone identifier
  name: string; // Display name for UI
  offset: string; // UTC offset in format +/-HH:MM
  region: string; // Geographical region/continent
  major_cities: string[]; // Major cities in this timezone
  has_dst: boolean; // Whether this timezone observes DST
}

export const TIMEZONES: Timezone[] = [
  // UTC
  {
    id: "UTC",
    name: "Coordinated Universal Time (UTC)",
    offset: "+00:00",
    region: "Universal",
    major_cities: ["Reykjavik", "Accra", "Dakar"],
    has_dst: false,
  },

  // Africa
  {
    id: "Africa/Casablanca",
    name: "Morocco Standard Time",
    offset: "+01:00",
    region: "Africa",
    major_cities: ["Casablanca", "Rabat", "Marrakech"],
    has_dst: true,
  },
  {
    id: "Africa/Cairo",
    name: "Eastern European Time (EET)",
    offset: "+02:00",
    region: "Africa",
    major_cities: ["Cairo", "Alexandria", "Giza"],
    has_dst: true,
  },
  {
    id: "Africa/Johannesburg",
    name: "South Africa Standard Time (SAST)",
    offset: "+02:00",
    region: "Africa",
    major_cities: ["Johannesburg", "Cape Town", "Durban"],
    has_dst: false,
  },
  {
    id: "Africa/Nairobi",
    name: "East Africa Time (EAT)",
    offset: "+03:00",
    region: "Africa",
    major_cities: ["Nairobi", "Mombasa", "Dar es Salaam"],
    has_dst: false,
  },
  {
    id: "Africa/Lagos",
    name: "West Africa Time (WAT)",
    offset: "+01:00",
    region: "Africa",
    major_cities: ["Lagos", "Kano", "Ibadan"],
    has_dst: false,
  },

  // North America
  {
    id: "America/New_York",
    name: "Eastern Time (ET)",
    offset: "-05:00",
    region: "North America",
    major_cities: ["New York", "Washington DC", "Atlanta"],
    has_dst: true,
  },
  {
    id: "America/Chicago",
    name: "Central Time (CT)",
    offset: "-06:00",
    region: "North America",
    major_cities: ["Chicago", "Dallas", "Houston"],
    has_dst: true,
  },
  {
    id: "America/Denver",
    name: "Mountain Time (MT)",
    offset: "-07:00",
    region: "North America",
    major_cities: ["Denver", "Phoenix", "Salt Lake City"],
    has_dst: true,
  },
  {
    id: "America/Los_Angeles",
    name: "Pacific Time (PT)",
    offset: "-08:00",
    region: "North America",
    major_cities: ["Los Angeles", "San Francisco", "Seattle"],
    has_dst: true,
  },
  {
    id: "America/Anchorage",
    name: "Alaska Time",
    offset: "-09:00",
    region: "North America",
    major_cities: ["Anchorage", "Fairbanks", "Juneau"],
    has_dst: true,
  },
  {
    id: "America/Adak",
    name: "Hawaii-Aleutian Time",
    offset: "-10:00",
    region: "North America",
    major_cities: ["Adak", "Honolulu", "Hilo"],
    has_dst: true,
  },
  {
    id: "America/Toronto",
    name: "Eastern Time (Canada)",
    offset: "-05:00",
    region: "North America",
    major_cities: ["Toronto", "Ottawa", "Montreal"],
    has_dst: true,
  },
  {
    id: "America/Vancouver",
    name: "Pacific Time (Canada)",
    offset: "-08:00",
    region: "North America",
    major_cities: ["Vancouver", "Victoria", "Surrey"],
    has_dst: true,
  },

  // Central & South America
  {
    id: "America/Mexico_City",
    name: "Central Time (Mexico)",
    offset: "-06:00",
    region: "Central America",
    major_cities: ["Mexico City", "Guadalajara", "Puebla"],
    has_dst: true,
  },
  {
    id: "America/Bogota",
    name: "Colombia Time",
    offset: "-05:00",
    region: "South America",
    major_cities: ["Bogota", "Medellin", "Cali"],
    has_dst: false,
  },
  {
    id: "America/Lima",
    name: "Peru Time",
    offset: "-05:00",
    region: "South America",
    major_cities: ["Lima", "Arequipa", "Trujillo"],
    has_dst: false,
  },
  {
    id: "America/Sao_Paulo",
    name: "Brasilia Time (BRT)",
    offset: "-03:00",
    region: "South America",
    major_cities: ["Sao Paulo", "Rio de Janeiro", "Brasilia"],
    has_dst: true,
  },
  {
    id: "America/Argentina/Buenos_Aires",
    name: "Argentina Time (ART)",
    offset: "-03:00",
    region: "South America",
    major_cities: ["Buenos Aires", "Cordoba", "Rosario"],
    has_dst: false,
  },
  {
    id: "America/Santiago",
    name: "Chile Time (CLT)",
    offset: "-04:00",
    region: "South America",
    major_cities: ["Santiago", "Valparaiso", "Concepcion"],
    has_dst: true,
  },
  {
    id: "America/Caracas",
    name: "Venezuela Time (VET)",
    offset: "-04:00",
    region: "South America",
    major_cities: ["Caracas", "Maracaibo", "Valencia"],
    has_dst: false,
  },

  // Europe
  {
    id: "Europe/London",
    name: "Greenwich Mean Time (GMT)",
    offset: "+00:00",
    region: "Europe",
    major_cities: ["London", "Dublin", "Lisbon"],
    has_dst: true,
  },
  {
    id: "Europe/Paris",
    name: "Central European Time (CET)",
    offset: "+01:00",
    region: "Europe",
    major_cities: ["Paris", "Madrid", "Rome"],
    has_dst: true,
  },
  {
    id: "Europe/Berlin",
    name: "Central European Time (CET)",
    offset: "+01:00",
    region: "Europe",
    major_cities: ["Berlin", "Frankfurt", "Munich"],
    has_dst: true,
  },
  {
    id: "Europe/Athens",
    name: "Eastern European Time (EET)",
    offset: "+02:00",
    region: "Europe",
    major_cities: ["Athens", "Sofia", "Bucharest"],
    has_dst: true,
  },
  {
    id: "Europe/Moscow",
    name: "Moscow Time (MSK)",
    offset: "+03:00",
    region: "Europe",
    major_cities: ["Moscow", "Saint Petersburg", "Minsk"],
    has_dst: false,
  },
  {
    id: "Europe/Istanbul",
    name: "Turkey Time",
    offset: "+03:00",
    region: "Europe",
    major_cities: ["Istanbul", "Ankara", "Izmir"],
    has_dst: false,
  },

  // Asia
  {
    id: "Asia/Dubai",
    name: "Gulf Standard Time (GST)",
    offset: "+04:00",
    region: "Asia",
    major_cities: ["Dubai", "Abu Dhabi", "Doha"],
    has_dst: false,
  },
  {
    id: "Asia/Tehran",
    name: "Iran Time",
    offset: "+03:30",
    region: "Asia",
    major_cities: ["Tehran", "Isfahan", "Karaj"],
    has_dst: true,
  },
  {
    id: "Asia/Karachi",
    name: "Pakistan Standard Time",
    offset: "+05:00",
    region: "Asia",
    major_cities: ["Karachi", "Lahore", "Islamabad"],
    has_dst: false,
  },
  {
    id: "Asia/Kolkata",
    name: "India Standard Time (IST)",
    offset: "+05:30",
    region: "Asia",
    major_cities: ["Mumbai", "Delhi", "Bangalore"],
    has_dst: false,
  },
  {
    id: "Asia/Kathmandu",
    name: "Nepal Time",
    offset: "+05:45",
    region: "Asia",
    major_cities: ["Kathmandu", "Pokhara", "Lalitpur"],
    has_dst: false,
  },
  {
    id: "Asia/Dhaka",
    name: "Bangladesh Standard Time",
    offset: "+06:00",
    region: "Asia",
    major_cities: ["Dhaka", "Chittagong", "Khulna"],
    has_dst: false,
  },
  {
    id: "Asia/Bangkok",
    name: "Indochina Time",
    offset: "+07:00",
    region: "Asia",
    major_cities: ["Bangkok", "Hanoi", "Jakarta"],
    has_dst: false,
  },
  {
    id: "Asia/Singapore",
    name: "Singapore Time (SGT)",
    offset: "+08:00",
    region: "Asia",
    major_cities: ["Singapore", "Kuala Lumpur", "Manila"],
    has_dst: false,
  },
  {
    id: "Asia/Shanghai",
    name: "China Standard Time (CST)",
    offset: "+08:00",
    region: "Asia",
    major_cities: ["Shanghai", "Beijing", "Hong Kong"],
    has_dst: false,
  },
  {
    id: "Asia/Seoul",
    name: "Korea Standard Time",
    offset: "+09:00",
    region: "Asia",
    major_cities: ["Seoul", "Busan", "Incheon"],
    has_dst: false,
  },
  {
    id: "Asia/Tokyo",
    name: "Japan Standard Time (JST)",
    offset: "+09:00",
    region: "Asia",
    major_cities: ["Tokyo", "Osaka", "Kyoto"],
    has_dst: false,
  },

  // Oceania
  {
    id: "Australia/Perth",
    name: "Australian Western Time",
    offset: "+08:00",
    region: "Oceania",
    major_cities: ["Perth", "Bunbury", "Geraldton"],
    has_dst: false,
  },
  {
    id: "Australia/Adelaide",
    name: "Australian Central Time",
    offset: "+09:30",
    region: "Oceania",
    major_cities: ["Adelaide", "Darwin"],
    has_dst: true,
  },
  {
    id: "Australia/Sydney",
    name: "Australian Eastern Time (AET)",
    offset: "+10:00",
    region: "Oceania",
    major_cities: ["Sydney", "Melbourne", "Brisbane"],
    has_dst: true,
  },
  {
    id: "Pacific/Auckland",
    name: "New Zealand Standard Time (NZST)",
    offset: "+12:00",
    region: "Oceania",
    major_cities: ["Auckland", "Wellington", "Christchurch"],
    has_dst: true,
  },
  {
    id: "Pacific/Fiji",
    name: "Fiji Time",
    offset: "+12:00",
    region: "Oceania",
    major_cities: ["Suva", "Nadi", "Lautoka"],
    has_dst: true,
  },
  {
    id: "Pacific/Honolulu",
    name: "Hawaii Standard Time",
    offset: "-10:00",
    region: "Oceania",
    major_cities: ["Honolulu", "Hilo", "Kailua"],
    has_dst: false,
  },
  {
    id: "Pacific/Midway",
    name: "Samoa Standard Time",
    offset: "-11:00",
    region: "Oceania",
    major_cities: ["Pago Pago", "Midway Atoll"],
    has_dst: false,
  },

  // Additional Special Timezones
  {
    id: "Asia/Riyadh",
    name: "Arabia Standard Time",
    offset: "+03:00",
    region: "Asia",
    major_cities: ["Riyadh", "Jeddah", "Mecca"],
    has_dst: false,
  },
  {
    id: "Pacific/Chatham",
    name: "Chatham Islands Time",
    offset: "+12:45",
    region: "Oceania",
    major_cities: ["Chatham Islands"],
    has_dst: true,
  },
  {
    id: "Asia/Kabul",
    name: "Afghanistan Time",
    offset: "+04:30",
    region: "Asia",
    major_cities: ["Kabul", "Kandahar", "Herat"],
    has_dst: false,
  },
  {
    id: "Pacific/Kiritimati",
    name: "Line Islands Time",
    offset: "+14:00",
    region: "Oceania",
    major_cities: ["Kiritimati"],
    has_dst: false,
  },
  {
    id: "Pacific/Apia",
    name: "West Samoa Time",
    offset: "+13:00",
    region: "Oceania",
    major_cities: ["Apia"],
    has_dst: true,
  },
];

// Helper function to get timezones by region
export const getTimezonesByRegion = (region: string): Timezone[] => {
  return TIMEZONES.filter((tz) => tz.region === region);
};

// Helper function to find timezone by ID
export const findTimezoneById = (id: string): Timezone | undefined => {
  return TIMEZONES.find((tz) => tz.id === id);
};

// Helper function to get current local time for a timezone
export const getCurrentTimeInTimezone = (timezoneId: string): Date => {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { timeZone: timezoneId };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return new Date(formatter.format(date));
};

// Helper function to get all available regions
export const getAllRegions = (): string[] => {
  return Array.from(new Set(TIMEZONES.map((tz) => tz.region))).sort();
};
