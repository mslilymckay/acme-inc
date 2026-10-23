import React from 'react';

export type LiamMood = 'stressed' | 'thinking' | 'satisfied';

interface LiamIllustrationProps {
  mood?: LiamMood;
  className?: string;
  size?: number | string;
}

export const LiamIllustration: React.FC<LiamIllustrationProps> = ({
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
      aria-label={`Liam from Product - Mood: ${mood}`}
    >
      {/* HAIR (Tousled wavy brown tech-PM hair) */}
      <path
        d="M 32 64 C 24 40 30 18 56 14 C 74 11 96 14 108 28 C 118 42 116 62 110 70 C 106 50 102 24 82 20 C 64 16 44 26 32 64 Z"
        fill="#292524"
        stroke="#1e293b"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      {/* Front hair tufts */}
      <path
        d="M 44 28 C 50 20 62 18 72 22 M 70 20 C 80 18 92 24 96 32"
        stroke="#1e293b"
        strokeWidth="2.8"
        strokeLinecap="round"
      />

      {/* BODY / HOODIE (Charcoal grey tech hoodie over teal t-shirt) */}
      <g id="body">
        {/* Torso */}
        <path
          d="M 26 140 C 24 120 34 104 50 100 L 90 100 C 106 104 116 120 114 140 Z"
          fill="#334155"
          stroke="#1e293b"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Inner T-shirt (teal) */}
        <path
          d="M 58 100 L 70 120 L 82 100 Z"
          fill="#0d9488"
          stroke="#1e293b"
          strokeWidth="2.4"
        />

        {/* Hoodie drawstring left & right */}
        <path
          d="M 52 106 C 52 118 54 126 52 134"
          stroke="#94a3b8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 88 106 C 88 118 86 126 88 134"
          stroke="#94a3b8"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* EARS */}
      {/* Left Ear */}
      <path
        d="M 38 68 C 30 68 30 80 39 84 C 40 84 41 80 40 76"
        fill="#fcd34d"
        stroke="#1e293b"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right Ear */}
      <path
        d="M 102 68 C 110 68 110 80 101 84 C 100 84 99 80 100 76"
        fill="#fcd34d"
        stroke="#1e293b"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* HEAD BASE (Slightly squarer jaw for Liam) */}
      <path
        d="M 40 52 C 40 32 50 24 70 24 C 90 24 100 32 100 52 C 100 78 98 98 70 98 C 42 98 40 78 40 52 Z"
        fill="#fef08a"
        stroke="#1e293b"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />

      {/* NOSE */}
      <path
        d="M 68 56 L 66 68 L 74 68"
        fill="none"
        stroke="#1e293b"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* PM GLASSES (Thick dark rectangular hipster frames) */}
      <g id="glasses">
        {/* Left lens frame */}
        <rect
          x="44"
          y="48"
          width="22"
          height="16"
          rx="3"
          fill="#ffffff"
          fillOpacity="0.4"
          stroke="#1e293b"
          strokeWidth="3.2"
        />
        {/* Right lens frame */}
        <rect
          x="74"
          y="48"
          width="22"
          height="16"
          rx="3"
          fill="#ffffff"
          fillOpacity="0.4"
          stroke="#1e293b"
          strokeWidth="3.2"
        />
        {/* Bridge */}
        <line x1="66" y1="55" x2="74" y2="55" stroke="#1e293b" strokeWidth="3.2" strokeLinecap="round" />
        {/* Left temple */}
        <line x1="44" y1="54" x2="38" y2="56" stroke="#1e293b" strokeWidth="2.6" strokeLinecap="round" />
        {/* Right temple */}
        <line x1="96" y1="54" x2="102" y2="56" stroke="#1e293b" strokeWidth="2.6" strokeLinecap="round" />
      </g>

      {/* EYES & EYEBROWS (Based on Mood) */}
      {mood === 'satisfied' ? (
        /* Satisfied: Earnest wide open eyes, happy curved eyebrows */
        <g id="satisfied-face">
          {/* Eyebrows (high, happy arches) */}
          <path d="M 46 42 Q 55 36 64 42" fill="none" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 76 42 Q 85 36 94 42" fill="none" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />

          {/* Left pupil */}
          <circle cx="55" cy="56" r="3.2" fill="#1e293b" />
          <circle cx="54" cy="55" r="1.2" fill="#ffffff" />

          {/* Right pupil */}
          <circle cx="85" cy="56" r="3.2" fill="#1e293b" />
          <circle cx="84" cy="55" r="1.2" fill="#ffffff" />

          {/* Happy smile with open mouth */}
          <path
            d="M 58 76 C 58 86 82 86 82 76 Z"
            fill="#dc2626"
            stroke="#1e293b"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Teeth top */}
          <path d="M 60 76 Q 70 79 80 76" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />

          {/* Little rosy cheeks */}
          <circle cx="46" cy="68" r="4" fill="#f87171" fillOpacity="0.4" />
          <circle cx="94" cy="68" r="4" fill="#f87171" fillOpacity="0.4" />
        </g>
      ) : (
        /* Stressed: Weary, asymmetrical furrowed eyebrows, drooping eyelids */
        <g id="stressed-face">
          {/* Slanted furrowed eyebrows */}
          <path d="M 46 44 L 64 41" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M 76 41 L 94 45" stroke="#1e293b" strokeWidth="2.8" strokeLinecap="round" />

          {/* Left eye: Drooping eyelid */}
          <circle cx="55" cy="56" r="2.8" fill="#1e293b" />
          <path d="M 47 53 Q 55 58 63 53" fill="#fef08a" stroke="#1e293b" strokeWidth="1.8" />

          {/* Right eye: Drooping eyelid */}
          <circle cx="85" cy="56" r="2.8" fill="#1e293b" />
          <path d="M 77 53 Q 85 58 93 53" fill="#fef08a" stroke="#1e293b" strokeWidth="1.8" />

          {/* Asymmetrical stressed wavy mouth */}
          <path
            d="M 58 80 Q 64 76 70 80 Q 76 83 82 78"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Sweat drop near left temple */}
          <path
            d="M 37 45 C 35 48 35 52 38 52 C 41 52 41 48 37 45 Z"
            fill="#67e8f9"
            stroke="#1e293b"
            strokeWidth="1.2"
          />
        </g>
      )}
    </svg>
  );
};
