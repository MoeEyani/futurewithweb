import { gsap } from 'gsap';
import * as THREE from 'three';

/**
 * Utility library for animations used throughout the Future With website
 */

// GSAP Animation Presets
export const fadeIn = (element: HTMLElement, delay: number = 0, duration: number = 0.8) => {
  return gsap.from(element, {
    opacity: 0,
    y: 20,
    duration,
    delay,
    ease: 'power2.out'
  });
};

export const fadeOut = (element: HTMLElement, delay: number = 0, duration: number = 0.8) => {
  return gsap.to(element, {
    opacity: 0,
    y: -20,
    duration,
    delay,
    ease: 'power2.in'
  });
};

export const staggerFadeIn = (elements: HTMLElement[], delay: number = 0, stagger: number = 0.1, duration: number = 0.8) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 20,
    duration,
    delay,
    stagger,
    ease: 'power2.out'
  });
};

export const pulseAnimation = (element: HTMLElement, scale: number = 1.05, duration: number = 1) => {
  return gsap.to(element, {
    scale,
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
};

export const shakeAnimation = (element: HTMLElement, intensity: number = 5, duration: number = 0.3) => {
  return gsap.to(element, {
    x: `+=${intensity}`,
    duration: duration / 4,
    repeat: 3,
    yoyo: true,
    ease: 'power1.inOut'
  });
};

export const glowAnimation = (element: HTMLElement, property: string = 'boxShadow', value: string = '0 0 10px rgba(78, 137, 174, 0.8)', duration: number = 1) => {
  const fromValue = window.getComputedStyle(element)[property as any] || 'none';
  
  return gsap.timeline({ repeat: -1, yoyo: true })
    .to(element, { [property]: value, duration, ease: 'power1.inOut' })
    .to(element, { [property]: fromValue, duration, ease: 'power1.inOut' });
};

export const typewriterEffect = (element: HTMLElement, text: string, speed: number = 50, delay: number = 0) => {
  let i = 0;
  const originalText = text;
  element.textContent = '';
  
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      const interval = setInterval(() => {
        if (i < originalText.length) {
          element.textContent += originalText.charAt(i);
          i++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    }, delay);
  });
};

// Three.js Utilities
export interface ParticleSystem {
  update: () => void;
  resize: (width: number, height: number) => void;
  dispose: () => void;
  setAttraction: (attract: boolean) => void;
  setAttractionPoint: (x: number, y: number) => void;
}

export interface ParticleConfig {
  count?: number;
  colors?: string[];
  speed?: number;
  size?: number;
  canvas: HTMLCanvasElement;
  targetCenter?: boolean;
}

export const createParticleSystem = (config: ParticleConfig): ParticleSystem => {
  const {
    count = 100,
    colors = ['#F05454', '#FFD166', '#4CAF50', '#4E89AE'],
    speed = 0.5,
    size = 3,
    canvas,
    targetCenter = false
  } = config;

  // Set up renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });
  
  // Set up scene and camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
  camera.position.z = 30;
  
  // Convert hex colors to THREE.Color
  const threeColors = colors.map(color => new THREE.Color(color));
  
  // Create particles
  const particles: THREE.Points = (() => {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const velocities = [];
    const particleColors = [];
    
    for (let i = 0; i < count; i++) {
      // Random position within the canvas
      const x = (Math.random() - 0.5) * canvas.width * 0.1;
      const y = (Math.random() - 0.5) * canvas.height * 0.1;
      const z = (Math.random() - 0.5) * 10;
      
      vertices.push(x, y, z);
      
      // Random velocity
      const vx = (Math.random() - 0.5) * speed;
      const vy = (Math.random() - 0.5) * speed;
      const vz = (Math.random() - 0.5) * speed * 0.1;
      
      velocities.push(vx, vy, vz);
      
      // Random color from the palette
      const color = threeColors[Math.floor(Math.random() * threeColors.length)];
      particleColors.push(color.r, color.g, color.b);
    }
    
    // Set attributes
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
    
    // Create material
    const material = new THREE.PointsMaterial({
      size: size * 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    
    return new THREE.Points(geometry, material);
  })();
  
  scene.add(particles);
  
  // State
  let isAttracted = targetCenter;
  let attractionPoint = { x: 0, y: 0 };
  const particleData = {
    vertices: (particles.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array,
    velocities: new Float32Array(count * 3)
  };
  
  // Initialize velocities
  for (let i = 0; i < count * 3; i += 3) {
    particleData.velocities[i] = (Math.random() - 0.5) * speed;
    particleData.velocities[i + 1] = (Math.random() - 0.5) * speed;
    particleData.velocities[i + 2] = (Math.random() - 0.5) * speed * 0.1;
  }
  
  // Animation loop
  const update = () => {
    for (let i = 0; i < particleData.vertices.length; i += 3) {
      // Current position
      const x = particleData.vertices[i];
      const y = particleData.vertices[i + 1];
      const z = particleData.vertices[i + 2];
      
      // Current velocity
      let vx = particleData.velocities[i];
      let vy = particleData.velocities[i + 1];
      let vz = particleData.velocities[i + 2];
      
      if (isAttracted) {
        // Calculate direction to attraction point
        const dx = (attractionPoint.x / 100) - x;
        const dy = (attractionPoint.y / 100) - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0.1) {
          // Accelerate towards attraction point
          const acceleration = 0.01;
          vx += (dx / distance) * acceleration;
          vy += (dy / distance) * acceleration;
          
          // Apply damping to prevent oscillation
          vx *= 0.99;
          vy *= 0.99;
        } else {
          // Reset particle if it reaches the target
          particleData.vertices[i] = (Math.random() - 0.5) * canvas.width * 0.1;
          particleData.vertices[i + 1] = (Math.random() - 0.5) * canvas.height * 0.1;
          vx = (Math.random() - 0.5) * speed;
          vy = (Math.random() - 0.5) * speed;
        }
      }
      
      // Update position
      particleData.vertices[i] += vx;
      particleData.vertices[i + 1] += vy;
      particleData.vertices[i + 2] += vz;
      
      // Store updated velocity
      particleData.velocities[i] = vx;
      particleData.velocities[i + 1] = vy;
      particleData.velocities[i + 2] = vz;
      
      // Boundary checks (if not attracted)
      if (!isAttracted) {
        const bounds = 15;
        
        if (particleData.vertices[i] > bounds || particleData.vertices[i] < -bounds) {
          particleData.velocities[i] *= -1;
        }
        
        if (particleData.vertices[i + 1] > bounds || particleData.vertices[i + 1] < -bounds) {
          particleData.velocities[i + 1] *= -1;
        }
        
        if (particleData.vertices[i + 2] > bounds || particleData.vertices[i + 2] < -bounds) {
          particleData.velocities[i + 2] *= -1;
        }
      }
    }
    
    // Update geometry
    (particles.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    
    // Render
    renderer.render(scene, camera);
  };
  
  // Handle window resize
  const resize = (width: number, height: number) => {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  
  // Initial resize
  resize(canvas.width, canvas.height);
  
  // Clean up resources
  const dispose = () => {
    particles.geometry.dispose();
    (particles.material as THREE.Material).dispose();
    renderer.dispose();
  };
  
  // Control functions
  const setAttraction = (attract: boolean) => {
    isAttracted = attract;
  };
  
  const setAttractionPoint = (x: number, y: number) => {
    attractionPoint.x = x;
    attractionPoint.y = y;
  };
  
  return {
    update,
    resize,
    dispose,
    setAttraction,
    setAttractionPoint
  };
};

// 3D Gate Animation
export interface GateOptions {
  element: HTMLElement;
  color?: string;
  pulseSpeed?: number;
  rotationSpeed?: number;
}

export const create3DGate = (options: GateOptions) => {
  const {
    element,
    color = '#4E89AE',
    pulseSpeed = 2,
    rotationSpeed = 0.5
  } = options;
  
  const width = element.clientWidth;
  const height = element.clientHeight;
  
  // Set up renderer
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(width, height);
  element.appendChild(renderer.domElement);
  
  // Set up scene and camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;
  
  // Create gate
  const gateGeometry = new THREE.TorusGeometry(2, 0.3, 16, 100);
  const gateMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    opacity: 0.8,
    transparent: true,
    wireframe: true
  });
  const gate = new THREE.Mesh(gateGeometry, gateMaterial);
  scene.add(gate);
  
  // Add particles surrounding the gate
  const particleCount = 50;
  const particleGeometry = new THREE.BufferGeometry();
  const particleVertices = [];
  
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 2 + (Math.random() - 0.5) * 0.5;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const z = (Math.random() - 0.5) * 0.5;
    
    particleVertices.push(x, y, z);
  }
  
  particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particleVertices, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    color: new THREE.Color(color),
    size: 0.05,
    transparent: true,
    opacity: 0.8
  });
  
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);
  
  // Animation variables
  let time = 0;
  let pulseScale = 1;
  let pulseDirection = 1;
  
  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    
    time += 0.01;
    
    // Rotate gate
    gate.rotation.z += 0.002 * rotationSpeed;
    gate.rotation.x = Math.sin(time * 0.2) * 0.1;
    
    // Pulse effect
    pulseScale += 0.01 * pulseDirection * pulseSpeed;
    if (pulseScale > 1.2) {
      pulseDirection = -1;
    } else if (pulseScale < 0.8) {
      pulseDirection = 1;
    }
    
    gate.scale.set(pulseScale, pulseScale, 1);
    
    // Rotate particles
    particles.rotation.z -= 0.001 * rotationSpeed;
    
    renderer.render(scene, camera);
  };
  
  // Start animation
  animate();
  
  // Handle window resize
  const resize = () => {
    const newWidth = element.clientWidth;
    const newHeight = element.clientHeight;
    
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(newWidth, newHeight);
  };
  
  window.addEventListener('resize', resize);
  
  // Clean up
  const dispose = () => {
    window.removeEventListener('resize', resize);
    
    scene.remove(gate);
    scene.remove(particles);
    
    gateGeometry.dispose();
    gateMaterial.dispose();
    particleGeometry.dispose();
    particleMaterial.dispose();
    
    renderer.dispose();
    
    if (element.contains(renderer.domElement)) {
      element.removeChild(renderer.domElement);
    }
  };
  
  return {
    resize,
    dispose
  };
};

