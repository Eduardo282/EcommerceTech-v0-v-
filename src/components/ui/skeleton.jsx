import { cn } from './utils';

function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      role="presentation"
      aria-hidden="true"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
