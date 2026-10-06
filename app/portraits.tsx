// Retratos ilustrados provisórios — trocar por fotos reais quando houver.
export function Portrait({ variant }: { variant: 0 | 1 }) {
  const a = variant === 0;
  const skin = a ? '#e0a98a' : '#c98d6c';
  const skinShade = a ? '#cf9372' : '#b4785a';
  const hair = a ? '#2c1a15' : '#3a231b';
  const blazer = a ? '#9a4b35' : '#f1e4d8';
  const blazerLine = a ? '#7c3a29' : '#d6c2b2';
  return (
    <svg viewBox="0 0 300 400" role="img" aria-label={a ? 'Ilustração da advogada Helena' : 'Ilustração da advogada Marina'} preserveAspectRatio="xMidYMax slice">
      <circle cx="150" cy="170" r="118" fill="#ffffff" opacity=".16" />
      <circle cx="150" cy="170" r="84" fill="#ffffff" opacity=".12" />
      {/* cabelo atrás */}
      {a ? (
        <path d="M92 175C80 80 220 80 208 175c12 70 20 120 10 160H82c-10-40-2-90 10-160z" fill={hair} />
      ) : (
        <>
          <circle cx="150" cy="86" r="31" fill={hair} />
          <path d="M96 182C90 100 210 100 204 182c6 30 4 60-8 80H104c-12-20-14-50-8-80z" fill={hair} />
        </>
      )}
      {/* ombros / blazer */}
      <path d="M26 400c0-72 62-104 124-104s124 32 124 104z" fill={blazer} />
      <path d="M150 296l-34 104M150 296l34 104" stroke={blazerLine} strokeWidth="3" fill="none" />
      <path d="M118 300l32 62 32-62-32-10z" fill={a ? '#f6ece3' : '#9a4b35'} />
      {/* pescoço */}
      <path d="M130 238h40v62c-8 12-32 12-40 0z" fill={skinShade} />
      {/* rosto */}
      <ellipse cx="150" cy="184" rx="52" ry="62" fill={skin} />
      {/* franja */}
      {a ? (
        <path d="M97 180c-2-56 40-78 78-70 32 8 40 40 36 72-14-34-46-50-84-34-14 6-26 20-30 32z" fill={hair} />
      ) : (
        <path d="M98 176c4-50 38-62 56-60 30 2 50 24 48 60-16-24-40-36-62-30-18 4-34 16-42 30z" fill={hair} />
      )}
      {/* detalhes: brincos e colar */}
      <circle cx="99" cy="208" r="5" fill="#d9ad6a" />
      <circle cx="201" cy="208" r="5" fill="#d9ad6a" />
      {!a && <path d="M126 312c8 14 40 14 48 0" stroke="#d9ad6a" strokeWidth="3" fill="none" strokeLinecap="round" />}
      {/* boca discreta */}
      <path d="M137 220c8 7 18 7 26 0" stroke="#8a3f33" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Sprig({ className = '' }: { className?: string }) {
  return (
    <svg className={`sprig ${className}`} viewBox="0 0 120 220" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden>
      <path d="M60 215C58 150 66 90 60 8" />
      {[30, 62, 94, 126, 158].map((y, i) => (
        <g key={y}>
          <path d={`M${60 - (i % 2) * 2} ${y + 14}c-26-2-40-16-44-34 26 0 40 12 44 34z`} />
          <path d={`M${60} ${y}c24-2 38-16 42-34-26 0-38 12-42 34z`} />
        </g>
      ))}
    </svg>
  );
}
