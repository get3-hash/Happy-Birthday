import { ThemeConfig, AspectRatio, FontChoice } from '../types';

export interface RenderOptions {
  theme: ThemeConfig;
  aspectRatio: AspectRatio;
  fontChoice: FontChoice;
  customName?: string;
  customWish?: string;
  scale?: number; // scale multiplier e.g. 2 for 2x crisp HD
}

export function getDimensions(aspectRatio: AspectRatio, baseWidth: number = 1080): { width: number; height: number } {
  switch (aspectRatio) {
    case '1:1':
      return { width: baseWidth, height: baseWidth };
    case '9:16':
      return { width: baseWidth, height: Math.round((baseWidth * 16) / 9) };
    case '16:9':
      return { width: Math.round((baseWidth * 16) / 9), height: baseWidth };
    case '4:5':
      return { width: baseWidth, height: Math.round((baseWidth * 5) / 4) };
    default:
      return { width: baseWidth, height: baseWidth };
  }
}

export async function renderCelebrationToCanvas(
  options: RenderOptions
): Promise<HTMLCanvasElement> {
  const { theme, aspectRatio, fontChoice, customName, customWish, scale = 2 } = options;
  const { width: baseW, height: baseH } = getDimensions(aspectRatio, 1080);
  const width = baseW * scale;
  const height = baseH * scale;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2d context');

  // 1. Draw Background
  if (theme.id === 'ivory') {
    const bgGrad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.25,
      0,
      width * 0.5,
      height * 0.5,
      width * 0.8
    );
    bgGrad.addColorStop(0, '#fafaf9');
    bgGrad.addColorStop(0.6, '#f5f5f4');
    bgGrad.addColorStop(1, '#e7e5e4');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);
  } else {
    const bgGrad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.35,
      width * 0.05,
      width * 0.5,
      height * 0.5,
      width * 0.85
    );
    if (theme.id === 'gold') {
      bgGrad.addColorStop(0, '#1c1917');
      bgGrad.addColorStop(0.55, '#0c0a09');
      bgGrad.addColorStop(1, '#000000');
    } else if (theme.id === 'rose') {
      bgGrad.addColorStop(0, '#241017');
      bgGrad.addColorStop(0.6, '#11070a');
      bgGrad.addColorStop(1, '#050204');
    } else if (theme.id === 'sapphire') {
      bgGrad.addColorStop(0, '#0a2342');
      bgGrad.addColorStop(0.6, '#050e1d');
      bgGrad.addColorStop(1, '#01040a');
    } else if (theme.id === 'emerald') {
      bgGrad.addColorStop(0, '#073324');
      bgGrad.addColorStop(0.6, '#02140d');
      bgGrad.addColorStop(1, '#010604');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);
  }

  // 2. Ambient Lighting & Center Glow
  const centerGlow = ctx.createRadialGradient(
    width * 0.5,
    height * 0.5,
    0,
    width * 0.5,
    height * 0.5,
    width * 0.45
  );
  if (theme.id === 'gold') {
    centerGlow.addColorStop(0, 'rgba(234, 179, 8, 0.22)');
    centerGlow.addColorStop(0.5, 'rgba(202, 138, 4, 0.06)');
    centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else if (theme.id === 'rose') {
    centerGlow.addColorStop(0, 'rgba(251, 113, 133, 0.22)');
    centerGlow.addColorStop(0.5, 'rgba(225, 29, 72, 0.05)');
    centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else if (theme.id === 'sapphire') {
    centerGlow.addColorStop(0, 'rgba(56, 189, 248, 0.22)');
    centerGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.05)');
    centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else if (theme.id === 'emerald') {
    centerGlow.addColorStop(0, 'rgba(52, 211, 153, 0.2)');
    centerGlow.addColorStop(0.5, 'rgba(16, 185, 129, 0.05)');
    centerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  } else {
    centerGlow.addColorStop(0, 'rgba(234, 179, 8, 0.25)');
    centerGlow.addColorStop(0.6, 'rgba(245, 158, 11, 0.05)');
    centerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
  }
  ctx.fillStyle = centerGlow;
  ctx.fillRect(0, 0, width, height);

  // Overhead soft spotlight
  const spotGrad = ctx.createRadialGradient(
    width * 0.5,
    0,
    0,
    width * 0.5,
    0,
    height * 0.65
  );
  spotGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
  spotGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = spotGrad;
  ctx.fillRect(0, 0, width, height);

  // 3. Draw Bokeh & Stars
  const drawStar = (x: number, y: number, r: number, color: string, opacity: number) => {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.quadraticCurveTo(x, y, x, y + r);
    ctx.quadraticCurveTo(x, y, x - r, y);
    ctx.quadraticCurveTo(x, y, x, y - r);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  const drawConfettiFlake = (
    x: number,
    y: number,
    w: number,
    h: number,
    angle: number,
    color: string
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.fillStyle = color;
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.restore();
  };

  // Confetti particles
  const confettiList = [
    { x: width * 0.22, y: height * 0.2, w: 16 * scale, h: 22 * scale, a: 28, c: theme.confettiColors[0] },
    { x: width * 0.78, y: height * 0.21, w: 20 * scale, h: 14 * scale, a: -34, c: theme.confettiColors[1] },
    { x: width * 0.18, y: height * 0.72, w: 18 * scale, h: 18 * scale, a: 45, c: theme.confettiColors[2] || '#fef08a' },
    { x: width * 0.82, y: height * 0.71, w: 15 * scale, h: 24 * scale, a: -18, c: '#fef08a' },
    { x: width * 0.33, y: height * 0.15, w: 14 * scale, h: 14 * scale, a: 15, c: '#ffffff' },
    { x: width * 0.67, y: height * 0.16, w: 16 * scale, h: 16 * scale, a: -22, c: theme.confettiColors[3] || theme.confettiColors[0] },
  ];
  confettiList.forEach((c) => drawConfettiFlake(c.x, c.y, c.w, c.h, c.a, c.c));

  // Stars
  drawStar(width * 0.26, height * 0.28, 14 * scale, '#fef08a', 0.85);
  drawStar(width * 0.74, height * 0.29, 15 * scale, '#ffffff', 0.9);
  drawStar(width * 0.22, height * 0.58, 11 * scale, '#fef08a', 0.75);
  drawStar(width * 0.78, height * 0.57, 12 * scale, '#ffffff', 0.75);
  drawStar(width * 0.5, height * 0.18, 13 * scale, '#fef08a', 0.85);

  // 4. Draw Satin Ribbons
  ctx.save();
  ctx.lineWidth = 10 * scale;
  ctx.lineCap = 'round';
  const leftRibbonGrad = ctx.createLinearGradient(0, height * 0.1, width * 0.15, height * 0.8);
  leftRibbonGrad.addColorStop(0, '#fef08a');
  leftRibbonGrad.addColorStop(0.5, theme.confettiColors[0]);
  leftRibbonGrad.addColorStop(1, '#a16207');
  ctx.strokeStyle = leftRibbonGrad;
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 12 * scale;
  ctx.beginPath();
  ctx.moveTo(-width * 0.02, height * 0.15);
  ctx.bezierCurveTo(
    width * 0.1, height * 0.18,
    width * 0.14, height * 0.32,
    width * 0.08, height * 0.44
  );
  ctx.bezierCurveTo(
    width * 0.03, height * 0.54,
    width * 0.12, height * 0.65,
    width * 0.09, height * 0.78
  );
  ctx.stroke();

  // Right ribbon
  const rightRibbonGrad = ctx.createLinearGradient(width, height * 0.1, width * 0.85, height * 0.8);
  rightRibbonGrad.addColorStop(0, theme.confettiColors[1]);
  rightRibbonGrad.addColorStop(0.5, '#fef08a');
  rightRibbonGrad.addColorStop(1, '#713f12');
  ctx.strokeStyle = rightRibbonGrad;
  ctx.beginPath();
  ctx.moveTo(width * 1.02, height * 0.14);
  ctx.bezierCurveTo(
    width * 0.9, height * 0.19,
    width * 0.86, height * 0.32,
    width * 0.91, height * 0.45
  );
  ctx.bezierCurveTo(
    width * 0.96, height * 0.56,
    width * 0.87, height * 0.68,
    width * 0.92, height * 0.82
  );
  ctx.stroke();
  ctx.restore();

  // 5. Draw 3D Realistic Balloons
  const draw3DBalloon = (
    cx: number,
    cy: number,
    r: number,
    colorBase: string,
    colorHighlight: string,
    colorShadow: string,
    tilt: number,
    opacity: number = 1
  ) => {
    ctx.save();
    ctx.globalAlpha = opacity;
    const ry = r * 1.22;

    ctx.translate(cx, cy + ry);
    ctx.rotate((tilt * Math.PI) / 180);
    ctx.translate(-cx, -(cy + ry));

    // Drop shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 24 * scale;
    ctx.shadowOffsetX = 8 * scale;
    ctx.shadowOffsetY = 12 * scale;

    // Balloon string
    ctx.strokeStyle = colorHighlight;
    ctx.lineWidth = 2 * scale;
    ctx.globalAlpha = 0.65;
    ctx.beginPath();
    ctx.moveTo(cx, cy + ry + 6 * scale);
    ctx.bezierCurveTo(
      cx + 25 * scale, cy + ry + 80 * scale,
      cx - 20 * scale, cy + ry + 160 * scale,
      cx + 15 * scale, cy + ry + 240 * scale
    );
    ctx.stroke();
    ctx.globalAlpha = opacity;

    // Knot
    ctx.fillStyle = colorShadow;
    ctx.beginPath();
    ctx.moveTo(cx - 7 * scale, cy + ry);
    ctx.lineTo(cx - 9 * scale, cy + ry + 8 * scale);
    ctx.lineTo(cx + 9 * scale, cy + ry + 8 * scale);
    ctx.lineTo(cx + 7 * scale, cy + ry);
    ctx.closePath();
    ctx.fill();

    // Spherical base gradient
    const bGrad = ctx.createRadialGradient(
      cx - r * 0.24,
      cy - ry * 0.35,
      r * 0.05,
      cx,
      cy,
      r * 1.15
    );
    bGrad.addColorStop(0, colorHighlight);
    bGrad.addColorStop(0.42, colorBase);
    bGrad.addColorStop(0.85, colorShadow);
    bGrad.addColorStop(1, '#0a0a0a');

    ctx.fillStyle = bGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Rim highlight
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const rimGrad = ctx.createRadialGradient(
      cx + r * 0.5,
      cy + ry * 0.5,
      r * 0.1,
      cx + r * 0.5,
      cy + ry * 0.5,
      r * 0.8
    );
    rimGrad.addColorStop(0, colorHighlight);
    rimGrad.addColorStop(0.5, 'transparent');
    ctx.fillStyle = rimGrad;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, ry, 0, 0, Math.PI * 2);
    ctx.fill();

    // Curved Specular Softbox Key Reflection
    const specGrad = ctx.createRadialGradient(
      cx - r * 0.34,
      cy - ry * 0.44,
      0,
      cx - r * 0.34,
      cy - ry * 0.44,
      r * 0.4
    );
    specGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    specGrad.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)');
    specGrad.addColorStop(0.8, colorHighlight);
    specGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = specGrad;
    ctx.beginPath();
    ctx.ellipse(
      cx - r * 0.32,
      cy - ry * 0.46,
      r * 0.28,
      ry * 0.16,
      -Math.PI / 6,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Crisp Specular Glint Dot
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(
      cx - r * 0.34,
      cy - ry * 0.48,
      r * 0.1,
      ry * 0.06,
      -Math.PI / 6,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.restore();

    ctx.restore();
  };

  const { primary, secondary, accent } = theme.balloonColors;

  // Left balloons
  draw3DBalloon(width * 0.1, height * 0.35, 75 * scale, primary.shadow, primary.base, '#050505', -12, 0.88);
  draw3DBalloon(width * 0.16, height * 0.44, 85 * scale, accent.base, accent.highlight, accent.shadow, 6, 0.96);
  draw3DBalloon(width * 0.11, height * 0.56, 100 * scale, primary.base, primary.highlight, primary.shadow, -7, 1);
  draw3DBalloon(width * 0.17, height * 0.69, 75 * scale, secondary.base, secondary.highlight, secondary.shadow, 14, 0.92);

  // Right balloons
  draw3DBalloon(width * 0.9, height * 0.34, 76 * scale, secondary.shadow, secondary.base, '#050505', 11, 0.88);
  draw3DBalloon(width * 0.84, height * 0.44, 90 * scale, primary.base, primary.highlight, primary.shadow, -8, 0.98);
  draw3DBalloon(width * 0.89, height * 0.56, 102 * scale, accent.base, accent.highlight, accent.shadow, 8, 1);
  draw3DBalloon(width * 0.83, height * 0.7, 78 * scale, secondary.base, secondary.highlight, secondary.shadow, -12, 0.94);

  // 6. Large Elegant Typography "HAPPY BIRTHDAY"
  await document.fonts.ready;

  let fontFamily = "'Cinzel', serif";
  if (fontChoice === 'montserrat') fontFamily = "'Montserrat', sans-serif";
  if (fontChoice === 'playfair') fontFamily = "'Playfair Display', serif";
  if (fontChoice === 'cormorant') fontFamily = "'Cormorant Garamond', Georgia, serif";

  const isWide = aspectRatio === '16:9';
  const isTall = aspectRatio === '9:16' || aspectRatio === '4:5';

  const happySize = Math.round(width * (isWide ? 0.085 : isTall ? 0.095 : 0.092));
  const birthdaySize = Math.round(width * (isWide ? 0.105 : isTall ? 0.118 : 0.114));

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Text Y anchors
  const centerY = height * (customName ? 0.44 : 0.48);
  const happyY = centerY - birthdaySize * 0.62;
  const birthdayY = centerY + birthdaySize * 0.52;

  // Render Metallic Text Function with Multi-pass drop shadows and gradients
  const renderMetallicWord = (word: string, yPos: number, fontSize: number, letterSpacing: number) => {
    ctx.save();
    ctx.font = `800 ${fontSize}px ${fontFamily}`;
    ctx.letterSpacing = `${letterSpacing * scale}px`;

    // 1. Deep 3D Shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 32 * scale;
    ctx.shadowOffsetY = 16 * scale;
    ctx.fillStyle = '#0a0a0a';
    ctx.fillText(word, width / 2, yPos);

    // 2. Ambient Colored Rim Glow
    ctx.shadowColor = theme.id === 'gold' ? 'rgba(234, 179, 8, 0.55)'
                    : theme.id === 'rose' ? 'rgba(251, 113, 133, 0.55)'
                    : theme.id === 'sapphire' ? 'rgba(56, 189, 248, 0.55)'
                    : theme.id === 'emerald' ? 'rgba(52, 211, 153, 0.55)'
                    : 'rgba(202, 138, 4, 0.45)';
    ctx.shadowBlur = 18 * scale;
    ctx.shadowOffsetY = 4 * scale;

    // 3. Luxurious Linear Foil Gradient Fill
    const textGrad = ctx.createLinearGradient(0, yPos - fontSize * 0.5, 0, yPos + fontSize * 0.5);
    if (theme.id === 'gold' || theme.id === 'ivory') {
      textGrad.addColorStop(0, '#fffbeb');
      textGrad.addColorStop(0.25, '#fef08a');
      textGrad.addColorStop(0.48, '#eab308');
      textGrad.addColorStop(0.65, '#ca8a04');
      textGrad.addColorStop(0.85, '#fde047');
      textGrad.addColorStop(1, '#854d0e');
    } else if (theme.id === 'rose') {
      textGrad.addColorStop(0, '#fff1f2');
      textGrad.addColorStop(0.25, '#fecdd3');
      textGrad.addColorStop(0.5, '#fb7185');
      textGrad.addColorStop(0.65, '#e11d48');
      textGrad.addColorStop(0.85, '#fda4af');
      textGrad.addColorStop(1, '#9f1239');
    } else if (theme.id === 'sapphire') {
      textGrad.addColorStop(0, '#ffffff');
      textGrad.addColorStop(0.25, '#f1f5f9');
      textGrad.addColorStop(0.5, '#cbd5e1');
      textGrad.addColorStop(0.65, '#94a3b8');
      textGrad.addColorStop(0.85, '#f8fafc');
      textGrad.addColorStop(1, '#475569');
    } else if (theme.id === 'emerald') {
      textGrad.addColorStop(0, '#fef9c3');
      textGrad.addColorStop(0.25, '#facc15');
      textGrad.addColorStop(0.5, '#ca8a04');
      textGrad.addColorStop(0.65, '#a16207');
      textGrad.addColorStop(0.85, '#fef08a');
      textGrad.addColorStop(1, '#713f12');
    }

    ctx.fillStyle = textGrad;
    ctx.fillText(word, width / 2, yPos);

    // 4. Delicate Top Rim Hairline Highlight
    ctx.save();
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1 * scale;
    ctx.globalAlpha = 0.35;
    ctx.strokeText(word, width / 2, yPos);
    ctx.restore();

    ctx.restore();
  };

  // Draw "HAPPY" and "BIRTHDAY"
  renderMetallicWord('HAPPY', happyY, happySize, isWide ? 10 : 8);
  renderMetallicWord('BIRTHDAY', birthdayY, birthdaySize, isWide ? 7 : 5);

  // 7. Elegant Decorative Dividing Flourish or Hairlines
  ctx.save();
  const ruleY = birthdayY + birthdaySize * 0.58;
  const ruleWidth = width * 0.36;
  const lineGrad = ctx.createLinearGradient(width / 2 - ruleWidth / 2, ruleY, width / 2 + ruleWidth / 2, ruleY);
  lineGrad.addColorStop(0, 'transparent');
  lineGrad.addColorStop(0.5, theme.subtextColor);
  lineGrad.addColorStop(1, 'transparent');

  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 1.5 * scale;
  ctx.beginPath();
  ctx.moveTo(width / 2 - ruleWidth / 2, ruleY);
  ctx.lineTo(width / 2 + ruleWidth / 2, ruleY);
  ctx.stroke();

  // Center diamond on hairline
  ctx.fillStyle = theme.subtextColor;
  ctx.beginPath();
  ctx.moveTo(width / 2, ruleY - 4 * scale);
  ctx.lineTo(width / 2 + 5 * scale, ruleY);
  ctx.lineTo(width / 2, ruleY + 4 * scale);
  ctx.lineTo(width / 2 - 5 * scale, ruleY);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // 8. Recipient Name or Custom Wish (Grand & Prominent)
  if (customName && customName.trim()) {
    // "DEAR" prefix
    const dearY = ruleY + birthdaySize * 0.22;
    ctx.save();
    ctx.font = `600 ${Math.round(birthdaySize * 0.18)}px 'Montserrat', sans-serif`;
    ctx.letterSpacing = `${5 * scale}px`;
    ctx.fillStyle = theme.subtextColor;
    ctx.globalAlpha = 0.85;
    ctx.fillText('DEAR', width / 2, dearY);
    ctx.restore();

    // Large Majestic Recipient Name
    const nameY = dearY + birthdaySize * 0.38;
    const nameFontSize = Math.round(birthdaySize * 0.48);
    renderMetallicWord(customName.trim().toUpperCase(), nameY, nameFontSize, isWide ? 6 : 4);
  }

  if (customWish && customWish.trim()) {
    const wishY = (customName && customName.trim())
      ? ruleY + birthdaySize * 0.92
      : ruleY + birthdaySize * 0.32;
    ctx.save();
    ctx.font = `italic 500 ${Math.round(birthdaySize * 0.22)}px 'Cormorant Garamond', Georgia, serif`;
    ctx.fillStyle = theme.id === 'ivory' ? '#57534e' : 'rgba(255, 255, 255, 0.82)';
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 6 * scale;
    ctx.fillText(customWish.trim(), width / 2, wishY);
    ctx.restore();
  }
  ctx.restore();

  return canvas;
}
