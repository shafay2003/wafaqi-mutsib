import type { SVGProps } from "react";
import { ArrowRight, FileText, Search, Gavel, Library, Newspaper, Star, Megaphone } from 'lucide-react';


export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      {...props}
    >
      <g fill="currentColor">
        <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88Z" />
        <path d="M172.47 100.86a8 8 0 0 0-8.94 1.72L136 126.5V72a8 8 0 0 0-16 0v54.5l-27.53-23.92a8 8 0 0 0-10.66 11.88l40 34.78a8 8 0 0 0 10.66 0l40-34.78a8 8 0 0 0-1.72-10.6Z" />
        <path d="M89.78 168.14a8 8 0 0 0-11.32 0 8 8 0 0 0 0 11.31l40 40a8 8 0 0 0 11.32 0l40-40a8 8 0 0 0-11.32-11.31L128 198.69Z" opacity={0.5} />
      </g>
    </svg>
  );
}

export const StepIcons = {
  Submit: FileText,
  Investigate: Search,
  Resolution: Gavel
};
