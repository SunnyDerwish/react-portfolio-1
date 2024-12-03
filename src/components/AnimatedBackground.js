import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  class Circle {
    constructor(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.alpha = Math.random() * 0.2 + 0.05; // More subtle opacity range
      
      // Use CSS variables directly from root
      const colors = [
        'var(--primary-color)',
        'var(--secondary-color)',
        'var(--text-color-2)',
        'var(--text-color-3)',
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      
      // Get computed color value from CSS variable
      const computedColor = getComputedStyle(document.documentElement)
        .getPropertyValue(this.color.slice(4, -1))
        .trim();
      
      // Convert the computed color to rgba
      let color = computedColor;
      if (color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        color = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
      } else if (color.startsWith('rgb(')) {
        color = color.replace('rgb', 'rgba').replace(')', `, ${this.alpha})`);
      }
      
      ctx.fillStyle = color;
      ctx.fill();
    }

    update(width, height) {
      // Slower movement
      if (this.x + this.radius > width || this.x - this.radius < 0) {
        this.dx = -this.dx * 0.95; // Add slight dampening
      }
      if (this.y + this.radius > height || this.y - this.radius < 0) {
        this.dy = -this.dy * 0.95; // Add slight dampening
      }

      this.x += this.dx * 0.5; // Slower movement
      this.y += this.dy * 0.5; // Slower movement
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let circles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initCircles();
    };

    const initCircles = () => {
      circles = [];
      // Reduced number of circles and increased size variation
      for (let i = 0; i < 30; i++) {
        const radius = Math.random() * 30 + 10; // Larger circles
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5); // Slower initial velocity
        const dy = (Math.random() - 0.5); // Slower initial velocity
        circles.push(new Circle(x, y, dx, dy, radius));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      circles.forEach(circle => {
        circle.update(canvas.width, canvas.height);
        circle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          initCircles(); // Reinitialize circles with new theme colors
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full"
      style={{ 
        zIndex: -1,
        opacity: 0.6  // Reduced overall opacity for better subtlety
      }}
    />
  );
};

export default AnimatedBackground;