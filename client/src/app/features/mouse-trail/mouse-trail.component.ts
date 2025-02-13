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

  private points: { x: number; y: number; age: number }[] = [];
  private animationFrameId: number = 0;
  private lastX: number = 0;
  private lastY: number = 0;

  private readonly maxPoints: number = 50;

  private readonly minDistance: number = 20;
  private readonly maxDistance: number = 400;

  private readonly lineWidth: number = 4;
  private readonly opasity: number = 0.8;
  private readonly color: string = '100, 140, 256,';

  private readonly maxAge: number = 50;
  private readonly ageToFade: number = 100;
  private readonly ageToChangeOpasity: number = 20;

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

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    this.ctx.scale(dpr, dpr);

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    this.points = [];
  }

  private addPoint(x: number, y: number) {
    if (!this.isInitialized) return;

    const distance = Math.hypot(x - this.lastX, y - this.lastY);
    if (distance > this.minDistance && distance < this.maxDistance) {
      this.points.push({ x, y, age: 0 });
      if (this.points.length > this.maxPoints) {
        this.points.shift();
      }
      this.lastX = x;
      this.lastY = y;
    }
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
    this.points = [];
  }

  private animate() {
    if (!this.isInitialized) return;

    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(
      0,
      0,
      canvas.width / (window.devicePixelRatio || 1),
      canvas.height / (window.devicePixelRatio || 1)
    );

    this.ctx.beginPath();
    this.points.forEach((point, index) => {
      point.age++;

      if (point.age > this.maxAge) {
        this.points.splice(index, 1);
        return;
      }

      const opacity =
        point.age > this.ageToChangeOpasity
          ? this.opasity - point.age / this.maxAge
          : this.opasity;

      if (index > 0) {
        const prevPoint = this.points[index - 1];
        const gradient = this.ctx.createLinearGradient(
          prevPoint.x,
          prevPoint.y,
          point.x,
          point.y
        );
        const startOpacity =
          point.age > this.ageToFade ? this.opasity - point.age : opacity;
        const endOpacity =
          point.age > this.ageToFade ? this.opasity - point.age - 1 : opacity;

        gradient.addColorStop(0, `rgba(${this.color} ${startOpacity})`);
        gradient.addColorStop(1, `rgba(${this.color} ${endOpacity})`);

        this.ctx.beginPath();
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth =
          point.age > this.ageToFade
            ? this.lineWidth * opacity
            : this.lineWidth;
        this.ctx.moveTo(prevPoint.x, prevPoint.y);
        this.ctx.lineTo(point.x, point.y);
        this.ctx.stroke();
      }
    });

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}
