'use client';

import {useState, useRef, useEffect} from 'react';
import {DayPicker} from 'react-day-picker';
import type {DateRange} from 'react-day-picker';
import {Calendar} from 'lucide-react';

function fmt(date: Date) {
  return date.toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'});
}

function displayValue(range: DateRange | undefined): string {
  if (!range?.from) return '';
  if (!range.to) return fmt(range.from);
  return `${fmt(range.from)} - ${fmt(range.to)}`;
}

interface Props {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  hasError?: boolean;
}

const cls = {
  root: 'p-3 select-none w-full',
  months: 'relative flex w-full',
  month: 'w-full',
  month_caption: 'mx-0.5 mb-3 flex h-11 items-center justify-center rounded-full bg-surface pointer-events-none',
  caption_label: 'text-sm font-semibold text-text',
  nav: 'absolute inset-x-0 top-0 z-10 flex h-11 items-center justify-between px-1.5',
  button_previous: 'grid h-8 w-8 place-items-center rounded-full text-accent hover:bg-white active:bg-white transition-colors touch-manipulation',
  button_next: 'grid h-8 w-8 place-items-center rounded-full text-accent hover:bg-white active:bg-white transition-colors touch-manipulation',
  chevron: 'h-4 w-4',
  month_grid: 'w-full border-collapse',
  weekdays: '',
  weekday: 'text-[11px] font-medium text-text-muted pb-2 text-center',
  week: '',
  day: 'p-0 text-center',
  day_button: [
    'h-8 w-8 mx-auto flex items-center justify-center rounded-full text-sm',
    'text-text hover:bg-accent/10 transition-colors cursor-pointer',
    'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent',
  ].join(' '),
  today: 'font-semibold underline underline-offset-2',
  selected: '!bg-accent !text-white !rounded-full hover:!bg-accent-light',
  range_start: '!bg-accent !text-white !rounded-full',
  range_end:   '!bg-accent !text-white !rounded-full',
  range_middle: '!bg-accent/10 !text-text !rounded-none',
  outside: 'opacity-30',
  disabled: 'opacity-25 cursor-not-allowed',
};

export function SingleDateCalendar({
  value,
  onChange
}: {
  value?: Date;
  onChange: (date: Date | undefined) => void;
}) {
  return (
    <div className="rounded-2xl border border-text/10 bg-white">
      <DayPicker
        mode="single"
        selected={value}
        onSelect={onChange}
        disabled={{before: new Date()}}
        classNames={cls}
      />
    </div>
  );
}

export function DateRangePicker({value, onChange, hasError}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const handleSelect = (range: DateRange | undefined) => {
    onChange(range);
    if (range?.from && range?.to) setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={[
          'w-full flex items-center justify-between rounded-2xl border bg-white px-4 py-3 text-sm text-left outline-none focus:ring-2 focus:ring-accent/20 transition-shadow',
          hasError ? 'border-red-400' : 'border-text/10',
        ].join(' ')}
      >
        <span className={value?.from ? 'text-text' : 'text-text-muted/60'}>
          {value?.from ? displayValue(value) : 'Select date or range'}
        </span>
        <Calendar className="h-4 w-4 text-text-muted shrink-0 ml-2" />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-2xl shadow-xl border border-black/8 overflow-hidden">
          <DayPicker
            mode="range"
            selected={value}
            onSelect={handleSelect}
            disabled={{before: new Date()}}
            numberOfMonths={1}
            classNames={cls}
          />
        </div>
      )}
    </div>
  );
}
