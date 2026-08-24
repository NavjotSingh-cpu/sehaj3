export function HeroMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 440" className={className} role="img" aria-label="Illustration of a phone showing a clear application status timeline">
      <defs>
        <clipPath id="phoneScreen">
          <rect x="152" y="70" width="196" height="300" rx="14" />
        </clipPath>
      </defs>

      {/* backdrop blob */}
      <ellipse cx="240" cy="230" rx="210" ry="190" fill="#FBEDD4" />

      {/* road */}
      <rect x="0" y="392" width="480" height="10" fill="#E2E4E2" />
      <rect x="20" y="396" width="26" height="4" rx="2" fill="#B9BDB9" />
      <rect x="66" y="396" width="26" height="4" rx="2" fill="#B9BDB9" />

      {/* minimal two-wheeler, grounding the illustration in the actual journey */}
      <g transform="translate(56,352)">
        <circle cx="10" cy="34" r="15" fill="none" stroke="#14213D" strokeWidth="4" />
        <circle cx="70" cy="34" r="15" fill="none" stroke="#14213D" strokeWidth="4" />
        <path d="M10 34 L34 10 L58 10 L70 34" fill="none" stroke="#14213D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 10 L44 34" fill="none" stroke="#14213D" strokeWidth="4" strokeLinecap="round" />
        <circle cx="34" cy="10" r="4" fill="#14213D" />
      </g>

      {/* phone frame */}
      <rect x="140" y="46" width="220" height="348" rx="28" fill="#14213D" />
      <rect x="152" y="70" width="196" height="300" rx="14" fill="#FFFFFF" />

      <g clipPath="url(#phoneScreen)">
        <rect x="152" y="70" width="196" height="300" fill="#FFFFFF" />
        <text x="172" y="100" fontFamily="ui-sans-serif, system-ui" fontSize="12" fontWeight="700" fill="#14213D">
          LL-2026-4471209
        </text>

        {/* three honest status rows */}
        <g>
          <circle cx="182" cy="140" r="11" fill="#E3F5EC" stroke="#1E8A5F" strokeWidth="2" />
          <path d="M177 140 L181 144 L188 135" fill="none" stroke="#1E8A5F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="204" y="134" width="120" height="6" rx="3" fill="#DDE1DD" />
          <rect x="204" y="144" width="80" height="5" rx="2.5" fill="#EAECEA" />
        </g>
        <line x1="182" y1="151" x2="182" y2="183" stroke="#E2E4E2" strokeWidth="2" />

        <g>
          <circle cx="182" cy="196" r="11" fill="#E3F5EC" stroke="#1E8A5F" strokeWidth="2" />
          <path d="M177 196 L181 200 L188 191" fill="none" stroke="#1E8A5F" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="204" y="190" width="130" height="6" rx="3" fill="#DDE1DD" />
          <rect x="204" y="200" width="70" height="5" rx="2.5" fill="#EAECEA" />
        </g>
        <line x1="182" y1="207" x2="182" y2="239" stroke="#E2E4E2" strokeWidth="2" />

        <g>
          <circle cx="182" cy="252" r="11" fill="#E8F0FA" stroke="#1D5FA3" strokeWidth="2" />
          <circle cx="182" cy="252" r="4" fill="#1D5FA3" />
          <rect x="204" y="246" width="110" height="6" rx="3" fill="#1D5FA3" opacity="0.85" />
          <rect x="204" y="256" width="90" height="5" rx="2.5" fill="#BFD6EC" />
        </g>

        <rect x="172" y="296" width="156" height="46" rx="10" fill="#E8F0FA" />
        <text x="184" y="317" fontFamily="ui-sans-serif, system-ui" fontSize="11" fontWeight="600" fill="#154779">
          Ask what&#39;s going on
        </text>
        <text x="184" y="332" fontFamily="ui-sans-serif, system-ui" fontSize="9.5" fill="#154779" opacity="0.7">
          Application Advocate
        </text>
      </g>

      {/* floating reconciled-payment chip */}
      <g transform="translate(300,60)">
        <rect x="0" y="0" width="112" height="40" rx="20" fill="#FFFFFF" stroke="#1E8A5F" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="9" fill="#E3F5EC" />
        <path d="M16 20 L19 23 L25 16" fill="none" stroke="#1E8A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="36" y="24" fontFamily="ui-sans-serif, system-ui" fontSize="12" fontWeight="700" fill="#1E8A5F">
          ₹350 matched
        </text>
      </g>
    </svg>
  );
}
