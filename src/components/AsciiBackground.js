import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect';
import { TrackballControls } from 'three/addons/controls/TrackballControls';

const AsciiBackground = () => {
  const asciiContainerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let camera, controls, scene, renderer, effect;
    let sphere, plane;
    const start = Date.now();

    if (!asciiContainerRef.current) return;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0, 0, 0);
    scene.background.alpha = 0; // Make background transparent

    // Camera setup - enhanced perspective
    camera = new THREE.PerspectiveCamera(
      75, // Increased FOV
      asciiContainerRef.current.clientWidth / asciiContainerRef.current.clientHeight,
      1,
      1000
    );
    camera.position.y = 180;
    camera.position.z = 450;
    camera.position.x = 250;

    // Enhanced lighting setup
    const pointLight1 = new THREE.PointLight(0xffffff, 5, 0, 0);
    pointLight1.position.set(500, 500, 500);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 2, 0, 0);
    pointLight2.position.set(-500, -500, -500);
    scene.add(pointLight2);

    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Enhanced objects
    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(180, 32, 16),
      new THREE.MeshPhongMaterial({ 
        flatShading: true,
        shininess: 100,
        specular: 0x444444
      })
    );
    sphere.position.x = 200;
    scene.add(sphere);

    plane = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 400),
      new THREE.MeshPhongMaterial({ 
        color: 0xe0e0e0, 
        transparent: true, 
        opacity: 0.7,
        shininess: 50
      })
    );
    plane.position.y = -150;
    plane.position.x = 200;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(
      asciiContainerRef.current.clientWidth,
      asciiContainerRef.current.clientHeight
    );

    // Enhanced ASCII Effect
    effect = new AsciiEffect(renderer, ' .:-+*=%@#', { 
      invert: true,
      resolution: 0.15
    });
    effect.setSize(
      asciiContainerRef.current.clientWidth,
      asciiContainerRef.current.clientHeight
    );
    effect.domElement.style.color = 'var(--primary-color)';
    effect.domElement.style.backgroundColor = 'transparent';
    effect.domElement.style.opacity = '0.75';
    effect.domElement.style.position = 'absolute';
    effect.domElement.style.pointerEvents = 'none';
    effect.domElement.style.transform = 'scale(0.85)';
    effect.domElement.style.transformOrigin = 'right center';
    effect.domElement.style.fontSize = '12px';

    asciiContainerRef.current.appendChild(effect.domElement);

    // Controls
    controls = new TrackballControls(camera, effect.domElement);
    controls.enabled = false; // Disable controls for background effect

    // Animated Background Setup
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

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let circles = [];

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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

    // Enhanced animation
    function animate() {
      const timer = Date.now() - start;
      
      sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 120;
      sphere.rotation.x = timer * 0.0004;
      sphere.rotation.z = timer * 0.0003;
      sphere.rotation.y = Math.sin(timer * 0.001) * 0.3;

      controls.update();
      effect.render(scene, camera);

      // Circle animation
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      circles.forEach(circle => {
        circle.update(canvas.width, canvas.height);
        circle.draw(ctx);
      });

      requestAnimationFrame(animate);
    }

    // Initial setup
    setCanvasSize();
    initCircles();
    animate();

    // Handle resize
    const handleResize = () => {
      if (asciiContainerRef.current) {
        camera.aspect =
          asciiContainerRef.current.clientWidth / asciiContainerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          asciiContainerRef.current.clientWidth,
          asciiContainerRef.current.clientHeight
        );
        effect.setSize(
          asciiContainerRef.current.clientWidth,
          asciiContainerRef.current.clientHeight
        );
      }
      setCanvasSize();
      initCircles();
    };

    window.addEventListener('resize', handleResize);

    // Theme change observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          initCircles();
          effect.domElement.style.color = 'var(--primary-color)';
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      if (asciiContainerRef.current) {
        asciiContainerRef.current.removeChild(effect.domElement);
      }
      controls.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden" style={{ zIndex: -1 }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
      <div
        ref={asciiContainerRef}
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      />
    </div>
  );
};

export default AsciiBackground;