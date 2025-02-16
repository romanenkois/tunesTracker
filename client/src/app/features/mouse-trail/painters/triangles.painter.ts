import { trianglesConfig } from '../config/trail.config';
import { TrailingTriangle } from '../types/types';

export function drawTriangle(
  triangle: TrailingTriangle,
  ctx: CanvasRenderingContext2D
) {
  // const opacity = triangle.color.opacity;
  if (triangle.age > trianglesConfig.ageToChangeOpasity) {
    triangle.color.opacity = 1 - ((1 / trianglesConfig.maxAge) * triangle.age);
  }

  console.log(triangle.color.opacity);

  const _color = `hsla(${triangle.color.hue}, ${triangle.color.saturation}%, ${triangle.color.lightness}%, ${triangle.color.opacity})`;

  ctx.save();
  ctx.translate(triangle.x, triangle.y);
  ctx.rotate(triangle.rotation);

  ctx.beginPath();
  ctx.moveTo(0, -triangle.size / 2);
  ctx.lineTo(-triangle.size / 2, triangle.size / 2);
  ctx.lineTo(triangle.size / 2, triangle.size / 2);
  ctx.closePath();

  ctx.fillStyle = _color;
  ctx.fill();
  ctx.restore();
}
