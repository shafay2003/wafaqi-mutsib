// This component is purely for visual presentation.
// For a real-world application, you would use a proper geo-mapping library
// like Leaflet, Mapbox, or Google Maps Platform.
// The SVG paths are simplified and not geographically perfect.

import { cn } from "@/lib/utils";

type Region = 'punjab' | 'sindh' | 'balochistan' | 'kpk' | 'islamabad';

const regionPaths: Record<Region, string> = {
  punjab: "M328 279 l-22 -44 -17 -6 -31 5 -10 14 3 20 -15 15 -18 3 -10 14 -11 31 2 20 18 10 32 -1 31 1 20 16 35 -14 44 2z",
  sindh: "M163 438 l-15 -39 -11 -35 2 -27 15 -19 13 -6 19 3 24 16 13 25 15 21 8 20 8 13 -21 16 -19 3 -28 -10 -15 -10z",
  balochistan: "M137 400 l-18 -50 -10 -40 -12 -38 1 -28 17 -37 11 -20 22 -35 15 -13 25 2 20 16 10 20 -2 27 11 35 15 39 -22 17 -15 10 -25 -5 -18 -20 -10 -17z",
  kpk: "M288 234 l-15 -30 -10 -35 -20 -15 -17 2 -10 15 2 20 -13 18 -15 3 -8 20 11 31 10 -14 18 -3 15 -15 -3 -20z",
  islamabad: "M290 236 l-3 3 0 4 3 0 1 -4 -1 -3z"
};

const regionNames: Record<Region, { x: number; y: number; name: string }> = {
    punjab: { x: 300, y: 350, name: 'Punjab' },
    sindh: { x: 170, y: 480, name: 'Sindh' },
    balochistan: { x: 80, y: 320, name: 'Balochistan' },
    kpk: { x: 250, y: 200, name: 'Khyber Pakhtunkhwa' },
    islamabad: { x: 300, y: 240, name: 'Islamabad' }
};

interface InteractiveMapProps {
  highlightedRegion: string | null;
}

export default function InteractiveMap({ highlightedRegion }: InteractiveMapProps) {
  return (
    <svg viewBox="0 0 400 600" className="w-full h-full">
      <g>
        {Object.entries(regionPaths).map(([key, path]) => {
            const isHighlighted = highlightedRegion === key;
            return (
                <path
                    key={key}
                    d={path}
                    className={cn(
                        "fill-gray-300 stroke-background stroke-2 transition-all duration-200",
                        isHighlighted ? "fill-primary" : "hover:fill-primary/50"
                    )}
                />
            )
        })}
         {Object.entries(regionNames).map(([key, { x, y, name }]) => (
           <text
            key={key}
            x={x}
            y={y}
            className="text-[10px] font-semibold fill-gray-600 pointer-events-none"
            textAnchor="middle"
           >
            {name}
           </text>
         ))}
      </g>
    </svg>
  );
}
