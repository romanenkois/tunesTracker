import {
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

interface PalleteHSLA {
  hue: number;
  saturation: number;
  lightness: number;
  opasity: number;
}
interface TrailPoint {
  x: number;
  y: number;
  age: number;
}
interface TrailingTriangle {
  x: number;
  y: number;
  rotation: number;
  size: number;
  color: PalleteHSLA;
  age: number;
}

@Component({
  selector: 'app-mouse-trail',
  standalone: true,
  imports: [],
  templateUrl: 'mouse-trail.component.html',
  styleUrl: 'mouse-trail.component.scss',
})
export class MouseTrailComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('container', { static: true }) containerRef!: ElementRef;
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ngZone: NgZone = inject(NgZone);
  private resizeObserver!: ResizeObserver;
  private ctx!: CanvasRenderingContext2D;

  private isInitialized = false;
  private isTouching = false;

  private animationFrameId: number = 0;
  private lastTimeStamp: number = Date.now();

  private trailPoints: TrailPoint[] = [];
  private lastX: number = 0;
  private lastY: number = 0;

  private trianglePoints: TrailingTriangle[] = [];

  private readonly trailConfig = {
    maxPoints: 200,
    minDistance: 10,
    maxDistance: 400,

    minTimeInBetween: 5,

    lineWidth: 3,
    opasity: 0.5,
    color: '100, 140, 256',

    maxAge: 15,
    ageToFade: 10,
    ageToChangeOpasity: 10,
  };

  private readonly trianglesConfig = {
    maxTriangles: 10,
    minDistance: 10,
    maxDistance: 400,
    minTimeInBetween: 6,
    lineWidth: 3,
    opasity: 0.5,
    color: {
      hue: 220,
      saturation: 45,
      lightness: 41,
    },
    maxAge: 15,
    ageToFade: 10,
    ageToChangeOpasity: 0,
  };

  constructor() {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.isInitialized) {
        this.resizeCanvas();
      }
    });
  }

  ngOnInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    // Add global event listeners since the container is pointer-events: none
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('touchstart', this.onTouchStart.bind(this));
    document.addEventListener('touchmove', this.onTouchMove.bind(this));
    document.addEventListener('touchend', this.onTouchEnd.bind(this));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.resizeCanvas();
      this.isInitialized = true;
      this.resizeObserver.observe(this.containerRef.nativeElement);

      this.ngZone.runOutsideAngular(() => {
        this.animate();
      });
    });
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationFrameId);
    this.resizeObserver.disconnect();

    // Remove global event listeners
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('touchstart', this.onTouchStart.bind(this));
    document.removeEventListener('touchmove', this.onTouchMove.bind(this));
    document.removeEventListener('touchend', this.onTouchEnd.bind(this));
  }

  onMouseMove(event: MouseEvent) {
    if (this.isTouching) return;

    // Using clientX/Y directly since we're now fixed positioned
    this.addPoint(event.clientX, event.clientY);
  }

  onTouchStart(event: TouchEvent) {
    this.isTouching = true;
    const touch = event.touches[0];
    this.lastX = touch.clientX;
    this.lastY = touch.clientY;
  }

  onTouchMove(event: TouchEvent) {
    if (!this.isTouching) return;

    const touch = event.touches[0];
    this.addPoint(touch.clientX, touch.clientY);
  }

  onTouchEnd() {
    this.isTouching = false;
    this.trailPoints = [];
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    this.trailPoints = [];
  }

  private addPoint(x: number, y: number) {
    if (!this.isInitialized) return;

    const distance = Math.hypot(x - this.lastX, y - this.lastY);
    if (
      (distance > this.trailConfig.minDistance &&
        distance < this.trailConfig.maxDistance) ||
      Date.now() - this.lastTimeStamp > this.trailConfig.minTimeInBetween
    ) {
      this.trailPoints.push({ x, y, age: 0 });
      if (this.trailPoints.length > this.trailConfig.maxPoints) {
        this.trailPoints.shift();
      }
      this.lastX = x;
      this.lastY = y;
    }

    if (
      this.trailPoints.length > 2 &&
      (this.animationFrameId % 5 === 0 || this.animationFrameId % 12 === 0)
    ) {
      this.trianglePoints.push({
        x:
          x +
          (Math.random() > 0.5
            ? Math.random() * 20 + 5
            : Math.random() * -20 - 5),
        y:
          y +
          (Math.random() > 0.5
            ? Math.random() * 20 + 5
            : Math.random() * -20 - 5),
        rotation: Math.random() * Math.PI * 2,
        size: Math.random() * 5 + 10,
        color: {
          hue: this.trianglesConfig.color.hue,
          saturation: this.trianglesConfig.color.saturation + Math.random() * 40 - 20,
          lightness: this.trianglesConfig.color.lightness + Math.random() * 80 - 30,
          opasity: this.trianglesConfig.opasity,
        },
        age: 0,
      });

      if (this.trianglePoints.length > this.trianglesConfig.maxTriangles) {
        this.trianglePoints.shift();
      }
    }
  }

  private drawLineTrail(
    point: { x: number; y: number; age: number },
    index: number
  ): void {
    const opacity = this.trailConfig.opasity;

    if (index > 0) {
      const prevPoint = this.trailPoints[index - 1];
      const gradient = this.ctx.createLinearGradient(
        prevPoint.x,
        prevPoint.y,
        point.x,
        point.y
      );

      const startOpacity =
        point.age > this.trailConfig.ageToFade
          ? this.trailConfig.opasity - point.age
          : opacity;

      const endOpacity =
        point.age > this.trailConfig.ageToFade
          ? this.trailConfig.opasity - point.age - 1
          : opacity;

      gradient.addColorStop(
        0,
        `rgba(${this.trailConfig.color}, ${startOpacity})`
      );
      gradient.addColorStop(
        1,
        `rgba(${this.trailConfig.color}, ${endOpacity})`
      );

      this.ctx.beginPath();
      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth =
        point.age > this.trailConfig.ageToFade
          ? this.trailConfig.lineWidth * point.age
          : this.trailConfig.lineWidth;
      this.ctx.moveTo(prevPoint.x, prevPoint.y);
      this.ctx.lineTo(point.x, point.y);
      this.ctx.stroke();
    }
  }

  private drawTriangle(
    ctx: CanvasRenderingContext2D,
    triangle: TrailingTriangle
  ) {
    const _color = `hsla(${triangle.color.hue}, ${triangle.color.saturation}%, ${triangle.color.lightness}%, ${triangle.color.opasity})`;

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

  private animate() {
    if (!this.isInitialized) return;
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.lastTimeStamp = Date.now();

    this.trailPoints.forEach((point, index) => {
      point.age++;
      if (point.age > this.trailConfig.maxAge) {
        this.trailPoints.splice(index, 1);
        return;
      }

      this.drawLineTrail(point, index);
    });

    this.trianglePoints.forEach((triangle: TrailingTriangle, index) => {
      triangle.age++;
      if (triangle.age > this.trianglesConfig.maxAge) {
        this.trianglePoints.splice(index, 1);
        return;
      }

      this.drawTriangle(this.ctx, triangle);
    });

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}
