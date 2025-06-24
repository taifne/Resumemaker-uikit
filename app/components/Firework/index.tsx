"use client";

import React, { useEffect, useRef } from 'react';

const Fireworks = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);
  const fireworks = useRef<any[]>([]);
  const hue = useRef(Math.random() * 360);
  const limiterTotal = 50;
  const limiterTick = 0;
  
  class Particle {
    x: number;
    y: number;
    coordLast: [number, number];
    coordRand: [number, number];
    angle: number;
    speed: number;
    radius: number;
    life: number;
    decay: number;
    hue: number;
    brightness: number;
    
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
      this.coordLast = [x, y];
      this.coordRand = [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10];
      this.angle = Math.random() * Math.PI * 2;
      this.speed = Math.random() * 5 + 1;
      this.radius = Math.random() * 2 + 1;
      this.life = 100;
      this.decay = Math.random() * 0.5 + 0.005;
      this.hue = Math.random() * (hue.current + 20 - (hue.current - 20)) + (hue.current - 20);
      this.brightness = Math.random() * 50 + 50;
    }

    update() {
      this.coordLast[0] = this.x;
      this.coordLast[1] = this.y;
      
      this.speed *= 0.95;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + 2;
      this.angle += this.coordRand[0] * 0.003;
      
      this.life -= this.decay * 15;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.lineWidth = this.radius;
      ctx.strokeStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
      ctx.moveTo(this.coordLast[0], this.coordLast[1]);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
    }
  }

  class Firework {
    x: number;
    y: number;
    sx: number;
    sy: number;
    tx: number;
    ty: number;
    distance: number;
    speed: number;
    angle: number;
    acceleration: number;
    hue: number;
    brightness: number;
    particles: Particle[];
    
    constructor(sx: number, sy: number, tx: number, ty: number) {
      this.x = sx;
      this.y = sy;
      this.sx = sx;
      this.sy = sy;
      this.tx = tx;
      this.ty = ty;
      this.distance = Math.hypot(tx - sx, ty - sy);
      this.speed = 2;
      this.angle = Math.atan2(ty - sy, tx - sx);
      this.acceleration = 1.05;
      this.hue = Math.random() * (hue.current + 20 - (hue.current - 20)) + (hue.current - 20);
      this.brightness = Math.random() * 50 + 50;
      this.particles = [];
    }

    update(index: number) {
      this.speed *= this.acceleration;
      const vx = Math.cos(this.angle) * this.speed;
      const vy = Math.sin(this.angle) * this.speed;
      
      this.x += vx;
      this.y += vy;
      
      if (Math.hypot(this.tx - this.x, this.ty - this.y) < 5) {
        this.explode();
        fireworks.current.splice(index, 1);
      }
    }

    explode() {
      for (let i = 0; i < 50; i++) {
        particles.current.push(new Particle(this.x, this.y));
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${this.hue}, 100%, ${this.brightness}%)`;
      ctx.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const loop = () => {
      requestAnimationFrame(loop);
      
      hue.current += 0.5;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.03 && fireworks.current.length < limiterTotal) {
        fireworks.current.push(new Firework(
          canvas.width / 2,
          canvas.height,
          Math.random() * canvas.width,
          Math.random() * canvas.height / 2
        ));
      }

      fireworks.current.forEach((firework, index) => {
        firework.update(index);
        firework.draw(ctx);
      });

      particles.current.forEach((particle, index) => {
        particle.update();
        particle.draw(ctx);
        if (particle.life <= 0) {
          particles.current.splice(index, 1);
        }
      });
    };

    loop();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999]"
      aria-hidden="true"
    />
  );
};

export default Fireworks;