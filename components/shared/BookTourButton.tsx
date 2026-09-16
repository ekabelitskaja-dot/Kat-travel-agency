'use client';

import {useBookingModal} from '@/components/shared/BookingModal';
import {Button} from '@/components/shared/Button';

export function BookTourButton({
  label,
  tourName,
  variant = 'primary',
  className
}: {
  label: string;
  tourName?: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'soft';
  className?: string;
}) {
  const {open} = useBookingModal();
  return (
    <Button variant={variant} className={className} onClick={() => open(tourName)}>
      {label}
    </Button>
  );
}
