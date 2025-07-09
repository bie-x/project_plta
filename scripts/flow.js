document.addEventListener('DOMContentLoaded', () => {
  const image = document.querySelector('.animasi img');
  const animationOverlay = document.querySelector('.animation-overlay');

  function updateOverlaySize() {
    animationOverlay.style.position = 'absolute';
    animationOverlay.style.left = `${image.offsetLeft}px`;
    animationOverlay.style.top = `${image.offsetTop}px`;
    animationOverlay.style.width = `${image.offsetWidth}px`;
    animationOverlay.style.height = `${image.offsetHeight}px`;
    animationOverlay.style.pointerEvents = 'none';
  }

  updateOverlaySize();
  window.addEventListener('resize', updateOverlaySize);
  window.addEventListener('scroll', updateOverlaySize);

  const flowPaths = [
    {
      name: 'water-down-dam',
        start: { x: 0.20, y: 0.28 }, 
        end: { x: 0.32, y: 0.48 }, 
      color: '#4DD0E1',
      speed: 0.003,
      maxParticles: 12,
      interval: 300
    },
    {
      name: 'water-out-turbine',
      start: { x: 0.32, y: 0.48 },
      end: { x: 0.60, y: 0.60 },
      color: '#4DD0E1',
      speed: 0.002,
      maxParticles: 15,
      interval: 300
    },
    {
      name: 'power-to-transformer',
      start: { x: 0.55, y: 0.55 },
      end: { x: 0.68, y: 0.45 },
      color: 'yellow',
      speed: 0.003,
      maxParticles: 4,
      interval: 500
    },
    {
      name: 'power-to-tower',
      start: { x: 0.68, y: 0.45 },
      end: { x: 0.82, y: 0.384 },
      color: 'yellow',
      speed: 0.006,
      maxParticles: 3,
      interval: 800
    }
  ];

  const particles = {};

  flowPaths.forEach(path => {
    particles[path.name] = [];
    path.lastParticleTime = Date.now();
    path.dx = path.end.x - path.start.x;
    path.dy = path.end.y - path.start.y;
    path.distance = Math.sqrt(path.dx ** 2 + path.dy ** 2);
    path.unitDx = path.dx / path.distance;
    path.unitDy = path.dy / path.distance;
  });

  function createParticle(path) {
    const particle = document.createElement('div');
    particle.classList.add('flow-particle');
    particle.style.borderBottomColor = path.color;

    const startX = image.offsetWidth * path.start.x;
    const startY = image.offsetHeight * path.start.y;

    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.progress = 0;

    const angle = Math.atan2(path.dy, path.dx) * (180 / Math.PI) + 90;
    particle.style.transform = `rotate(${angle}deg)`;

    animationOverlay.appendChild(particle);
    return particle;
  }

  function animateParticles() {
    const imageWidth = image.offsetWidth;
    const imageHeight = image.offsetHeight;

    flowPaths.forEach(path => {
      const now = Date.now();

      if (now - path.lastParticleTime > path.interval && particles[path.name].length < path.maxParticles) {
        const newParticle = createParticle(path);
        particles[path.name].push(newParticle);
        path.lastParticleTime = now;
      }

      particles[path.name] = particles[path.name].filter(p => {
        p.progress += path.speed;
        if (p.progress >= 1) {
          p.remove();
          return false;
        } else {
          const x = imageWidth * (path.start.x + path.unitDx * path.distance * p.progress);
          const y = imageHeight * (path.start.y + path.unitDy * path.distance * p.progress);
          p.style.left = `${x}px`;
          p.style.top = `${y}px`;
          return true;
        }
      });
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
});