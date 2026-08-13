import React from 'react';
import waveLogo from '../assets/wavelist-logo.svg';
import wavePattern from '../assets/wave-pattern.svg';

export default function Onboarding({ onGetStarted }) {
  return (
    <div className="relative min-h-screen bg-primary flex flex-col justify-between p-6 overflow-hidden text-white">
      {/* Background Decorative Pattern & Circles */}
      <div
        className="absolute top-0 left-0 w-full h-72 bg-no-repeat opacity-40 pointer-events-none"
        style={{ backgroundImage: `url(${wavePattern})`, backgroundSize: 'cover' }}
      />
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />
      <div className="absolute bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

      {/* Top Section - Brand */}
      <div className="relative z-10 pt-8 flex items-center gap-3">
        <img src={waveLogo} alt="Wavelist Logo" className="w-12 h-12 shadow-lg rounded-2xl" />
        <span className="text-[22px] font-bold tracking-wide">Wavelist</span>
      </div>

      {/* Center Hero Illustration / Visual Motif */}
      <div className="relative z-10 my-auto py-12 flex flex-col items-center justify-center text-center">
        <div className="w-48 h-48 rounded-3xl bg-white/15 border border-white/20 backdrop-blur-md flex flex-col items-center justify-center shadow-2xl relative p-6 mb-8 group transform hover:scale-105 transition-transform duration-300">
          <img src={waveLogo} alt="Wave Brand" className="w-24 h-24 drop-shadow-lg mb-2" />
          <div className="w-16 h-1.5 bg-white/40 rounded-full" />
        </div>
      </div>

      {/* Bottom Content & CTA */}
      <div className="relative z-10 pb-8 space-y-6">
        <div className="space-y-3">
          <h1 className="text-[28px] sm:text-[32px] font-bold leading-tight drop-shadow-sm">
            Manage What To Do
          </h1>
          <p className="text-[15px] font-normal text-white/80 leading-relaxed max-w-sm">
            Streamline your daily tasks, keep track of weekly progress, and ride the wave of productivity.
          </p>
        </div>

        <button
          onClick={onGetStarted}
          className="w-full py-4 bg-white text-primary rounded-input text-[16px] font-bold shadow-xl hover:bg-primary-light active:scale-[0.98] transition-all duration-200"
        >
          Get started
        </button>
      </div>
    </div>
  );
}
