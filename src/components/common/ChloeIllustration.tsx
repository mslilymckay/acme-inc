import React from 'react';

export type ChloeMood = 'stressed' | 'thinking' | 'satisfied';

interface ChloeIllustrationProps {
  mood?: ChloeMood;
  className?: string;
  size?: number | string;
}

export const ChloeIllustration: React.FC<ChloeIllustrationProps> = ({
  mood = 'stressed',
  className = '',
  size = 64
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none shrink-0 ${className}`}
      aria-label={`Chloe from Executive Comms - Mood: ${mood}`}
    >
      {/* HAIR (Back silhouette - blonde bob) */}
      <path
        d="M 32 66 C 26 42 34 18 58 14 C 76 10 96 14 108 26 C 118 38 116 66 110 74 C 104 54 98 24 78 20 C 58 16 42 28 32 66 Z"
        fill="#fef08a"
        stroke="#1e293b"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />

      {/* BODY / BLAZER (Tailored plum/purple blazer over crisp white blouse) */}
      <g id="body">
        {/* Torso */}
        <path
          d="M 28 140 C 26 120 36 104 52 100 L 88 100 C 104 104 114 120 112 140 Z"
          fill="#581c87"
          stroke="#1e293b"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Inner white blouse */}
        <path
          d="M 58 100 L 70 122 L 82 100 Z"
          fill="#ffffff"
          stroke="#1e293b"
          strokeWidth="2.4"
        />

        {/* Lapels */}
        <path
          d="M 50 100 L 62 124 L 56 140 M 90 100 L 78 124 L 84 140"
          stroke="#3b0764"
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* Little pearl necklace */}
        <path
          d="M 64 108 A 6 3 0 0 0 76 108"
          stroke="#e2e8f0"
          strokeWidth="2"
          strokeDasharray="2 2"
          strokeLinecap="round"
        />
      </g>

      {/* EARS & PEARL EARRINGS */}
      {/* Left Ear */}
      <path
        d="M 38 68 C 30 68 30 80 39 84 C 40 84 41 80 40 76"
        fill="#fed7aa"
        stroke="#1e293b"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="35" cy="76" r="2.2" fill="#ffffff" stroke="#1e293b" strokeWidth="1.2" />

      {/* Right Ear */}
      <path
        d="M 102 68 C 110 68 110 80 101 84 C 100 84 99 80 100 76"
        fill="#fed7aa"
        stroke="#1e293b"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="105" cy="76" r="2.2" fill="#ffffff" stroke="#1e293b" strokeWidth="1.2" />

      {/* HEAD BASE */}
      <path
        d="M 42 52 C 42 32 50 24 70 24 C 90 24 98 32 98 52 C 98 76 94 96 70 96 C 46 96 42 76 42 52 Z"
        fill="#ffedd5"
        stroke="#1e293b"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />

      {/* FRONT HAIR (Side-swept blonde bangs) */}
      <path
        d="M 42 42 C 46 28 62 24 78 28 C 92 32 98 44 98 52 C 96 40 84 34 72 34 C 58 34 48 38 42 42 Z"
        fill="#fde047"
        stroke="#1e293b"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />

      {/* NOSE */}
      <path
        d="M 69 56 L 67 66 L 73 66"
        fill="none"
        stroke="#1e293b"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* EYES & EYEBROWS (Based on Mood) */}
      {mood === 'satisfied' ? (
        /* Satisfied: Earnest wide eyes, happy arched eyebrows, warm full smile */
        <g id="satisfied-face">
          {/* Eyebrows */}
          <path d="M 46 44 Q 55 38 64 43" fill="none" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 76 43 Q 85 38 94 44" fill="none" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />

          {/* Left pupil */}
          <circle cx="55" cy="56" r="3.2" fill="#1e293b" />
          <circle cx="54" cy="55" r="1.2" fill="#ffffff" />

          {/* Right pupil */}
          <circle cx="85" cy="56" r="3.2" fill="#1e293b" />
          <circle cx="84" cy="55" r="1.2" fill="#ffffff" />

          {/* Warm confident smile with visible teeth */}
          <path
            d="M 58 76 C 58 86 82 86 82 76 Z"
            fill="#e11d48"
            stroke="#1e293b"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <path d="M 60 76 Q 70 78 80 76" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />

          {/* Rosy cheeks */}
          <circle cx="46" cy="68" r="4" fill="#fb7185" fillOpacity="0.4" />
          <circle cx="94" cy="68" r="4" fill="#fb7185" fillOpacity="0.4" />
        </g>
      ) : (
        /* Stressed: Frantic slanted eyebrows, wide stressed pupils, wavy mouth */
        <g id="stressed-face">
          {/* Frantic eyebrows */}
          <path d="M 46 42 L 62 46" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 78 46 L 94 42" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />

          {/* Stressed wide pupils */}
          <circle cx="55" cy="56" r="2.8" fill="#1e293b" />
          <circle cx="85" cy="56" r="2.8" fill="#1e293b" />

          {/* Stress lines under eyes */}
          <path d="M 48 62 Q 54 64 60 62" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 80 62 Q 86 64 92 62" stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" />

          {/* Wavy stressed mouth */}
          <path
            d="M 58 78 Q 64 82 70 78 Q 76 74 82 78"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Yellow pencil stuck behind hair */}
          <g id="pencil" transform="rotate(35 100 40)">
            <rect x="94" y="30" width="4" height="24" rx="1" fill="#facc15" stroke="#1e293b" strokeWidth="1.5" />
            <polygon points="94,54 98,54 96,60" fill="#fed7aa" stroke="#1e293b" strokeWidth="1.2" />
            <polygon points="95,58 97,58 96,60" fill="#1e293b" />
          </g>
        </g>
      )}
    </svg>
  );
};
