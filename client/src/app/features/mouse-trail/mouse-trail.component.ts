import {
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit,
  InputSignal,
  input,
} from '@angular/core';
import { TrailingTriangle, TrailPoint } from './types/types';
import { trailConfig, trianglesConfig } from './config/trail.config';
import { drawLineTrail } from './painters/line.painter';
import { drawTriangle } from './painters/triangles.painter';

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

  private readonly moduleConfig = {
    customCursor: false,
    onClickCursor: false,

    showMouseTrail: false,
    showTriangles: false,
  }
  private readonly trailConfig = trailConfig;
  private readonly trianglesConfig = trianglesConfig;

  customCursor: InputSignal<'show' | false> = input<'show' | false>(false);
  showMouseTrail: InputSignal<Boolean> = input<Boolean>(false);
  showTriangles: InputSignal<Boolean> = input<Boolean>(false);

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

    if (this.customCursor() === 'show') {
      this.moduleConfig.customCursor = true;
    }
    if (this.showMouseTrail()) {
      this.moduleConfig.showMouseTrail = true;
    }
    if (this.showTriangles()) {
      this.moduleConfig.showTriangles = true;
    }

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
          saturation:
            this.trianglesConfig.color.saturation + Math.random() * 40 - 20,
          lightness:
            this.trianglesConfig.color.lightness + Math.random() * 80 - 30,
          opacity: this.trianglesConfig.opasity,
        },
        age: 0,
      });

      if (this.trianglePoints.length > this.trianglesConfig.maxTriangles) {
        this.trianglePoints.shift();
      }
    }
  }

  private animate() {
    if (!this.isInitialized) return;
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.lastTimeStamp = Date.now();

    if (this.moduleConfig.showMouseTrail) {
      this.trailPoints.forEach((point, index) => {
        point.age++;
        if (point.age > this.trailConfig.maxAge) {
          // console.log('removed point');
          this.trailPoints.splice(index, 1);
          return;
        }

        drawLineTrail(point, this.trailPoints, index, this.ctx);
      });
    }
    if (this.moduleConfig.showTriangles) {
      this.trianglePoints.forEach((triangle: TrailingTriangle, index) => {
        triangle.age++;
        if (triangle.age > this.trianglesConfig.maxAge) {
          // console.log('removed triangle');
          this.trianglePoints.splice(index, 1);
          return;
        }

        drawTriangle(triangle, this.ctx);
      });
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}
