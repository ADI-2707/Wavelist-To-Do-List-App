import React from 'react';
import wavePattern from '../assets/wave-pattern.svg';

export default function Onboarding({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-surface">
      <section className="w-full min-h-screen bg-surface flex flex-col overflow-hidden">
        <div className="relative h-[65vh] min-h-[470px] max-h-[500px] bg-[#4966e8] overflow-hidden">
          <div
            className="absolute -left-1 top-[92px] w-[112px] h-[68px] bg-no-repeat bg-[length:136px_68px] opacity-70"
            style={{ backgroundImage: `url(${wavePattern})` }}
          />
          <div
            className="absolute -right-1 bottom-[28px] w-[110px] h-[68px] bg-no-repeat bg-[length:136px_68px] opacity-70"
            style={{ backgroundImage: `url(${wavePattern})` }}
          />
          <div className="absolute -top-7 -right-7 h-20 w-20 rounded-full border-[15px] border-[#5874ee]" />
        </div>

        <div className="flex flex-1 flex-col px-5 pt-[23px] pb-7">
          <div>
            <h1 className="text-[21px] font-bold leading-tight tracking-[-0.02em] text-text-primary">
              Manage What To Do
            </h1>
            <p className="mt-4 max-w-[270px] text-[11px] leading-[1.45] text-[#767676]">
              The best way to manage what you have to do,<br />
              don&apos;t forget your plans
            </p>
          </div>

          <button
            onClick={onGetStarted}
            className="mt-auto w-full bg-[#4966e8] py-[11px] text-[14px] font-semibold text-white transition-colors hover:bg-primary-dark active:scale-[0.99]"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}
