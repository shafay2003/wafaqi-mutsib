import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OmbudsmanLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  priority?: boolean;
  alt?: string;
}

const sizeMap = {
  sm: 'h-6 w-6',
  md: 'h-8 w-8', 
  lg: 'h-10 w-10',
  xl: 'h-12 w-12'
};

export function OmbudsmanLogo({ 
  className, 
  size = 'md', 
  priority = false, 
  alt = "Wafaqi Mutsib (Ombudsman) Logo" 
}: OmbudsmanLogoProps) {
  return (
    <div className={cn('relative', sizeMap[size], className)}>
      <Image
        src="/images/ombudsman-logo.png"
        alt={alt}
        fill
        className="object-contain"
        priority={priority}
      />
    </div>
  );
}