import Link from 'next/link';
import { TelevisionPlayIcon } from '@/components/icons/television-play-icon';

export function CineLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };
  const iconSizeClasses = {
    sm: 'h-6 w-auto', // Adjusted height slightly for new icon aspect ratio
    md: 'h-7 w-auto', // Adjusted height slightly for new icon aspect ratio
    lg: 'h-8 w-auto', // Adjusted height slightly for new icon aspect ratio
  };

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <TelevisionPlayIcon
        className={`${iconSizeClasses[size]} text-foreground group-hover:text-accent transition-colors`}
      />
      <span className={`font-bold ${sizeClasses[size]} text-foreground group-hover:text-accent transition-colors`}>
        uMovies
      </span>
    </Link>
  );
}
