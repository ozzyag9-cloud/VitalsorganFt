import React, { useEffect, useRef } from 'react';
import { CertificateTier } from '../types';
import { cn } from '../lib/utils';

interface RingMaterial {
  shadowOpacity: number;
  pcbDark: string;
  pcbMid: string;
  traceColor: string;
  traceColorV: string;
  backLum: (t2: number, edge: number) => string;
  frontLum: (t2: number, peak: number, rotAngle: number) => string;
  specColor: string;
  innerChrome: [number, number, number, number];
}

const MATERIALS: Record<CertificateTier, RingMaterial> = {
  [CertificateTier.Pulse]: {
    shadowOpacity: 0.8,
    pcbDark: 'rgba(5,12,15,0.99)',
    pcbMid: 'rgba(10,20,25,0.99)',
    traceColor: 'rgba(210,130,50,0.8)',
    traceColorV: 'rgba(210,130,50,0.5)',
    backLum: (t2, angle) => {
      const edge2 = Math.abs(Math.cos(angle));
      const rimL = edge2 * 0.3;
      const base2 = 30 + rimL * 110;
      return `rgba(${Math.round(base2 + 10)},${Math.round(base2)},${Math.round(base2)},0.99)`;
    },
    frontLum: (t2, peak, ra) => {
      if (peak < 0.05) { const v = 200 + Math.sin(ra * 4) * 45; return `rgba(${v},${v-15},${v-20},0.99)`; }
      if (peak < 0.25) { const v = Math.round(90 + (1 - peak / 0.25) * 130); return `rgba(${v},${v-5},${v-15},0.98)`; }
      const v = Math.round(25 + (1 - peak) * 45); return `rgba(${v+10},${v},${v},0.99)`;
    },
    specColor: 'rgba(255,240,230,0.45)',
    innerChrome: [120, 115, 110, 100],
  },
  [CertificateTier.Nexus]: {
    shadowOpacity: 0.75,
    pcbDark: 'rgba(4,8,20,0.99)',
    pcbMid: 'rgba(10,15,35,0.99)',
    traceColor: 'rgba(80,220,255,0.6)',
    traceColorV: 'rgba(80,220,255,0.4)',
    backLum: (t2, angle) => {
      const t3 = t2;
      const hue = (Math.sin(angle + t3) * 25 + 210) % 360;
      return `hsla(${hue}, 50%, ${Math.round(45 + Math.sin(t3 * Math.PI) * 45)}%, 0.98)`;
    },
    frontLum: (t2, peak, ra) => {
      if (peak < 0.04) return 'rgba(255,255,255,1)';
      if (peak < 0.25) { 
        const f = (1 - peak / 0.25); 
        const r = 200 + f * 55; const g = 220 + f * 35; const b = 255 + f * 0;
        return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},0.98)`; 
      }
      const v = Math.round(40 + Math.sin(t2 * Math.PI) * 95); 
      return `rgba(${v},${Math.round(v + 35)},${Math.round(v + 60)},0.98)`;
    },
    specColor: 'rgba(210,250,255,0.5)',
    innerChrome: [180, 200, 240, 130],
  },
  [CertificateTier.Sovereign]: {
    shadowOpacity: 0.9,
    pcbDark: 'rgba(2,2,6,1)',
    pcbMid: 'rgba(8,8,12,1)',
    traceColor: 'rgba(255,230,120,0.9)',
    traceColorV: 'rgba(255,230,120,0.6)',
    backLum: (t2, angle) => {
      const edge = Math.abs(Math.sin(angle));
      const val = 15 + edge * 35;
      return `rgba(${val},${val},${val+5},1)`; 
    },
    frontLum: (t2, peak, ra) => {
      if (peak < 0.03) { return 'rgba(255,255,200,1)'; } 
      if (peak < 0.15) { 
        const f = (1 - peak / 0.15); 
        return `rgba(${Math.round(30 + f * 225)},${Math.round(30 + f * 190)},${Math.round(30 + f * 50)},0.99)`; 
      }
      const v = Math.round(15 + (1 - peak) * 30); 
      return `rgba(${v},${v},${v+5},1)`;
    },
    specColor: 'rgba(255,240,150,0.7)',
    innerChrome: [255, 230, 100, 160],
  },
};

export const PhotorealisticRing = ({ tier, size = 300, className }: { tier: CertificateTier, size?: number, className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const material = MATERIALS[tier];

    const render = () => {
      rotRef.current += 0.012;
      const rotAngle = rotRef.current;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cosR = Math.abs(Math.cos(rotAngle));
      const sinR = Math.sin(rotAngle);
      const outerRX = (canvas.width * 0.5) * 0.72;
      const outerRY = outerRX * (1 / 3.2);
      const thick = outerRX * 0.28;

      ctx.save();
      ctx.translate(cx, cy);

      // Deep Ambient Occlusion Shadow
      const shd = ctx.createRadialGradient(0, 25, 4, 0, 25, outerRX + 35);
      shd.addColorStop(0, `rgba(0,0,0,${material.shadowOpacity})`);
      shd.addColorStop(0.3, `rgba(0,0,0,${material.shadowOpacity * 0.6})`);
      shd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = shd;
      ctx.beginPath(); 
      ctx.ellipse(0, 28, outerRX + 18, outerRY + 8, 0, 0, Math.PI * 2); 
      ctx.fill();

      // Back Arc (Occluded Side)
      ctx.save(); ctx.scale(1, outerRY / outerRX);
      for (let i = 0; i <= 90; i++) {
        const angle = (i / 90) * Math.PI;
        const t2 = i / 90;
        const lum = material.backLum(t2, angle);
        ctx.strokeStyle = lum; ctx.lineWidth = thick;
        ctx.beginPath(); ctx.arc(0, 0, outerRX, angle, angle + 0.04); ctx.stroke();
      }
      ctx.restore();

      // Hardware Interior (The "Smart" part)
      const innerRX = outerRX - thick + 4;
      const innerRY = outerRY - (thick * (outerRY / outerRX)) + 4;
      const pcbW = innerRX * 2 * (0.15 + cosR * 0.85);
      
      if (pcbW > 4) {
        ctx.save();
        ctx.beginPath(); ctx.ellipse(0, 0, innerRX, innerRY, 0, 0, Math.PI * 2); ctx.clip();
        
        const pg = ctx.createLinearGradient(-pcbW/2, -innerRY, pcbW/2, innerRY);
        pg.addColorStop(0, material.pcbDark); 
        pg.addColorStop(0.5, material.pcbMid); 
        pg.addColorStop(1, material.pcbDark);
        ctx.fillStyle = pg; ctx.fillRect(-pcbW/2, -innerRY, pcbW, innerRY * 2);
        
        // Copper/Gold Traces
        ctx.strokeStyle = material.traceColor; ctx.lineWidth = 1.0;
        [-0.6,-0.25,0.1,0.45].forEach(yf => {
          const yy = yf * innerRY * 0.8;
          ctx.beginPath(); ctx.moveTo(-pcbW/2+2, yy); ctx.lineTo(pcbW/2-2, yy); ctx.stroke();
        });
        
        // Data Spark Animation
        if (cosR > 0.3) {
          const sparkX = ((rotAngle * 50) % (pcbW * 0.8)) - (pcbW * 0.4);
          const sparkG = ctx.createRadialGradient(sparkX, 0, 0, sparkX, 0, 10);
          sparkG.addColorStop(0, tier === CertificateTier.Sovereign ? 'rgba(255,255,200,0.8)' : 'rgba(100,230,255,0.8)');
          sparkG.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = sparkG; ctx.fillRect(sparkX-10, -innerRY, 20, innerRY*2);
        }

        // Ceramic Sensor Hub
        const sx = pcbW * 0.18 * Math.sign(sinR || 1);
        ctx.fillStyle = 'rgba(240,240,250,0.98)';
        ctx.beginPath(); ctx.arc(sx, 4, 8.5 * cosR, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = tier === CertificateTier.Sovereign ? 'rgba(200,160,40,0.8)' : 'rgba(100,100,120,0.6)';
        ctx.beginPath(); ctx.arc(sx, 4, 6 * cosR, 0, Math.PI * 2); ctx.fill();
        
        // Dynamic Health Status LED
        if (cosR > 0.15) {
          const gx = -pcbW * 0.25;
          const pulse = 0.7 + Math.sin(rotAngle * 4) * 0.3;
          const gg = ctx.createRadialGradient(gx, -10, 0, gx, -10, 10);
          const color = tier === CertificateTier.Sovereign ? `80,180,255` : `60,240,100`;
          gg.addColorStop(0, `rgba(${color},${(cosR * pulse).toFixed(2)})`);
          gg.addColorStop(1, `rgba(${color},0)`);
          ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(gx, -10, 10, 0, Math.PI * 2); ctx.fill();
        }

        ctx.restore();
      }

      // Exterior Shell (Visible Surface)
      ctx.save(); ctx.scale(1, outerRY / outerRX);
      
      // Create noise pattern for 4K texture
      const textureCanvas = document.createElement('canvas');
      textureCanvas.width = 64; textureCanvas.height = 64;
      const tCtx = textureCanvas.getContext('2d');
      if (tCtx) {
        const tData = tCtx.createImageData(64, 64);
        for (let i = 0; i < tData.data.length; i += 4) {
          const v = Math.random() * 255;
          tData.data[i] = v; tData.data[i+1] = v; tData.data[i+2] = v; tData.data[i+3] = 40;
        }
        tCtx.putImageData(tData, 0, 0);
      }
      const pattern = ctx.createPattern(textureCanvas, 'repeat');

      for (let i = 0; i <= 100; i++) {
        const angle = Math.PI + (i / 100) * Math.PI;
        const t2 = i / 100;
        const peak = Math.abs(t2 - 0.5);
        const lumValue = material.frontLum(t2, peak, rotAngle);
        ctx.strokeStyle = lumValue; ctx.lineWidth = thick;
        ctx.beginPath(); ctx.arc(0, 0, outerRX, angle, angle + 0.035); ctx.stroke();
        
        // Apply 4K Texture Overlay
        if (pattern) {
          ctx.save();
          ctx.globalCompositeOperation = 'overlay';
          ctx.strokeStyle = pattern;
          ctx.stroke();
          ctx.restore();
        }
      }
      ctx.restore();

      // Sharp Mirror Specular Highlight
      ctx.save(); ctx.scale(1, outerRY / outerRX);
      const sa = Math.PI * 1.5 + Math.sin(rotAngle * 0.5) * 0.5;
      ctx.beginPath(); ctx.arc(0, 0, outerRX, sa - 0.1, sa + 0.1);
      ctx.strokeStyle = material.specColor; ctx.lineWidth = thick * 0.25; ctx.lineCap = 'round'; ctx.stroke();
      ctx.restore();

      // Internal Metallic Bevel (Precision Finish)
      ctx.save(); ctx.scale(1, outerRY / outerRX);
      for (let i = 0; i <= 240; i++) {
        const angle = (i / 240) * Math.PI * 2;
        const shimmer = 0.5 + Math.sin(angle * 3 + rotAngle * 2) * 0.5;
        const cr = Math.round(material.innerChrome[0] + shimmer * material.innerChrome[3]);
        const cg = Math.round(material.innerChrome[1] + shimmer * material.innerChrome[3]);
        const cb = Math.round(material.innerChrome[2] + shimmer * material.innerChrome[3]);
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.92)`; ctx.lineWidth = 4.5;
        ctx.beginPath(); ctx.arc(0, 0, outerRX - thick + 4, angle, angle + 0.03); ctx.stroke();
      }
      ctx.restore();

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [tier, size]);

  return (
    <canvas 
      ref={canvasRef} 
      width={size} 
      height={size * 0.8} 
      className={cn("drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]", className)}
    />
  );
};
