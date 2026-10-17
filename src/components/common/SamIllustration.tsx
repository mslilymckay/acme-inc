import React from 'react';

export type SamMood = 'stressed' | 'thinking' | 'satisfied';

interface SamIllustrationProps {
  mood?: SamMood;
  className?: string;
  size?: number | string;
}

export const SamIllustration: React.FC<SamIllustrationProps> = ({
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
      aria-label={`Sam from L&D - Mood: ${mood}`}
    >
      <defs>
        {/* Soft shadow under collar/chin */}
        <filter id="inkShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="1.5" stdDeviation="0" floodColor="#000000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* HAIR (Back silhouette) */}
      <path
        d="M 36 68 C 28 50 32 24 55 18 C 72 14 96 16 106 32 C 114 46 112 66 106 72 C 104 55 102 30 85 24 C 68 18 48 24 36 68 Z"
        fill="#453229"
        stroke="#1e293b"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* BODY / SHIRT (Mundane short-sleeve office shirt in faded blue) */}
      <g id="body">
        {/* Torso */}
        <path
          d="M 28 140 C 26 122 35 106 50 102 L 90 102 C 105 106 114 122 112 140 Z"
          fill="#c7d2fe"
          stroke="#1e293b"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Faded shirt fabric wrinkles */}
        <path
          d="M 40 118 Q 48 122 55 120 M 85 120 Q 92 122 100 118"
          stroke="#1e293b"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Collar left */}
        <path
          d="M 52 101 L 68 116 L 68 104 Z"
          fill="#e0e7ff"
          stroke="#1e293b"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        {/* Collar right */}
        <path
          d="M 88 101 L 72 116 L 72 104 Z"
          fill="#e0e7ff"
          stroke="#1e293b"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />

        {/* Acme Flux Lanyard (Corporate yellow strap) */}
        <path
          d="M 58 102 L 66 140 M 82 102 L 74 140"
          stroke="#facc15"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Plastic badge clip */}
        <rect
          x="65"
          y="126"
          width="10"
          height="14"
          rx="2"
          fill="#ffffff"
          stroke="#1e293b"
          strokeWidth="2"
        />
        <line x1="68" y1="130" x2="72" y2="130" stroke="#f43f5e" strokeWidth="1.5" />
      </g>

      {/* EARS */}
      {/* Left Ear */}
      <path
        d="M 38 66 C 30 66 30 78 39 82 C 40 82 41 78 40 74"
        fill="#fbc8a2"
        stroke="#1e293b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M 35 73 Q 38 75 37 78" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />

      {/* Right Ear */}
      <path
        d="M 102 66 C 110 66 110 78 101 82 C 100 82 99 78 100 74"
        fill="#fbc8a2"
        stroke="#1e293b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M 105 73 Q 102 75 103 78" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />

      {/* HEAD / FACE (Classic soft Bob's Burgers pear-shaped silhouette) */}
      <path
        d="M 40 60 C 38 34 52 24 70 24 C 88 24 102 34 100 60 C 101 78 96 98 84 101 C 74 104 66 104 56 101 C 44 98 39 78 40 60 Z"
        fill="#fcd5b5"
        stroke="#1e293b"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />

      {/* Subtle overworked 5 o'clock shadow on chin */}
      <path
        d="M 50 86 C 54 99 86 99 90 86 C 88 94 80 100 70 100 C 60 100 52 94 50 86 Z"
        fill="#f2bc94"
        opacity="0.45"
      />

      {/* FOREHEAD HAIR BANGS / COWLICK */}
      <path
        d="M 40 44 C 48 34 62 30 72 34 C 84 32 96 38 100 48 C 96 42 85 38 74 40 C 64 36 50 40 40 44 Z"
        fill="#453229"
        stroke="#1e293b"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      {/* Stray hair strand */}
      <path d="M 68 24 Q 65 16 60 18" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 72 24 Q 75 16 80 19" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />

      {/* NOSE (Simple bulbous, signature Loren Bouchard style hook) */}
      <path
        d="M 68 54 L 66 68 C 66 72 75 73 75 68"
        stroke="#1e293b"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ================= DYNAMIC MOOD FEATURES ================= */}

      {/* 1. STRESSED / EXHAUSTED (Default: drooping eyelids, eye bags, flat mouth) */}
      {mood === 'stressed' && (
        <g id="mood-stressed">
          {/* Eyebrows (Flat, weary) */}
          <path d="M 47 47 Q 56 46 62 48" stroke="#1e293b" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 78 48 Q 84 46 93 47" stroke="#1e293b" strokeWidth="2.6" strokeLinecap="round" />

          {/* Eyes (Round with heavy drooping lids) */}
          {/* Left Eye */}
          <circle cx="55" cy="56" r="6.5" fill="#ffffff" stroke="#1e293b" strokeWidth="2.6" />
          <circle cx="55" cy="57" r="2.4" fill="#1e293b" />
          {/* Drooping upper lid */}
          <path d="M 48 53 Q 55 58 62 53" fill="#fcd5b5" stroke="#1e293b" strokeWidth="2.4" />
          {/* Under-eye bag */}
          <path d="M 49 64 Q 55 67 61 64" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />

          {/* Right Eye */}
          <circle cx="85" cy="56" r="6.5" fill="#ffffff" stroke="#1e293b" strokeWidth="2.6" />
          <circle cx="85" cy="57" r="2.4" fill="#1e293b" />
          {/* Drooping upper lid */}
          <path d="M 78 53 Q 85 58 92 53" fill="#fcd5b5" stroke="#1e293b" strokeWidth="2.4" />
          {/* Under-eye bag */}
          <path d="M 79 64 Q 85 67 91 64" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />

          {/* Mouth (Deadpan straight line with tiny weary downward tilt) */}
          <path
            d="M 57 84 Q 68 83 78 84 L 79 86"
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Chin crease */}
          <path d="M 66 93 Q 70 94 74 93" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}

      {/* 2. THINKING / INVESTIGATING (One raised eyebrow, squint, puzzled mouth) */}
      {mood === 'thinking' && (
        <g id="mood-thinking">
          {/* Eyebrows: Left raised high with skepticism, Right furrowed down */}
          <path d="M 46 43 Q 54 39 63 44" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 77 49 Q 85 49 93 46" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />

          {/* Left Eye (Wide, skeptical) */}
          <circle cx="55" cy="54" r="7" fill="#ffffff" stroke="#1e293b" strokeWidth="2.6" />
          <circle cx="57" cy="54" r="2.5" fill="#1e293b" />
          <path d="M 50 63 Q 55 65 60 63" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />

          {/* Right Eye (Narrow squint) */}
          <path
            d="M 77 56 Q 85 52 93 56 Q 85 60 77 56 Z"
            fill="#ffffff"
            stroke="#1e293b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <circle cx="85" cy="56" r="2.2" fill="#1e293b" />
          <path d="M 79 63 Q 85 65 91 63" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />

          {/* Mouth (Slightly pursed, tilted thinking grimace) */}
          <path
            d="M 59 84 Q 66 82 76 81"
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Little chin dimple */}
          <circle cx="70" cy="92" r="1" fill="#1e293b" />
        </g>
      )}

      {/* 3. DRY SATISFACTION / RELIEVED (The subtle Bob Belcher smirk, relaxed eyes) */}
      {mood === 'satisfied' && (
        <g id="mood-satisfied">
          {/* Eyebrows (Relaxed, slight friendly lift) */}
          <path d="M 47 46 Q 55 43 62 47" stroke="#1e293b" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M 78 47 Q 85 43 93 46" stroke="#1e293b" strokeWidth="2.6" strokeLinecap="round" />

          {/* Eyes (Pleasantly relaxed ovals) */}
          {/* Left Eye */}
          <circle cx="55" cy="55" r="6.5" fill="#ffffff" stroke="#1e293b" strokeWidth="2.6" />
          <circle cx="56" cy="55" r="2.5" fill="#1e293b" />
          {/* Happy eyelid curve */}
          <path d="M 49 53 Q 55 50 61 53" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />

          {/* Right Eye */}
          <circle cx="85" cy="55" r="6.5" fill="#ffffff" stroke="#1e293b" strokeWidth="2.6" />
          <circle cx="86" cy="55" r="2.5" fill="#1e293b" />
          {/* Happy eyelid curve */}
          <path d="M 79 53 Q 85 50 91 53" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />

          {/* Mouth: The signature subtle deadpan Bob's Burgers smirk 😏 */}
          <path
            d="M 56 83 Q 66 85 76 79 Q 78 77 80 75"
            stroke="#1e293b"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Smirk dimple crease at corner */}
          <path d="M 79 74 Q 82 77 81 80" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
          {/* Gentle chin smile line */}
          <path d="M 65 92 Q 70 94 75 92" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
};
