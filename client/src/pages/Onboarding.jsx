import React, { useState, useEffect } from 'react';
import wavePattern from '../assets/wave-pattern.svg?url';
import logoMark from '../assets/wavelist-logo.svg?url';

export default function Onboarding({ onGetStarted }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 700);
    const t2 = setTimeout(() => setStage(2), 1300);
    const t3 = setTimeout(() => setStage(3), 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const isFullBlue = stage < 2;
  const isLogoVisible = stage < 2;
  const isSheetVisible = stage >= 2;
  const isAssetsVisible = stage >= 3;

  return (
    <div className="min-h-screen bg-surface">
      <section className="w-full min-h-screen bg-surface flex flex-col overflow-hidden">
        <div
          className={`relative bg-[#4966e8] overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ${
            isFullBlue
              ? 'h-screen min-h-screen fixed inset-0 z-50'
              : 'h-[65vh] min-h-[470px] max-h-[500px] animate-[hero-blue-shrink_700ms_cubic-bezier(0.22,1,0.36,1)_forwards]'
          }`}
        >
          {isAssetsVisible && (
            <>
              <div
                className="absolute -left-2 top-[80px] w-[140px] h-[75px] bg-no-repeat bg-[length:140px_75px] opacity-20 pointer-events-none animate-[wave-slide-left_700ms_cubic-bezier(0.22,1,0.36,1)_forwards]"
                style={{ backgroundImage: `url(${wavePattern})` }}
              />
              <div
                className="absolute -right-2 bottom-[24px] w-[140px] h-[75px] bg-no-repeat bg-[length:140px_75px] opacity-20 pointer-events-none animate-[wave-slide-right_700ms_cubic-bezier(0.22,1,0.36,1)_forwards]"
                style={{ backgroundImage: `url(${wavePattern})` }}
              />
              <div className="absolute -top-7 -right-7 h-20 w-20 rounded-full border-[15px] border-[#5874ee] animate-[circle-slide-top-right_600ms_cubic-bezier(0.34,1.56,0.64,1)_forwards]" />
            </>
          )}

          {isLogoVisible && (
            <div
              className={`z-10 flex flex-col items-center justify-center ${
                stage === 0
                  ? 'animate-[logo-3d-entry_700ms_cubic-bezier(0.34,1.56,0.64,1)_forwards]'
                  : 'animate-[logo-scale-zero_600ms_ease-in-out_forwards] pointer-events-none'
              }`}
            >
              <img
                src={logoMark}
                alt="Wavelist Logo"
                className="w-24 h-24 drop-shadow-[0_16px_20px_rgba(0,0,0,0.3)]"
              />
              <span className="mt-4 text-[22px] font-bold tracking-wider text-white">
                Wavelist
              </span>
            </div>
          )}
        </div>

        {isSheetVisible && (
          <div className="flex flex-1 flex-col px-5 pt-[23px] pb-7 bg-white animate-[white-sheet-slide-up_700ms_cubic-bezier(0.22,1,0.36,1)_forwards]">
            <div>
              {isAssetsVisible ? (
                <>
                  <h1 className="text-[21px] font-bold leading-tight tracking-[-0.02em] text-text-primary opacity-0 animate-[text-fade-in-up_500ms_ease-out_100ms_forwards]">
                    Manage What To Do
                  </h1>
                  <p className="mt-4 max-w-[270px] text-[11px] leading-[1.45] text-[#767676] opacity-0 animate-[text-fade-in-up_500ms_ease-out_250ms_forwards]">
                    The best way to manage what you have to do,<br />
                    don&apos;t forget your plans
                  </p>
                </>
              ) : (
                <div className="opacity-0">
                  <h1 className="text-[21px] font-bold leading-tight tracking-[-0.02em] text-text-primary">
                    Manage What To Do
                  </h1>
                </div>
              )}
            </div>

            <button
              onClick={onGetStarted}
              className={`mt-auto w-full bg-[#4966e8] py-[11px] text-[14px] font-semibold text-white transition-colors hover:bg-primary-dark active:scale-[0.99] ${
                isAssetsVisible
                  ? 'opacity-0 animate-[text-fade-in-up_500ms_ease-out_400ms_forwards]'
                  : 'opacity-0'
              }`}
            >
              Get Started
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
