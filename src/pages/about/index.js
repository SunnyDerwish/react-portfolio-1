import React, { useRef, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import {
  dataabout,
  meta,
  worktimeline,
  skills,
  services,
} from "../../content_option";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  class Circle {
    constructor(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx * 0.15; // Slow movement like contact page
      this.dy = dy * 0.15;
      this.radius = radius;
      this.alpha = Math.random() * 0.2 + 0.1;
      this.colorType = Math.random() < 0.5 ? 'primary' : 'secondary';
    }

    draw(ctx) {
      const root = document.documentElement;
      const style = getComputedStyle(root);
      let color = this.colorType === 'primary' 
        ? style.getPropertyValue('--primary-color').trim()
        : style.getPropertyValue('--secondary-color').trim();

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
      const numberOfCircles = Math.floor((canvas.width * canvas.height) / 25000);
      
      for (let i = 0; i < numberOfCircles; i++) {
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

    setCanvasSize();
    initCircles();
    animate();

    const handleResize = () => {
      setCanvasSize();
      initCircles();
    };

    const observer = new MutationObserver(() => {
      initCircles();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    window.addEventListener('resize', handleResize);

    // Monitor content changes that might affect page height
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
    <div className="fixed inset-0 w-full" style={{ 
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

export const About = () => {
  return (
    <HelmetProvider>
      <AnimatedBackground />
      <Container className="About-header relative z-10">
        <Helmet>
          <meta charSet="utf-8" />
          <title> About | {meta.title} </title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="section mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">About me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="section mb-5">
          <Col lg="5">
            <h3 className="color_sec py-4">{dataabout.title}</h3>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <div>
              <p>{dataabout.aboutme}</p>
            </div>
          </Col>
        </Row>
        <Row className="section mb-5">
          <Col lg="5">
            <h3 className="color_sec py-4">Work Timeline</h3>
          </Col>
          <Col lg="7">
            <table className="table caption-top">
              <tbody>
                {worktimeline.map((data, i) => (
                  <tr key={i}>
                    <th scope="row">{data.jobtitle}</th>
                    <td>{data.where}</td>
                    <td>{data.city}</td>
                    <td>{data.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="section mb-5">
          <Col lg="5">
            <h3 className="color_sec py-4">Skills</h3>
          </Col>
          <Col lg="7">
            <div className="skills-grid">
              {skills.map((data, i) => (
                <div key={i} className="skill-item">
                  <h4 className="skill-title">{data.name}</h4>
                  <div className="progress">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${data.value}%` }}
                    ></div>
                    <div className="progress-value">{data.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row className="section mb-5">
          <Col lg="5">
            <h3 className="color_sec py-4">Services</h3>
          </Col>
          <Col lg="7">
            {services.map((data, i) => (
              <div className="service_ py-4" key={i}>
                <h5 className="service__title">{data.title}</h5>
                <p className="service_desc">{data.description}</p>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </HelmetProvider>
  );
};

export default About;