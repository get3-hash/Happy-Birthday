import React from 'react';

interface RealisticBalloonProps {
  cx: number;
  cy: number;
  r: number;
  colorBase: string;
  colorHighlight: string;
  colorShadow: string;
  colorSpecular?: string;
  tilt?: number; // degrees
  stringLength?: number;
  stringCurve?: number;
  stringColor?: string;
  opacity?: number;
  idSuffix: string;
  className?: string;
  animated?: boolean;
  animationClass?: string;
}

export const RealisticBalloon: React.FC<RealisticBalloonProps> = ({
  cx,
  cy,
  r,
  colorBase,
  colorHighlight,
  colorShadow,
  colorSpecular = '#ffffff',
  tilt = 0,
  stringLength = 140,
  stringCurve = 25,
  stringColor,
  opacity = 1,
  idSuffix,
  className = '',
  animationClass = '',
}) => {
  const gradId = `b-grad-${idSuffix}`;
  const specId = `b-spec-${idSuffix}`;
  const rimId = `b-rim-${idSuffix}`;
  const shadowId = `b-shd-${idSuffix}`;
  const ry = r * 1.22; // natural oval balloon proportion

  const defaultStringColor = stringColor || colorHighlight;

  return (
    <g
      className={`${animationClass} ${className}`}
      style={{
        transformOrigin: `${cx}px ${cy + ry}px`,
        opacity,
        willChange: 'transform',
      }}
    >
      <defs>
        {/* Hardware-accelerated soft drop shadow without blur filter */}
        <radialGradient id={shadowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="65%" stopColor="#000000" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        {/* Spherical Base 3D Radial Gradient */}
        <radialGradient
          id={gradId}
          cx="38%"
          cy="32%"
          r="68%"
          fx="32%"
          fy="26%"
        >
          <stop offset="0%" stopColor={colorHighlight} stopOpacity="1" />
          <stop offset="45%" stopColor={colorBase} stopOpacity="1" />
          <stop offset="85%" stopColor={colorShadow} stopOpacity="1" />
          <stop offset="100%" stopColor="#050505" stopOpacity="0.85" />
        </radialGradient>

        {/* Primary Specular Softbox Key Light Highlight */}
        <radialGradient
          id={specId}
          cx="32%"
          cy="26%"
          r="35%"
          fx="30%"
          fy="24%"
        >
          <stop offset="0%" stopColor={colorSpecular} stopOpacity="0.9" />
          <stop offset="35%" stopColor={colorSpecular} stopOpacity="0.5" />
          <stop offset="70%" stopColor={colorHighlight} stopOpacity="0.15" />
          <stop offset="100%" stopColor={colorBase} stopOpacity="0" />
        </radialGradient>

        {/* Opposite Rim Light Bounce */}
        <radialGradient
          id={rimId}
          cx="75%"
          cy="75%"
          r="40%"
          fx="78%"
          fy="78%"
        >
          <stop offset="0%" stopColor={colorHighlight} stopOpacity="0.45" />
          <stop offset="60%" stopColor={colorBase} stopOpacity="0.1" />
          <stop offset="100%" stopColor={colorShadow} stopOpacity="0" />
        </radialGradient>
      </defs>

      <g transform={`rotate(${tilt}, ${cx}, ${cy + ry})`}>
        {/* Soft Drop Shadow using smooth radial gradient (Instant GPU calculation, NO lag) */}
        <ellipse
          cx={cx + 8}
          cy={cy + 12}
          rx={r * 1.15}
          ry={ry * 1.15}
          fill={`url(#${shadowId})`}
        />

        {/* Draped Curled Ribbon String */}
        <path
          d={`M ${cx} ${cy + ry + 4} 
              C ${cx + stringCurve} ${cy + ry + stringLength * 0.3}, 
                ${cx - stringCurve * 1.2} ${cy + ry + stringLength * 0.65}, 
                ${cx + stringCurve * 0.8} ${cy + ry + stringLength}`}
          fill="none"
          stroke={defaultStringColor}
          strokeWidth="1.25"
          strokeOpacity="0.65"
          strokeLinecap="round"
        />

        {/* Balloon Knot/Neck at bottom */}
        <path
          d={`M ${cx - 5} ${cy + ry - 1} 
              L ${cx - 7} ${cy + ry + 6} 
              Q ${cx} ${cy + ry + 8} ${cx + 7} ${cy + ry + 6} 
              L ${cx + 5} ${cy + ry - 1} Z`}
          fill={colorShadow}
        />
        <ellipse
          cx={cx}
          cy={cy + ry + 5}
          rx={4}
          ry={1.8}
          fill={colorHighlight}
          opacity={0.7}
        />

        {/* Main 3D Spherical Balloon Body */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={r}
          ry={ry}
          fill={`url(#${gradId})`}
        />

        {/* Subtle Inner Ambient Glow Layer */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={r * 0.97}
          ry={ry * 0.97}
          fill="none"
          stroke={colorHighlight}
          strokeWidth="1"
          strokeOpacity="0.25"
        />

        {/* Rim Light */}
        <ellipse
          cx={cx}
          cy={cy}
          rx={r}
          ry={ry}
          fill={`url(#${rimId})`}
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Primary Specular Curved Highlight */}
        <path
          d={`M ${cx - r * 0.52} ${cy - ry * 0.42} 
              C ${cx - r * 0.42} ${cy - ry * 0.65}, 
                ${cx - r * 0.15} ${cy - ry * 0.72}, 
                ${cx + r * 0.18} ${cy - ry * 0.62} 
              C ${cx - r * 0.05} ${cy - ry * 0.55}, 
                ${cx - r * 0.35} ${cy - ry * 0.48}, 
                ${cx - r * 0.52} ${cy - ry * 0.42} Z`}
          fill={`url(#${specId})`}
          style={{ mixBlendMode: 'screen' }}
        />

        {/* Secondary Glint Specular Dot */}
        <ellipse
          cx={cx - r * 0.32}
          cy={cy - ry * 0.48}
          rx={r * 0.14}
          ry={ry * 0.09}
          fill="#ffffff"
          opacity={0.88}
          transform={`rotate(-25, ${cx - r * 0.32}, ${cy - ry * 0.48})`}
          style={{ mixBlendMode: 'screen' }}
        />
      </g>
    </g>
  );
};
