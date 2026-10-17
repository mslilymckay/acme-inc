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
      {/* HAIR (Back silhouette) */}
      <path
        d="M 36 68 C 28 50 32 24 55 18 C 72 14 96 16 106 32 C 114 46 112 66 106 72 C 104 55 102 30 85 24 C 68 18 48 24 36 68 Z"
        fill="#453229"
        stroke="#1e293b"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />

      {/* BODY / SHIRT (Faded blue short-sleeve office collared shirt) */}
      <g id="body">
        {/* Torso */}
        <path
          d="M 28 140 C 26 122 35 106 50 102 L 90 102 C 105 106 114 122 112 140 Z"
          fill="#c7d2fe"
          stroke="#1e293b"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Wrinkles */}
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

        {/* Acme Flux Lanyard */}
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

      {/* HEAD / FACE (Classic soft Bob's Burgers pear silhouette) */}
      <path
        d="M 40 60 C 38 32 52 22 70 22 C 88 22 102 32 100 60 C 101 78 96 98 84 101 C 74 104 66 104 56 101 C 44 98 39 78 40 60 Z"
        fill="#fcd5b5"
        stroke="#1e293b"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />

      {/* Subtle overworked 5 o'clock shadow on chin */}
      <path
        d="M 50 86 C 54 99 86 99 90 86 C 88 94 80 100 70 100 C 60 100 52 94 50 86 Z"
        fill="#f2bc94"
        opacity="0.4"
      />

      {/* TWO COMBOVER HAIRS ON FOREHEAD (No bald patch, classic Bob's Burgers combover) */}
      <path
        d="M 46 30 C 56 24 76 25 86 31"
        stroke="#1e293b"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <path
        d="M 48 36 C 58 30 74 31 82 37"
        stroke="#1e293b"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Crown cowlick strands */}
      <path d="M 68 22 Q 65 14 60 16" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 73 22 Q 77 15 82 17" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />

      {/* NOSE (Signature bulbous Loren Bouchard hook nose) */}
      <path
        d="M 68 53 L 66 67 C 66 71 75 72 75 67"
        stroke="#1e293b"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ================= DYNAMIC MOOD FEATURES ================= */}

      {/* 1. STRESSED / SLEEPY (Default on Tab 1: heavy drooping lids, eye bags, flat mouth) */}
      {mood === 'stressed' && (
        <g id="mood-stressed">
          {/* Weary eyebrows */}
          <path d="M 47 47 Q 56 46 62 48" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 78 48 Q 84 46 93 47" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />

          {/* Left Eye */}
          <circle cx="55" cy="56" r="6.5" fill="#ffffff" stroke="#1e293b" strokeWidth="2.6" />
          <circle cx="55" cy="57" r="2.4" fill="#1e293b" />
          {/* Drooping lid */}
          <path d="M 48 53 Q 55 58 62 53" fill="#fcd5b5" stroke="#1e293b" strokeWidth="2.4" />
          {/* Eye bag */}
          <path d="M 49 64 Q 55 67 61 64" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />

          {/* Right Eye */}
          <circle cx="85" cy="56" r="6.5" fill="#ffffff" stroke="#1e293b" strokeWidth="2.6" />
          <circle cx="85" cy="57" r="2.4" fill="#1e293b" />
          {/* Drooping lid */}
          <path d="M 78 53 Q 85 58 92 53" fill="#fcd5b5" stroke="#1e293b" strokeWidth="2.4" />
          {/* Eye bag */}
          <path d="M 79 64 Q 85 67 91 64" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />

          {/* Mouth (Deadpan straight/weary line) */}
          <path
            d="M 57 84 Q 68 83 78 84 L 79 86"
            stroke="#1e293b"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Chin crease */}
          <path d="M 66 93 Q 70 94 74 93" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}

      {/* 2. THINKING / INVESTIGATING */}
      {mood === 'thinking' && (
        <g id="mood-thinking">
          {/* Skeptical raised eyebrow */}
          <path d="M 46 43 Q 54 39 63 44" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 77 49 Q 85 49 93 46" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />

          {/* Left Eye (Wide) */}
          <circle cx="55" cy="54" r="7" fill="#ffffff" stroke="#1e293b" strokeWidth="2.6" />
          <circle cx="57" cy="54" r="2.5" fill="#1e293b" />
          <path d="M 50 63 Q 55 65 60 63" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />

          {/* Right Eye (Squint) */}
          <path
            d="M 77 56 Q 85 52 93 56 Q 85 60 77 56 Z"
            fill="#ffffff"
            stroke="#1e293b"
            strokeWidth="2.6"
            strokeLinejoin="round"
          />
          <circle cx="85" cy="56" r="2.2" fill="#1e293b" />
          <path d="M 79 63 Q 85 65 91 63" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />

          {/* Mouth (Pursed thinking grimace) */}
          <path
            d="M 59 84 Q 66 82 76 81"
            stroke="#1e293b"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* 3. EARNESTLY SATISFIED / PLEASED (Full smile, wide happy Bob Belcher eyes!) */}
      {mood === 'satisfied' && (
        <g id="mood-satisfied">
          {/* Eyebrows (Arched high with genuine joy) */}
          <path d="M 46 39 Q 54 33 63 38" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
          <path d="M 77 38 Q 86 33 94 39" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />

          {/* Left Eye (Wide, round, soft) */}
          <circle cx="55" cy="53" r="8" fill="#ffffff" stroke="#1e293b" strokeWidth="2.8" />
          <circle cx="56" cy="53" r="3.2" fill="#1e293b" />
          <circle cx="54.5" cy="51.5" r="1.1" fill="#ffffff" />
          <path d="M 49 63 Q 55 66 61 63" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />

          {/* Right Eye (Wide, round, soft) */}
          <circle cx="85" cy="53" r="8" fill="#ffffff" stroke="#1e293b" strokeWidth="2.8" />
          <circle cx="86" cy="53" r="3.2" fill="#1e293b" />
          <circle cx="84.5" cy="51.5" r="1.1" fill="#ffffff" />
          <path d="M 79 63 Q 85 66 91 63" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />

          {/* Full, Earnest Open Smile (The classic genuine Bob Belcher delighted grin!) */}
          <path
            d="M 54 77 Q 70 77 86 77 C 86 93 78 96 70 96 C 62 96 54 93 54 77 Z"
            fill="#881337"
            stroke="#1e293b"
            strokeWidth="3.2"
            strokeLinejoin="round"
          />

          {/* Clean top teeth row */}
          <path
            d="M 55 77 L 85 77 C 84 81 78 82 70 82 C 62 82 56 81 55 77 Z"
            fill="#ffffff"
            stroke="#1e293b"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Happy tongue in bottom of mouth */}
          <path
            d="M 62 96 C 63 90 70 88 74 91 C 77 93 77 96 70 96 Z"
            fill="#fb7185"
          />

          {/* Cheek smile creases at corners */}
          <path d="M 51 74 Q 53 78 52 82" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M 89 74 Q 87 78 88 82" stroke="#1e293b" strokeWidth="2.4" strokeLinecap="round" />

          {/* Chin smile line */}
          <path d="M 65 101 Q 70 103 75 101" stroke="#1e293b" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
};
