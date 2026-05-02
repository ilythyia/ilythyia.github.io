import { useRef, useEffect } from 'react';

interface Flower {
  t: number;
  offset: number;
  size: number;
  color: string;
  rotation: number;
  swayOffset: number;
  swaySpeed: number;
}

export default function HeartCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number = window.innerWidth;
    let height: number = window.innerHeight;
    let animationId: number;

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const isMobile = width < 768;
    const petalCount = isMobile ? 50 : 80;
    const heartRadius = Math.min(width, height) * (isMobile ? 0.35 : 0.3);
    const windSpeed = 0.002;
    const colors = ['#E8A0BF', '#FADADD', '#F4C2C2', '#FFFFFF', '#DDA0BC'];

    function getHeartPoint(t: number, radius: number) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return {
        x: width / 2 + (x * radius) / 17,
        y: height / 2 + (y * radius) / 17,
      };
    }

    const flowers: Flower[] = [];
    for (let i = 0; i < petalCount; i++) {
      const t = (i / petalCount) * Math.PI * 2;
      const offset = (Math.random() - 0.5) * 60;
      flowers.push({
        t,
        offset,
        size: 8 + Math.random() * 22,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        swayOffset: Math.random() * 100,
        swaySpeed: 0.5 + Math.random() * 0.5,
      });
    }

    // Add inner fill flowers for density
    for (let i = 0; i < petalCount * 0.6; i++) {
      const t = (i / (petalCount * 0.6)) * Math.PI * 2;
      const offset = (Math.random() - 0.5) * 30;
      flowers.push({
        t,
        offset,
        size: 5 + Math.random() * 14,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        swayOffset: Math.random() * 100 + 50,
        swaySpeed: 0.3 + Math.random() * 0.4,
      });
    }

    function drawFlower(flower: Flower, time: number) {
      const pos = getHeartPoint(flower.t, heartRadius);
      const sway = Math.sin(time * windSpeed * flower.swaySpeed + flower.swayOffset) * 10;
      const scatterX = Math.cos(flower.t * 3) * (flower.offset * 0.5);
      const scatterY = Math.sin(flower.t * 3) * (flower.offset * 0.5);
      const finalX = pos.x + scatterX + sway;
      const finalY = pos.y + scatterY;

      ctx!.save();
      ctx!.translate(finalX, finalY);
      ctx!.rotate(flower.rotation + Math.sin(time * 0.001) * 0.2);

      const gradient = ctx!.createRadialGradient(0, 0, 0, 0, 0, flower.size);
      gradient.addColorStop(0, flower.color);
      gradient.addColorStop(0.7, flower.color + '80');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx!.fillStyle = gradient;
      ctx!.beginPath();
      ctx!.ellipse(0, 0, flower.size / 2.5, flower.size, 0, 0, Math.PI * 2);
      ctx!.fill();

      // Second petal for depth
      ctx!.rotate(Math.PI / 3);
      ctx!.beginPath();
      ctx!.ellipse(0, 0, flower.size / 3, flower.size * 0.8, 0, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.restore();
    }

    function animate(time: number) {
      ctx!.clearRect(0, 0, width, height);

      // Soft center glow
      const centerGlow = ctx!.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, heartRadius * 1.5
      );
      centerGlow.addColorStop(0, 'rgba(255, 245, 238, 0.5)');
      centerGlow.addColorStop(0.5, 'rgba(255, 245, 238, 0.2)');
      centerGlow.addColorStop(1, 'rgba(255, 245, 238, 0)');
      ctx!.fillStyle = centerGlow;
      ctx!.fillRect(0, 0, width, height);

      // Draw inner flowers first
      for (let i = flowers.length - 1; i >= 0; i--) {
        drawFlower(flowers[i], time);
      }

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
