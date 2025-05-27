import React from "react";
import { Card, HeaderCard } from "../../ui/card";
import dynamic from "next/dynamic";

// Example: Replace with your real data or fetch from API
const userCountries = [
  { country: "US", count: 120, coordinates: [-98, 39], name: "United States" },
  { country: "FR", count: 40, coordinates: [2, 46], name: "France" },
  { country: "IN", count: 80, coordinates: [78, 22], name: "India" },
  // ...add more as needed
];

// Calculate total users for global stats
const totalUsers = userCountries.reduce((sum, c) => sum + c.count, 0);
const topCountry = userCountries.reduce(
  (max, c) => (c.count > max.count ? c : max),
  userCountries[0]
);

// Color scale for demonstration
const getCountryColor = (iso: string) => {
  const found = userCountries.find((c) => c.country === iso);
  if (!found) return "#E5E7EB"; // gray-200
  if (found.count > 100) return "#2563eb"; // blue-600
  if (found.count > 50) return "#60a5fa"; // blue-400
  return "#93c5fd"; // blue-300
};

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// Dynamically import react-simple-maps to avoid SSR issues
const ComposableMap = dynamic(
  () => import("react-simple-maps").then((mod) => mod.ComposableMap),
  { ssr: false }
);
const Geographies = dynamic(
  () => import("react-simple-maps").then((mod) => mod.Geographies),
  { ssr: false }
);
const Geography = dynamic(
  () => import("react-simple-maps").then((mod) => mod.Geography),
  { ssr: false }
);
const ZoomableGroup = dynamic(
  () => import("react-simple-maps").then((mod) => mod.ZoomableGroup),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-simple-maps").then((mod) => mod.Marker),
  { ssr: false }
);
const Annotation = dynamic(
  () => import("react-simple-maps").then((mod) => mod.Annotation),
  { ssr: false }
);

const Country = () => {
  return (
    <Card className="w-full min-h-[480px] bg-white dark:bg-black-100 shadow rounded-lg">
      <HeaderCard>
        <div className="font-semibold text-lg text-gray-900 dark:text-white">
          User Visitors by Country
        </div>
        <div className="flex flex-wrap gap-4 mt-2">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Total Detected Users
            </span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {totalUsers}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Top Country
            </span>
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              {topCountry.name}
            </span>
            <span className="text-xs text-blue-600 dark:text-blue-400">
              {topCountry.count} users
            </span>
          </div>
        </div>
      </HeaderCard>
      <div className="w-full flex justify-center items-center py-4">
        <div className="w-full max-w-4xl">
          {/* Only render map on client side */}
          {typeof window !== "undefined" && (
            <ComposableMap
              projectionConfig={{ scale: 170 }}
              width={900}
              height={440}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "1rem",
                boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
              }}
            >
              <ZoomableGroup>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={getCountryColor(geo.properties.ISO_A2)}
                        stroke="#fff"
                        style={{
                          default: { outline: "none", transition: "fill 0.2s" },
                          hover: { fill: "#f59e42", outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {/* Markers for user countries */}
                {userCountries.map((country) => (
                  <Marker
                    key={country.country}
                    coordinates={country.coordinates}
                  >
                    <circle
                      r={10 + Math.log2(country.count)}
                      fill="#2563eb"
                      stroke="#fff"
                      strokeWidth={2}
                      opacity={0.85}
                      filter="url(#shadow)"
                    />
                    <Annotation
                      subject={country.coordinates}
                      dx={0}
                      dy={-30}
                      connectorProps={{
                        stroke: "#2563eb",
                        strokeWidth: 1.5,
                        strokeLinecap: "round",
                      }}
                    >
                      <text
                        x={0}
                        y={-8}
                        textAnchor="middle"
                        style={{
                          fontFamily: "inherit",
                          fontSize: 14,
                          fill: "#2563eb",
                          fontWeight: 700,
                          pointerEvents: "none",
                        }}
                      >
                        {country.count}
                      </text>
                      <text
                        x={0}
                        y={10}
                        textAnchor="middle"
                        style={{
                          fontFamily: "inherit",
                          fontSize: 11,
                          fill: "#374151",
                          fontWeight: 500,
                          pointerEvents: "none",
                        }}
                      >
                        {country.name}
                      </text>
                    </Annotation>
                  </Marker>
                ))}
                {/* SVG filter for marker shadow */}
                <defs>
                  <filter
                    id="shadow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="2"
                      stdDeviation="2"
                      floodColor="#000"
                      floodOpacity="0.15"
                    />
                  </filter>
                </defs>
              </ZoomableGroup>
            </ComposableMap>
          )}
          <div className="flex gap-4 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded bg-[#2563eb]" />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                100+ users
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded bg-[#60a5fa]" />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                51-100 users
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded bg-[#93c5fd]" />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                1-50 users
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded bg-[#E5E7EB] border border-gray-300" />
              <span className="text-xs text-gray-700 dark:text-gray-300">
                No users
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Country;
