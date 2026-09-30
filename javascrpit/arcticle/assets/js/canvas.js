/**
 * IT Industry 2030 - Interactive Neural/Quantum Background Canvas
 * High performance, crisp rendering with particle connections & ambient glow
 */

(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.colorType = Math.random() > 0.4 ? 'cyan' : (Math.random() > 0.5 ? 'violet' : 'emerald');
      this.alpha = Math.random() * 0.6 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion/interaction
      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2.5;
          this.y -= (dy / dist) * force * 2.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      let fillStyle;
      if (this.colorType === 'cyan') {
        fillStyle = `rgba(0, 242, 254, ${this.alpha})`;
      } else if (this.colorType === 'violet') {
        fillStyle = `rgba(139, 92, 246, ${this.alpha})`;
      } else {
        fillStyle = `rgba(16, 185, 129, ${this.alpha})`;
      }
      ctx.fillStyle = fillStyle;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.colorType === 'cyan' ? '#00f2fe' : '#8b5cf6';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Determine particle density based on screen resolution
  const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 12000), 95);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    const maxDist = 135;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${opacity})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }
  }

  let animationFrame;
  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connectParticles();

    animationFrame = requestAnimationFrame(animate);
  }

  animate();
})();
