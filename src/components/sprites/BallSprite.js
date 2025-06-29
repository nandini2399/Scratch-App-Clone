import React from "react"

export default function BallSprite() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width="60"
      height="60"
    >
      <defs>
        <radialGradient id="ballOrange" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>

        <radialGradient id="gloss" cx="30%" cy="30%" r="35%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle
        cx="60"
        cy="60"
        r="55"
        fill="url(#ballOrange)"
        stroke="black"
        strokeWidth="3"
      />

      <path d="M60,5 V115 M5,60 H115" stroke="black" strokeWidth="3" />

      <path
        d="M25,25 A60,60 0 0,1 95,95"
        stroke="black"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M95,25 A60,60 0 0,0 25,95"
        stroke="black"
        strokeWidth="3"
        fill="none"
      />

      <circle cx="40" cy="40" r="25" fill="url(#gloss)" />
    </svg>
  );
}