// This component is purely for visual presentation.
// For a real-world application, you would use a proper geo-mapping library
// like Leaflet, Mapbox, or Google Maps Platform.
// The SVG paths are simplified but geographically representative.

import { cn } from "@/lib/utils";

type Region = 'punjab' | 'sindh' | 'balochistan' | 'kpk' | 'islamabad';

// More accurate SVG paths for Pakistan's provinces
const regionPaths: Record<Region, string> = {
  kpk: "M246.3 120.3l-13.8 22.1-13.8 14.6-2.1 16.5-12.3 9.3-11.8 21.2-11.2 21.7 19.3 16.9 2.1 11.2 13.8-9.8 15.4-1.8 16.5-15.1 14.3-15.1 7.2-22.1 9.8-21.2 24.9 14.3 16.5 13.3 2.1 12.8-11.8 24.9-10.8h-16.5l-9.8 16 12.3 22.7 13.8-2.1 27-24.9 12.8-23.7 39.8-38.2 19.9-29.6 15.4-25.5 2.1-14.3-16-16.5-19.9-2.1-12.8 14.6-11.8 13.3-15.4 7.2-13.8-1.6-14.3-18.4z",
  punjab: "M285.3 245.8l-12.8 23.7-27 24.9-13.8 2.1-12.3-22.7 9.8-16h16.5l24.9-10.8 12.8 11.8 13.3-2.1 14.3-16.5 21.2-24.9 22.1-9.8 7.2 22.1 23.2 29.1 12.3 33.8 4.7 30.7-20.2 38.2-12.8 16-32.9 27-31.8 1.6-27-21.2-16-15.4-11.8-22.1-23.7-18.9z",
  islamabad: "M281.8 244.2l5.2-2.1 4.2 4.7-3.7 4.2-5.7-1.1z",
  balochistan: "M269.4 290.4l-19.3-16.9 11.2-21.7 11.8-21.2 12.3-9.3 2.1-16.5 13.8-14.6 13.8-22.1 19.9 29.6 38.2 38.2-24.9 21.2-21.2 40.3-43.9 63.8-23.7 26-11.8 12.3-23.7-2.7-31.8-20.7-31.8-16.9-20.2-15.4-19.9-16.9-21.7-21.2-18.9z",
  sindh: "M245.7 439.4l-23.7 2.7 11.8-12.3 23.7-26 43.9-63.8 21.2-40.3 24.9-21.2-23.7 18.9-11.8 22.1-16 15.4-27 21.2-31.8-1.6-32.9-27-12.8-16 20.2-38.2-18.4-19.9-16.9-20.2z"
};

const regionNames: Record<Region, { x: number; y: number; name: string }> = {
    punjab: { x: 330, y: 340, name: 'Punjab' },
    sindh: { x: 230, y: 480, name: 'Sindh' },
    balochistan: { x: 120, y: 350, name: 'Balochistan' },
    kpk: { x: 260, y: 180, name: 'KPK' },
    islamabad: { x: 295, y: 245, name: 'ICT' }
};

interface InteractiveMapProps {
  highlightedRegion: string | null;
}

export default function InteractiveMap({ highlightedRegion }: InteractiveMapProps) {
  return (
    <svg viewBox="0 0 450 600" className="w-full h-full">
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
