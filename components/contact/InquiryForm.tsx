'use client';

import {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {ChevronDown} from 'lucide-react';

import {SingleDateCalendar} from '@/components/shared/DateRangePicker';
import {suggestHotels} from '@/data/hotels';
import {tours} from '@/data/tours';
import {EMAIL} from '@/lib/contact';

const NOT_SURE = "I'm not sure yet";
const TOUR_CHOICES = [NOT_SURE, ...tours.map((tour) => tour.name)];
const AREAS = ['Playa del Carmen', 'Puerto Morelos', 'Akumal', 'Puerto Aventuras', 'Tulum', 'Cancún'];

const inputCls =
  'w-full rounded-2xl border border-text/10 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent-light/40 transition-shadow';
const choiceCls = (on: boolean) =>
  [
    'rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors',
    on
      ? 'border-accent bg-accent text-white'
      : 'border-text/10 bg-white text-text hover:border-accent/40 hover:bg-accent/5'
  ].join(' ');

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function InquiryForm({
  prefillTour,
  chooseAdventure = false
}: {
  prefillTour?: string;
  chooseAdventure?: boolean;
}) {
  const steps = chooseAdventure
    ? (['name', 'date', 'adventure', 'group', 'stay', 'note', 'email'] as const)
    : (['name', 'date', 'group', 'stay', 'note', 'email'] as const);
  const [step, setStep] = useState(0);
  const current = steps[step];
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [flexible, setFlexible] = useState<'yes' | 'no' | null>(null);
  const [otherDates, setOtherDates] = useState('');
  const [tourChoice, setTourChoice] = useState(
    prefillTour && tours.some((tour) => tour.name === prefillTour) ? prefillTour : NOT_SURE
  );
  const [tourOpen, setTourOpen] = useState(false);
  const tourMenuRef = useRef<HTMLDivElement>(null);
  const [groupSize, setGroupSize] = useState<number | null>(null);
  const [area, setArea] = useState('');
  const [hotel, setHotel] = useState('');
  const [hotelOpen, setHotelOpen] = useState(false);
  const [note, setNote] = useState('');
  const [email, setEmail] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [submitError, setSubmitError] = useState('');
  const [followUpUrl, setFollowUpUrl] = useState('');
  const [delivery, setDelivery] = useState<'inbox' | 'gmail'>('inbox');

  useEffect(() => {
    const onDown = (event: MouseEvent) => {
      if (tourMenuRef.current && !tourMenuRef.current.contains(event.target as Node)) setTourOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const goBack = () => {
    setFieldError('');
    setStep((current) => Math.max(0, current - 1));
  };

  const goNext = () => {
    if (current === 'name' && name.trim().length < 2) {
      setFieldError('Please enter your name.');
      return;
    }
    if (current === 'date' && !date) {
      setFieldError('Please choose a preferred date.');
      return;
    }
    if (current === 'date' && !flexible) {
      setFieldError('Please choose whether your dates are flexible.');
      return;
    }
    if (current === 'group' && !groupSize) {
      setFieldError('Please choose how many people are coming.');
      return;
    }
    if (current === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFieldError('Please enter a valid email.');
      return;
    }
    setFieldError('');
    if (step < steps.length - 1) setStep((currentStep) => currentStep + 1);
  };

  const onSubmit = async () => {
    if (!date || !groupSize) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFieldError('Please enter a valid email.');
      return;
    }

    setFieldError('');
    setSubmitError('');
    setSubmitState('submitting');
    const popup = window.open('about:blank', '_blank');
    const stay = [area, hotel.trim()].filter(Boolean).join(' — ');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          fullName: name.trim(),
          contactMethod: 'email',
          email: email.trim(),
          tour: chooseAdventure ? tourChoice : prefillTour,
          dateFrom: toIsoDate(date),
          datesFlexible: flexible ?? undefined,
          otherDates: flexible === 'yes' ? otherDates.trim() : undefined,
          groupSize,
          accommodation: stay || undefined,
          message: note.trim() || undefined
        })
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        mailUrl?: string;
      };

      if (!response.ok && data.error) {
        popup?.close();
        setSubmitState('idle');
        setSubmitError(data.error);
        return;
      }

      if (!data.ok && !data.mailUrl) {
        popup?.close();
        setSubmitState('idle');
        setSubmitError("That didn't send. Please try again in a moment.");
        return;
      }

      if (!data.ok && data.mailUrl) {
        setFollowUpUrl(data.mailUrl);
        setDelivery('gmail');
        if (popup) popup.location.href = data.mailUrl;
        else window.open(data.mailUrl, '_blank', 'noopener,noreferrer');
      } else {
        popup?.close();
        setDelivery('inbox');
        setFollowUpUrl('');
      }

      setSubmitState('success');
    } catch {
      popup?.close();
      setSubmitState('idle');
      setSubmitError("That didn't send. Please try again in a moment.");
    }
  };

  if (submitState === 'success') {
    return (
      <div className="rounded-3xl border border-accent/20 bg-accent/5 px-8 py-12 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-medium text-text mb-2">Got it!</h3>
        <p className="text-sm text-text-muted leading-6">
          {delivery === 'gmail'
            ? `Gmail is open with your inquiry addressed to ${EMAIL}. Hit send so it reaches me.`
            : "Your inquiry is in my inbox. I'll reply to your email within the hour."}
        </p>
        {followUpUrl ? (
          <a
            href={followUpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex text-sm font-semibold text-accent underline underline-offset-4"
          >
            Open Gmail again
          </a>
        ) : null}
      </div>
    );
  }

  const hotelSuggestions = hotelOpen ? suggestHotels(hotel, area) : [];

  return (
    <form
      className="@container"
      onSubmit={(event) => {
        event.preventDefault();
        if (current === 'email') onSubmit();
        else goNext();
      }}
    >
      <h2 className="whitespace-nowrap pr-10 text-[clamp(0.8rem,4.6cqi,1.85rem)] leading-tight">
        Let&apos;s start planning your adventure!
      </h2>
      <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-text-muted">
        {step + 1} of {steps.length}
      </p>
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {Array.from({length: steps.length}, (_, index) => (
          <span
            key={index}
            className={['h-1 flex-1 rounded-full', index <= step ? 'bg-accent' : 'bg-text/10'].join(' ')}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{opacity: 0, y: 10}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -8}}
          transition={{duration: 0.22, ease: [0.22, 1, 0.36, 1]}}
          className="mt-8"
        >
          {current === 'name' && (
            <div>
              <label htmlFor="inquiry-name" className="block text-2xl leading-snug text-text">
                What&apos;s your full name?
              </label>
              <input
                id="inquiry-name"
                autoFocus
                className={`${inputCls} mt-5`}
                placeholder="Full name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setFieldError('');
                }}
                aria-invalid={fieldError ? 'true' : 'false'}
              />
            </div>
          )}

          {current === 'date' && (
            <div>
              <p className="text-2xl leading-snug text-text">What is your preferred date for this adventure?</p>
              <div className="mt-5">
                <SingleDateCalendar
                  value={date}
                  onChange={(next) => {
                    setDate(next);
                    setFieldError('');
                  }}
                />
              </div>
              <p className="mt-6 text-base text-text">Are your dates flexible?</p>
              <div className="mt-3 flex gap-2">
                {(['yes', 'no'] as const).map((answer) => (
                  <button
                    key={answer}
                    type="button"
                    className={[
                      'grid h-11 w-24 place-items-center rounded-full border text-sm font-medium transition-colors',
                      flexible === answer
                        ? 'border-accent bg-accent text-white'
                        : 'border-text/10 bg-white text-text hover:border-accent/40 hover:bg-accent/5'
                    ].join(' ')}
                    onClick={() => {
                      setFlexible(answer);
                      setFieldError('');
                    }}
                  >
                    {answer === 'yes' ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
              {flexible === 'yes' && (
                <div className="mt-5">
                  <label htmlFor="inquiry-other-dates" className="block text-base text-text">
                    What other dates would work for you?
                  </label>
                  <textarea
                    id="inquiry-other-dates"
                    rows={3}
                    className={`${inputCls} mt-3`}
                    value={otherDates}
                    onChange={(event) => setOtherDates(event.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {current === 'adventure' && (
            <div>
              <p className="text-2xl leading-snug text-text">Which adventure would you like to book?</p>
              <div className="relative mt-5" ref={tourMenuRef}>
                <button
                  type="button"
                  onClick={() => setTourOpen((open) => !open)}
                  className="flex w-full items-center justify-between rounded-2xl border border-text/10 bg-white px-4 py-3 text-left text-sm outline-none focus:ring-2 focus:ring-accent/20"
                  aria-expanded={tourOpen}
                >
                  <span>{tourChoice}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-text-muted transition-transform ${tourOpen ? 'rotate-180' : ''}`} />
                </button>
                {tourOpen && (
                  <ul className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-text/10 bg-white py-1 shadow-xl">
                    {TOUR_CHOICES.map((choice) => (
                      <li key={choice}>
                        <button
                          type="button"
                          className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-text hover:bg-accent/5"
                          onClick={() => {
                            setTourChoice(choice);
                            setTourOpen(false);
                          }}
                        >
                          <span>{choice}</span>
                          {tourChoice === choice ? <span className="text-accent">✓</span> : null}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {current === 'group' && (
            <div>
              <p className="text-2xl leading-snug text-text">How many people are in your group?</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                  <button
                    key={count}
                    type="button"
                    className={[
                      'grid h-11 w-11 place-items-center rounded-xl border text-sm font-medium transition-colors',
                      groupSize === count
                        ? 'border-accent bg-accent text-white'
                        : 'border-text/10 bg-white text-text hover:border-accent/40 hover:bg-accent/5'
                    ].join(' ')}
                    onClick={() => {
                      setGroupSize(count);
                      setFieldError('');
                    }}
                  >
                    {count}
                  </button>
                ))}
                <button
                  type="button"
                  className={choiceCls(groupSize === 11)}
                  onClick={() => {
                    setGroupSize(11);
                    setFieldError('');
                  }}
                >
                  10+
                </button>
              </div>
            </div>
          )}

          {current === 'stay' && (
            <div>
              <p className="text-2xl leading-snug text-text">Where will you be staying?</p>
              <p className="mt-3 whitespace-nowrap text-sm leading-6 text-text-muted">
                If you haven&apos;t booked your accommodation yet, let me know which area you&apos;re planning to stay in.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {AREAS.map((place) => (
                  <button
                    key={place}
                    type="button"
                    className={choiceCls(area === place)}
                    onClick={() => setArea((current) => (current === place ? '' : place))}
                  >
                    {place}
                  </button>
                ))}
              </div>
              <label htmlFor="inquiry-hotel" className="mt-5 block text-sm font-medium text-text">
                Hotel or accommodation
              </label>
              <div className="relative mt-2">
                <input
                  id="inquiry-hotel"
                  className={inputCls}
                  placeholder="Start typing a hotel, or write your own"
                  value={hotel}
                  autoComplete="off"
                  onChange={(event) => {
                    setHotel(event.target.value);
                    setHotelOpen(true);
                  }}
                  onFocus={() => setHotelOpen(true)}
                  onBlur={() => setHotelOpen(false)}
                />
                {hotelSuggestions.length > 0 && (
                  <ul className="absolute z-20 mt-2 max-h-56 w-full overflow-auto rounded-2xl border border-text/10 bg-white py-1 shadow-xl">
                    {hotelSuggestions.map((match) => (
                      <li key={match.name}>
                        <button
                          type="button"
                          className="w-full px-4 py-2.5 text-left hover:bg-accent/5"
                          onMouseDown={(event) => {
                            event.preventDefault();
                            setHotel(match.name);
                            setHotelOpen(false);
                            if (!area) setArea(match.area);
                          }}
                        >
                          <span className="block text-sm text-text">{match.name}</span>
                          <span className="block text-xs text-text-muted">{match.area}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {current === 'note' && (
            <div>
              <label htmlFor="inquiry-note" className="block text-2xl leading-snug text-text">
                Any questions before we get started?
              </label>
              <p className="mt-3 whitespace-nowrap text-sm leading-6 text-text-muted">
                Questions, concerns, special requests, or anything you&apos;d like to know before your adventure?
              </p>
              <p className="whitespace-nowrap text-sm leading-6 text-text-muted">
                Tell me a little about your group so we can make sure the adventure is the right fit for you.
              </p>
              <textarea
                id="inquiry-note"
                autoFocus
                rows={5}
                className={`${inputCls} mt-5`}
                placeholder="Tell me anything that would make the day better..."
                value={note}
                onChange={(event) => setNote(event.target.value)}
              />
            </div>
          )}

          {current === 'email' && (
            <div>
              <label htmlFor="inquiry-email" className="block text-2xl leading-snug text-text">
                What&apos;s the best email address to reach you at?
              </label>
              <input
                id="inquiry-email"
                type="email"
                autoFocus
                className={`${inputCls} mt-5`}
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setFieldError('');
                }}
                aria-invalid={fieldError ? 'true' : 'false'}
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {fieldError ? <p className="mt-4 text-sm text-red-500">{fieldError}</p> : null}
      {submitError ? <p className="mt-4 text-sm text-red-500">{submitError}</p> : null}

      <div className="mt-8 flex items-center gap-4">
        {step > 0 ? (
          <button type="button" onClick={goBack} className="text-sm font-medium text-text-muted hover:text-text">
            Back
          </button>
        ) : null}
        <button
          type="submit"
          disabled={submitState === 'submitting'}
          className="inline-flex flex-1 items-center justify-center px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity disabled:opacity-60 shadow-[0_8px_32px_rgba(0,255,255,0.25)]"
          style={{borderRadius: '900px', background: 'linear-gradient(100deg, #00D4FF -8.86%, #2EE0B4 104.42%)'}}
        >
          {submitState === 'submitting' ? 'Sending...' : current === 'email' ? 'Send inquiry' : 'Next'}
        </button>
      </div>
    </form>
  );
}
