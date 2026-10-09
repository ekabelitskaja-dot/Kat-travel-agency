'use client';

import {createContext, useCallback, useContext, useState, useEffect, Suspense} from 'react';
import {X} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';

import {InquiryForm} from '@/components/contact/InquiryForm';

// ── Context ────────────────────────────────────────────────────────────────
type BookingModalCtx = {
  open: (tour?: string, chooseAdventure?: boolean) => void;
  close: () => void;
};

const Ctx = createContext<BookingModalCtx>({open: () => {}, close: () => {}});

export function useBookingModal() {
  return useContext(Ctx);
}

// ── Provider ───────────────────────────────────────────────────────────────
export function BookingModalProvider({children}: {children: React.ReactNode}) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillTour, setPrefillTour] = useState<string | undefined>();
  const [chooseAdventure, setChooseAdventure] = useState(false);

  const open = useCallback((tour?: string, chooseAdventure = false) => {
    setPrefillTour(tour);
    setChooseAdventure(chooseAdventure);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return (
    <Ctx.Provider value={{open, close}}>
      {children}
      <BookingModal isOpen={isOpen} onClose={close} prefillTour={prefillTour} chooseAdventure={chooseAdventure} />
    </Ctx.Provider>
  );
}

// ── Modal ──────────────────────────────────────────────────────────────────
function BookingModal({
  isOpen,
  onClose,
  prefillTour,
  chooseAdventure
}: {
  isOpen: boolean;
  onClose: () => void;
  prefillTour?: string;
  chooseAdventure: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 md:p-8"
            initial={{opacity: 0, y: 24}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 16}}
            transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
          >
            <div
              className="relative w-full max-w-[46rem] max-h-[90vh] overflow-y-auto rounded-3xl bg-bg shadow-[0_32px_80px_rgba(0,0,0,0.25)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-5 right-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-text/10 bg-white/80 text-text hover:bg-surface transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="p-8 md:p-10">
                <Suspense fallback={<div className="h-64 rounded-3xl bg-surface animate-pulse" />}>
                  <InquiryForm prefillTour={prefillTour} chooseAdventure={chooseAdventure} />
                </Suspense>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
