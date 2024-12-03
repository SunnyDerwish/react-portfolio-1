import React, { useEffect, useRef } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, meta } from "../../content_option";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  class Circle {
    constructor(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.alpha = Math.random() * 0.3 + 0.1;
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

    const setCanvasSize = () => {
      const body = document.body;
      const html = document.documentElement;
      const height = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      
      canvas.width = window.innerWidth;
      canvas.height = height;
      canvas.style.width = '100%';
      canvas.style.height = `${height}px`;
    };

    const initCircles = () => {
      circles = [];
      const numberOfCircles = Math.floor((canvas.width * canvas.height) / 20000); // Adjust circle density
      
      for (let i = 0; i < numberOfCircles; i++) {
        const radius = Math.random() * 30 + 10;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * 1;
        const dy = (Math.random() - 0.5) * 1;
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

    setCanvasSize();
    initCircles();
    animate();

    const handleResize = () => {
      setCanvasSize();
      initCircles();
    };

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

    window.addEventListener('resize', handleResize);
    // Handle content changes that might affect page height
    const contentObserver = new MutationObserver(handleResize);
    contentObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      contentObserver.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full overflow-hidden" style={{ 
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
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export const Portfolio = () => {
  return (
    <HelmetProvider>
      <AnimatedBackground />
      <Container className="relative z-10">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Portfolio | {meta.title} </title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4"> Portfolio </h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <div className="po_items_ho">
          {dataportfolio.map((data, i) => (
            <div key={i} className="po_item">
              <img src={data.img} alt={data.title} />
              <div className="portfolio-title">{data.title}</div>
              <div className="content">
                <p>{data.description}</p>
                <a href={data.link}>view project</a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </HelmetProvider>
  );
};