// Workflow Phase Connection Animation
export const createPhaseConnector = (startElement: HTMLElement, endElement: HTMLElement, color: string = '#4E89AE') => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.position = 'absolute';
  svg.style.top = '0';
  svg.style.left = '0';
  svg.style.width = '100%';
  svg.style.height = '100%';
  svg.style.pointerEvents = 'none';
  svg.style.zIndex = '-1';
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('stroke', color);
  path.setAttribute('stroke-width', '2');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke-dasharray', '5,5');
  
  svg.appendChild(path);
  document.body.appendChild(svg);
  
  const updatePath = () => {
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();
    
    const startX = startRect.right;
    const startY = startRect.top + startRect.height / 2;
    
    const endX = endRect.left;
    const endY = endRect.top + endRect.height / 2;
    
    const midX = (startX + endX) / 2;
    
    const d = `M${startX},${startY} C${midX},${startY} ${midX},${endY} ${endX},${endY}`;
    path.setAttribute('d', d);
  };
  
  // Initial update
  updatePath();
  
  // Update on resize and scroll
  window.addEventListener('resize', updatePath);
  window.addEventListener('scroll', updatePath);
  
  // Animation
  gsap.to(path, {
    strokeDashoffset: 10,
    repeat: -1,
    duration: 1,
    ease: 'linear'
  });
  
  // Clean up
  const dispose = () => {
    window.removeEventListener('resize', updatePath);
    window.removeEventListener('scroll', updatePath);
    
    if (document.body.contains(svg)) {
      document.body.removeChild(svg);
    }
  };
  
  return {
    updatePath,
    dispose
  };
};

