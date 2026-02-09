import React from 'react';

export default function CircularProgress({ progress = 75, count = 280 }) {
  const radius = 15;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '36px', height: '36px' }}>
      <svg width="36" height="36">
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="2.5"
        />
        <circle
          cx="18"
          cy="18"
          r={radius}
          fill="none"
          stroke={progress > 100 ?  "#F31260" : "#1d9bf0"}
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 18 18)"
        />
      </svg>
      <span style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '10px',
        fontWeight: '600',
        color: '#fff'
      }}>
        {/* {count} */}
      </span>
    </div>
  );
}