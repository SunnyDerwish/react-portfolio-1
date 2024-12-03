import React, { useEffect, useRef } from 'react';
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  class Circle {
    constructor(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx * 0.15;
      this.dy = dy * 0.15;
      this.radius = radius;
      this.alpha = Math.random() * 0.2 + 0.1;
      this.colorType = Math.random() < 0.5 ? 'primary' : 'secondary';
    }

    draw(ctx) {
      const root = document.documentElement;
      const style = getComputedStyle(root);
      let color;
      
      if (this.colorType === 'primary') {
        color = style.getPropertyValue('--primary-color').trim();
      } else {
        color = style.getPropertyValue('--secondary-color').trim();
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      
      if (color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
      } else if (color.startsWith('rgb')) {
        ctx.fillStyle = color.replace('rgb', 'rgba').replace(')', `, ${this.alpha})`);
      } else {
        ctx.fillStyle = `${color}${this.alpha})`;
      }
      
      ctx.fill();
    }

    update(width, height) {
      if (this.x + this.radius > width || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > height || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let circles = [];

    // Set canvas size to match window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Force a style width/height to ensure full coverage
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
    };

    const initCircles = () => {
      circles = [];
      for (let i = 0; i < 75; i++) {
        const radius = Math.random() * 25 + 8;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * 2;
        const dy = (Math.random() - 0.5) * 2;
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

    // Initial setup
    setCanvasSize();
    initCircles();
    animate();

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
      initCircles();
    };

    window.addEventListener('resize', handleResize);

    // Add theme change observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          initCircles();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ 
      zIndex: -1,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100vw',
          height: '100vh'
        }}
      />
    </div>
  );
};

export const Home = () => {
  return (
    <HelmetProvider>
      <AnimatedBackground />
      <section id="home" className="home relative min-h-screen">
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center min-h-screen">
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center">
              <div className="intro mx-auto">
                <h2 className="mb-1x">{introdata.title}</h2>
                <h1 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{
                      strings: [
                        introdata.animated.first,
                        introdata.animated.second,
                        introdata.animated.third,
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                <p className="mb-1x">{introdata.description}</p>
                <div className="intro_btn-action pb-5">
                  <Link to="/portfolio" className="text_2">
                    <div id="button_p" className="ac_btn btn">
                      My Portfolio
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/contact">
                    <div id="button_h" className="ac_btn btn">
                      Contact Me
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/about">
                    <div id="button_a" className="ac_btn btn">
                      About Me
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};

export default Home;