// Interactive Card Flip Animation
export const setupCardFlip = (card: HTMLElement, duration: number = 0.6) => {
  const inner = card.querySelector('.card-inner') as HTMLElement;
  const front = card.querySelector('.card-front') as HTMLElement;
  const back = card.querySelector('.card-back') as HTMLElement;
  
  if (!inner || !front || !back) {
    console.error('Card elements missing required structure');
    return { dispose: () => {} };
  }
  
  // Set initial styles
  gsap.set(inner, {
    transformStyle: 'preserve-3d',
    transformPerspective: 1000
  });
  
  gsap.set([front, back], {
    backfaceVisibility: 'hidden',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0
  });
  
  gsap.set(back, { rotationY: 180 });
  
  // Create animation timeline (paused initially)
  const timeline = gsap.timeline({ paused: true })
    .to(inner, { rotationY: 180, duration, ease: 'power2.inOut' });
  
  // Toggle function
  let isFlipped = false;
  
  const toggleFlip = () => {
    if (isFlipped) {
      timeline.reverse();
    } else {
      timeline.play();
    }
    isFlipped = !isFlipped;
  };
  
  // Event listeners
  const handleMouseEnter = () => toggleFlip();
  const handleMouseLeave = () => toggleFlip();
  
  card.addEventListener('mouseenter', handleMouseEnter);
  card.addEventListener('mouseleave', handleMouseLeave);
  
  // Clean up
  const dispose = () => {
    card.removeEventListener('mouseenter', handleMouseEnter);
    card.removeEventListener('mouseleave', handleMouseLeave);
    timeline.kill();
  };
  
  return {
    toggleFlip,
    dispose
  };
};

