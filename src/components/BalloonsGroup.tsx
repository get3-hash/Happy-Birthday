import React from 'react';
import { ThemeConfig } from '../types';
import { RealisticBalloon } from './RealisticBalloon';

interface BalloonsGroupProps {
  theme: ThemeConfig;
  animated?: boolean;
}

export const BalloonsGroup = React.memo<BalloonsGroupProps>(({
  theme,
  animated = true,
}) => {
  const { primary, secondary, accent } = theme.balloonColors;

  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-20"
      aria-hidden="true"
    >
      {/* ================= LEFT FLANK BALLOON CLUSTER ================= */}
      {/* Background Depth Balloon (Soft Focus, smaller, deep) */}
      <RealisticBalloon
        idSuffix="l-bg"
        cx={85}
        cy={320}
        r={52}
        colorBase={primary.shadow}
        colorHighlight={primary.base}
        colorShadow="#050505"
        colorSpecular="#ffffff"
        tilt={-12}
        stringLength={280}
        stringCurve={18}
        opacity={0.82}
        animationClass={animated ? 'animate-float-3' : ''}
      />

      {/* Midground Left Balloon (Ivory / Accent Pearl) */}
      <RealisticBalloon
        idSuffix="l-mid"
        cx={140}
        cy={410}
        r={64}
        colorBase={accent.base}
        colorHighlight={accent.highlight}
        colorShadow={accent.shadow}
        colorSpecular="#ffffff"
        tilt={6}
        stringLength={260}
        stringCurve={-22}
        opacity={0.96}
        animationClass={animated ? 'animate-float-2' : ''}
      />

      {/* Foreground Left Hero Balloon (Rich Primary Metallic) */}
      <RealisticBalloon
        idSuffix="l-fg"
        cx={95}
        cy={520}
        r={76}
        colorBase={primary.base}
        colorHighlight={primary.highlight}
        colorShadow={primary.shadow}
        colorSpecular="#ffffff"
        tilt={-7}
        stringLength={280}
        stringCurve={25}
        opacity={1}
        animationClass={animated ? 'animate-float-1' : ''}
      />

      {/* Secondary Left Accent Balloon (Lower flank) */}
      <RealisticBalloon
        idSuffix="l-low"
        cx={155}
        cy={660}
        r={58}
        colorBase={secondary.base}
        colorHighlight={secondary.highlight}
        colorShadow={secondary.shadow}
        colorSpecular="#ffffff"
        tilt={14}
        stringLength={220}
        stringCurve={-15}
        opacity={0.92}
        animationClass={animated ? 'animate-float-2' : ''}
      />

      {/* ================= RIGHT FLANK BALLOON CLUSTER ================= */}
      {/* Background Depth Balloon (Soft focus right) */}
      <RealisticBalloon
        idSuffix="r-bg"
        cx={915}
        cy={310}
        r={54}
        colorBase={secondary.shadow}
        colorHighlight={secondary.base}
        colorShadow="#050505"
        colorSpecular="#ffffff"
        tilt={11}
        stringLength={290}
        stringCurve={-20}
        opacity={0.82}
        animationClass={animated ? 'animate-float-2' : ''}
      />

      {/* Midground Right Balloon (Primary Metallic) */}
      <RealisticBalloon
        idSuffix="r-mid"
        cx={860}
        cy={415}
        r={68}
        colorBase={primary.base}
        colorHighlight={primary.highlight}
        colorShadow={primary.shadow}
        colorSpecular="#ffffff"
        tilt={-8}
        stringLength={270}
        stringCurve={24}
        opacity={0.98}
        animationClass={animated ? 'animate-float-1' : ''}
      />

      {/* Foreground Right Hero Balloon (Pearl / Accent) */}
      <RealisticBalloon
        idSuffix="r-fg"
        cx={905}
        cy={525}
        r={78}
        colorBase={accent.base}
        colorHighlight={accent.highlight}
        colorShadow={accent.shadow}
        colorSpecular="#ffffff"
        tilt={8}
        stringLength={280}
        stringCurve={-26}
        opacity={1}
        animationClass={animated ? 'animate-float-3' : ''}
      />

      {/* Secondary Right Accent Balloon (Lower flank) */}
      <RealisticBalloon
        idSuffix="r-low"
        cx={845}
        cy={670}
        r={60}
        colorBase={secondary.base}
        colorHighlight={secondary.highlight}
        colorShadow={secondary.shadow}
        colorSpecular="#ffffff"
        tilt={-12}
        stringLength={210}
        stringCurve={16}
        opacity={0.94}
        animationClass={animated ? 'animate-float-1' : ''}
      />
    </svg>
  );
});
