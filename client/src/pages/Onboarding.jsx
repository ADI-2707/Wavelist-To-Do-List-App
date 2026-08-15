import React from 'react';
import wavePattern from '../assets/wave-pattern.svg?url';
import logoMark from '../assets/wavelist-logo.svg?url';

export default function Onboarding({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-surface">
      <section className="w-full min-h-screen bg-surface flex flex-col overflow-hidden">
        <div className="relative bg-[#4966e8] overflow-hidden flex flex-col items-center justify-center min-h-[470px] max-h-[500px] animate-[onboarding-blue-hero-continuous_1600ms_cubic-bezier(0.25,1,0.5,1)_forwards]">
          <div
            className="absolute -left-2 top-[80px] w-[140px] h-[75px] bg-no-repeat bg-[length:140px_75px] pointer-events-none animate-[onboarding-wave-left-continuous_1600ms_cubic-bezier(0.25,1,0.5,1)_forwards]"
            style={{ backgroundImage: `url(${wavePattern})` }}
          />
          <div
            className="absolute -right-2 bottom-[24px] w-[140px] h-[75px] bg-no-repeat bg-[length:140px_75px] pointer-events-none animate-[onboarding-wave-right-continuous_1600ms_cubic-bezier(0.25,1,0.5,1)_forwards]"
            style={{ backgroundImage: `url(${wavePattern})` }}
          />
          <div className="absolute -top-7 -right-7 h-20 w-20 rounded-full border-[15px] border-[#5874ee] animate-[onboarding-circle-continuous_1600ms_cubic-bezier(0.25,1,0.5,1)_forwards]" />

          <div className="z-10 flex flex-col items-center justify-center pointer-events-none animate-[onboarding-logo-continuous_1600ms_cubic-bezier(0.25,1,0.5,1)_forwards]">
            <img
              src={logoMark}
              alt="Wavelist Logo"
              className="w-24 h-24 drop-shadow-[0_16px_20px_rgba(0,0,0,0.3)]"
            />
            <span className="mt-4 text-[22px] font-bold tracking-wider text-white">
              Wavelist
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-5 pt-[23px] pb-7 bg-white animate-[onboarding-white-sheet-continuous_1600ms_cubic-bezier(0.25,1,0.5,1)_forwards]">
          <div>
            <h1 className="text-[21px] font-bold leading-tight tracking-[-0.02em] text-text-primary opacity-0 animate-[text-fade-in-up_500ms_ease-out_800ms_forwards]">
              Manage What To Do
            </h1>
            <p className="mt-4 max-w-[270px] text-[11px] leading-[1.45] text-[#767676] opacity-0 animate-[text-fade-in-up_500ms_ease-out_950ms_forwards]">
              The best way to manage what you have to do,<br />
              don&apos;t forget your plans
            </p>
          </div>

          <button
            onClick={onGetStarted}
            className="mt-auto w-full bg-[#4966e8] py-[11px] text-[14px] font-semibold text-white transition-colors hover:bg-primary-dark active:scale-[0.99] opacity-0 animate-[text-fade-in-up_500ms_ease-out_1100ms_forwards]"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