// Marquee Animation for Logo Carousels
export const createMarquee = (container: HTMLElement, speed: number = 50) => {
  const content = container.querySelector('.marquee-content') as HTMLElement;
  
  if (!content) {
    console.error('Marquee content not found');
    return { dispose: () => {} };
  }
  
  // Clone the content
  const clone = content.cloneNode(true) as HTMLElement;
  container.appendChild(clone);
  
  // Calculate animation duration based on content width
  const contentWidth = content.offsetWidth;
  const duration = contentWidth / speed;
  
  // Create animation
  const tl = gsap.timeline({ repeat: -1 });
  
  tl.to([content, clone], {
    x: -contentWidth,
    ease: 'none',
    duration
  });
  
  // Reset on resize
  const handleResize = () => {
    const newWidth = content.offsetWidth;
    const newDuration = newWidth / speed;
    
    tl.clear();
    tl.to([content, clone], {
      x: -newWidth,
      ease: 'none',
      duration: newDuration
    });
  };
  
  window.addEventListener('resize', handleResize);
  
  // Pause on hover
  const handleMouseEnter = () => {
    tl.pause();
  };
  
  const handleMouseLeave = () => {
    tl.play();
  };
  
  container.addEventListener('mouseenter', handleMouseEnter);
  container.addEventListener('mouseleave', handleMouseLeave);
  
  // Clean up
  const dispose = () => {
    window.removeEventListener('resize', handleResize);
    container.removeEventListener('mouseenter', handleMouseEnter);
    container.removeEventListener('mouseleave', handleMouseLeave);
    tl.kill();
    
    if (container.contains(clone)) {
      container.removeChild(clone);
    }
  };
  
  return {
    timeline: tl,
    dispose
  };
};

// Parallax Effect for Background Elements
export const createParallax = (element: HTMLElement, speed: number = 0.5) => {
  const initialTransform = window.getComputedStyle(element).transform;
  
  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const moveX = (clientX - windowWidth / 2) * speed / 50;
    const moveY = (clientY - windowHeight / 2) * speed / 50;
    
    gsap.to(element, {
      x: moveX,
      y: moveY,
      duration: 1,
      ease: 'power1.out'
    });
  };
  
  window.addEventListener('mousemove', handleMouseMove);
  
  // Clean up
  const dispose = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    gsap.set(element, { clearProps: 'transform' });
  };
  
  return {
    dispose
  };
};

// Interactive Cursor Effect
export interface CursorOptions {
  size?: number;
  color?: string;
  blendMode?: string;
  trail?: boolean;
  trailLength?: number;
}

