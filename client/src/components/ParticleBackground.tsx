import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
  targetX?: number;
  targetY?: number;
  isAttracted?: boolean;
}

interface ParticleBackgroundProps {
  targetCenter?: boolean;
  id?: string;
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ 
  targetCenter = false, 
  id = 'particles-canvas',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();
  const colors = ['#F05454', '#FFD166', '#4CAF50', '#4E89AE'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;

    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
      }
    };

    const createParticles = () => {
      particles.current = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.1), 100);
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          isAttracted: targetCenter
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // If targeting center, update particles to move toward center
        if (particle.isAttracted && targetCenter) {
          // Calculate direction to center
          const dx = centerX - particle.x;
          const dy = centerY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Accelerate particles as they get closer to center
          const acceleration = 0.05;
          
          if (distance > 5) {
            particle.speedX = (dx / distance) * acceleration;
            particle.speedY = (dy / distance) * acceleration;
          } else {
            // Regenerate particle from edge when it reaches center
            particle.x = Math.random() < 0.5 ? 0 : canvas.width;
            particle.y = Math.random() * canvas.height;
            particle.radius = Math.random() * 3 + 1;
          }
        }
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Boundary check if not attracted to center
        if (!particle.isAttracted) {
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.speedX = -particle.speedX;
          }
          
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.speedY = -particle.speedY;
          }
        }
      });
      
      animationFrameId.current = requestAnimationFrame(drawParticles);
    };
    
    // Initialize
    resizeCanvas();
    createParticles();
    drawParticles();
    
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [targetCenter, colors]);

  return <canvas ref={canvasRef} id={id} className={`absolute top-0 left-0 w-full h-full z-0 ${className}`} />;
};

export default ParticleBackground;
