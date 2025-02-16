import { trailConfig } from '../config/trail.config';

export function drawLineTrail(
  point: { x: number; y: number; age: number },
  trailPoints: { x: number; y: number }[],
  index: number,
  ctx: CanvasRenderingContext2D
): void {
  const opacity = trailConfig.opasity;

  if (index > 0) {
    const prevPoint = trailPoints[index - 1];
    const gradient = ctx.createLinearGradient(
      prevPoint.x,
      prevPoint.y,
      point.x,
      point.y
    );

    const startOpacity =
      point.age > trailConfig.ageToFade
        ? trailConfig.opasity - point.age
        : opacity;

    const endOpacity =
      point.age > trailConfig.ageToFade
        ? trailConfig.opasity - point.age - 1
        : opacity;

    gradient.addColorStop(0, `rgba(${trailConfig.color}, ${startOpacity})`);
    gradient.addColorStop(1, `rgba(${trailConfig.color}, ${endOpacity})`);

    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth =
      point.age > trailConfig.ageToFade
        ? trailConfig.lineWidth * point.age
        : trailConfig.lineWidth;
    ctx.moveTo(prevPoint.x, prevPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  }
}