export const createInteractiveCursor = (options: CursorOptions = {}) => {
  const {
    size = 20,
    color = '#4E89AE',
    blendMode = 'difference',
    trail = true,
    trailLength = 8
  } = options;
  
  // Create cursor element
  const cursor = document.createElement('div');
  cursor.style.position = 'fixed';
  cursor.style.width = `${size}px`;
  cursor.style.height = `${size}px`;
  cursor.style.borderRadius = '50%';
  cursor.style.backgroundColor = color;
  cursor.style.mixBlendMode = blendMode;
  cursor.style.pointerEvents = 'none';
  cursor.style.zIndex = '9999';
  cursor.style.transform = 'translate(-50%, -50%)';
  cursor.style.opacity = '0.7';
  
  document.body.appendChild(cursor);
  
  // Create trail elements if needed
  const trailElements: HTMLElement[] = [];
  
  if (trail) {
    for (let i = 0; i < trailLength; i++) {
      const trailElement = document.createElement('div');
      trailElement.style.position = 'fixed';
      trailElement.style.width = `${size * (1 - i / trailLength * 0.7)}px`;
      trailElement.style.height = `${size * (1 - i / trailLength * 0.7)}px`;
      trailElement.style.borderRadius = '50%';
      trailElement.style.backgroundColor = color;
      trailElement.style.mixBlendMode = blendMode;
      trailElement.style.pointerEvents = 'none';
      trailElement.style.zIndex = '9998';
      trailElement.style.transform = 'translate(-50%, -50%)';
      trailElement.style.opacity = `${0.7 * (1 - i / trailLength)}`;
      
      document.body.appendChild(trailElement);
      trailElements.push(trailElement);
    }
  }
  
  // Track cursor position
  let mouseX = -100;
  let mouseY = -100;
  let cursorVisible = false;
  
  // Previous positions for trail effect
  const positions: { x: number; y: number }[] = Array(trailLength).fill({ x: -100, y: -100 });
  
  // Update cursor position
  const updateCursor = () => {
    if (cursorVisible) {
      // Update main cursor
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power1.out'
      });
      
      // Update trail elements with delay
      if (trail) {
        positions.pop();
        positions.unshift({ x: mouseX, y: mouseY });
        
        trailElements.forEach((element, index) => {
          const position = positions[Math.min(index, positions.length - 1)];
          
          gsap.to(element, {
            x: position.x,
            y: position.y,
            duration: 0.1,
            ease: 'power1.out'
          });
        });
      }
    }
    
    requestAnimationFrame(updateCursor);
  };
  
  // Start animation loop
  updateCursor();
  
  // Event listeners
  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!cursorVisible) {
      cursorVisible = true;
      gsap.to(cursor, { opacity: 0.7, duration: 0.3 });
      
      if (trail) {
        trailElements.forEach((element, index) => {
          gsap.to(element, { 
            opacity: 0.7 * (1 - index / trailLength), 
            duration: 0.3,
            delay: index * 0.05
          });
        });
      }
    }
  };
  
  const handleMouseLeave = () => {
    cursorVisible = false;
    gsap.to(cursor, { opacity: 0, duration: 0.3 });
    
    if (trail) {
      trailElements.forEach((element) => {
        gsap.to(element, { opacity: 0, duration: 0.3 });
      });
    }
  };
  
  const handleMouseDown = () => {
    gsap.to(cursor, { scale: 0.8, duration: 0.2 });
  };
  
  const handleMouseUp = () => {
    gsap.to(cursor, { scale: 1, duration: 0.2 });
  };
  
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseleave', handleMouseLeave);
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mouseup', handleMouseUp);
  
  // Clean up
  const dispose = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseleave', handleMouseLeave);
    document.removeEventListener('mousedown', handleMouseDown);
    document.removeEventListener('mouseup', handleMouseUp);
    
    if (document.body.contains(cursor)) {
      document.body.removeChild(cursor);
    }
    
    trailElements.forEach((element) => {
      if (document.body.contains(element)) {
        document.body.removeChild(element);
      }
    });
  };
  
  return {
    cursor,
    trailElements,
    dispose
  };
};
