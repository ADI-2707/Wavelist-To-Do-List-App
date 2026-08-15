import React, { useState, useEffect } from 'react';
import wavePattern from '../assets/wave-pattern.svg?url';
import logoMark from '../assets/wavelist-logo.svg?url';

export default function Onboarding({ onGetStarted }) {
  const [animationStage, setAnimationStage] = useState('splash');

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setAnimationStage('hero');
    }, 900);

    const completeTimer = setTimeout(() => {
      setAnimationStage('complete');
    }, 1600);

    return () => {
      clearTimeout(splashTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  const isSplash = animationStage === 'splash';

  return (
    <div className="min-h-screen bg-surface">
      <section className="w-full min-h-screen bg-surface flex flex-col overflow-hidden">
        <div
          className={`relative bg-[#4966e8] overflow-hidden flex flex-col items-center justify-center transition-all duration-700 ${
            isSplash
              ? 'h-screen min-h-screen'
              : 'h-[65vh] min-h-[470px] max-h-[500px] animate-[hero-blue-shrink_700ms_cubic-bezier(0.22,1,0.36,1)_forwards]'
          }`}
        >
          <div
            className={`absolute -left-2 top-[80px] w-[140px] h-[75px] bg-no-repeat bg-[length:140px_75px] opacity-20 pointer-events-none ${
              !isSplash ? 'animate-[wave-slide-left_700ms_cubic-bezier(0.22,1,0.36,1)_forwards]' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${wavePattern})` }}
          />
          <div
            className={`absolute -right-2 bottom-[24px] w-[140px] h-[75px] bg-no-repeat bg-[length:140px_75px] opacity-20 pointer-events-none ${
              !isSplash ? 'animate-[wave-slide-right_700ms_cubic-bezier(0.22,1,0.36,1)_forwards]' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${wavePattern})` }}
          />
          <div
            className={`absolute -top-7 -right-7 h-20 w-20 rounded-full border-[15px] border-[#5874ee] ${
              !isSplash ? 'animate-[circle-slide-top-right_600ms_cubic-bezier(0.34,1.56,0.64,1)_forwards]' : 'opacity-0 scale-0'
            }`}
          />

          <div
            className={`z-10 flex flex-col items-center justify-center transition-all duration-700 ${
              isSplash
                ? 'animate-[logo-3d-entry_800ms_cubic-bezier(0.34,1.56,0.64,1)_forwards]'
                : 'scale-90 transform-gpu'
            }`}
          >
            <img
              src={logoMark}
              alt="Wavelist Logo"
              className="w-24 h-24 drop-shadow-[0_16px_20px_rgba(0,0,0,0.3)] transition-transform duration-500"
            />
            <span
              className={`mt-4 text-[22px] font-bold tracking-wider text-white transition-all duration-500 ${
                isSplash ? 'opacity-100 scale-100' : 'opacity-90 scale-95'
              }`}
            >
              Wavelist
            </span>
          </div>
        </div>

        {!isSplash && (
          <div className="flex flex-1 flex-col px-5 pt-[23px] pb-7 bg-white animate-[white-sheet-slide-up_700ms_cubic-bezier(0.22,1,0.36,1)_forwards]">
            <div>
              <h1 className="text-[21px] font-bold leading-tight tracking-[-0.02em] text-text-primary opacity-0 animate-[text-fade-in-up_500ms_ease-out_200ms_forwards]">
                Manage What To Do
              </h1>
              <p className="mt-4 max-w-[270px] text-[11px] leading-[1.45] text-[#767676] opacity-0 animate-[text-fade-in-up_500ms_ease-out_350ms_forwards]">
                The best way to manage what you have to do,<br />
                don&apos;t forget your plans
              </p>
            </div>

            <button
              onClick={onGetStarted}
              className="mt-auto w-full bg-[#4966e8] py-[11px] text-[14px] font-semibold text-white transition-colors hover:bg-primary-dark active:scale-[0.99] opacity-0 animate-[text-fade-in-up_500ms_ease-out_500ms_forwards]"
            >
              Get Started
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
