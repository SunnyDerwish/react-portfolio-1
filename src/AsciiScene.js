import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect';
import { TrackballControls } from 'three/addons/controls/TrackballControls';

const AsciiScene = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    let camera, controls, scene, renderer, effect;
    let sphere, plane;
    const start = Date.now();

    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0, 0, 0);

    // Camera setup
    camera = new THREE.PerspectiveCamera(
      70,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      1,
      1000
    );
    camera.position.y = 150;
    camera.position.z = 500;

    // Lights
    const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0);
    pointLight1.position.set(500, 500, 500);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
    pointLight2.position.set(-500, -500, -500);
    scene.add(pointLight2);

    // Objects
    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(200, 20, 10),
      new THREE.MeshPhongMaterial({ flatShading: true })
    );
    scene.add(sphere);

    plane = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 400),
      new THREE.MeshBasicMaterial({ color: 0xe0e0e0 })
    );
    plane.position.y = -200;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );

    // ASCII Effect
    effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
    effect.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    effect.domElement.style.color = 'white';
    effect.domElement.style.backgroundColor = 'black';

    // Add to DOM
    containerRef.current.appendChild(effect.domElement);

    // Controls
    controls = new TrackballControls(camera, effect.domElement);

    // Animation
    function animate() {
      const timer = Date.now() - start;
      sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 150;
      sphere.rotation.x = timer * 0.0003;
      sphere.rotation.z = timer * 0.0002;
      controls.update();
      effect.render(scene, camera);
      requestAnimationFrame(animate);
    }

    // Handle resize
    const handleResize = () => {
      if (containerRef.current) {
        camera.aspect =
          containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(
          containerRef.current.clientWidth,
          containerRef.current.clientHeight
        );
        effect.setSize(
          containerRef.current.clientWidth,
          containerRef.current.clientHeight
        );
      }
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(effect.domElement);
      }
      controls.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-96 relative"
      style={{ touchAction: 'none' }} // Prevents touch scrolling issues
    />
  );
};

export default AsciiScene;