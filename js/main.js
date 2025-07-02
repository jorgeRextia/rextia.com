const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(el => appearOnScroll.observe(el));

document.addEventListener('click', function (event) {
    const navbarToggler = document.querySelector('#btn-toggler');
    const navbarCollapse = document.querySelector('#navbarMobile');

    // Si el menú está expandido
    if (navbarToggler && navbarCollapse.classList.contains('show')) {
        // Y el clic ocurrió fuera del navbar y del toggler
        if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
            navbarToggler.click(); // Simula un clic en el botón ☰ para cerrarlo
        }
    }

    // Cerrar al hacer clic en un link del menú
      if (event.target.classList.contains('nav-link')) {
        navbarToggler.click();
      }
});


/* * Bubbles Animation
 * This code creates a bubble animation using SVG circles.
 * Each circle has a random position, size, and animation delay.

const svg = document.getElementById("bubbles-anim");

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

const colors = [
    "#3B82F6", // azul-brillante
    "#8B5CF6", // purpura
    "#10B981", // verde
    "#F7FAFC", // blanco-hueso
    "#F59B0E"  // ambar
];

for (let i = 0; i < 25; i++) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const cx = rand(150, window.innerWidth);
    const cy = rand(150, window.innerHeight);
    const r = rand(50, 80);
    const delay = rand(0, 10);

    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("class", "bubble");
    circle.style.animationDelay = `${delay}s`;
    circle.style.stroke = colors[Math.floor(Math.random() * colors.length)];

    svg.appendChild(circle);
}
*/

/* Lines Animation
 * This code creates an animation of lines that appear and disappear randomly.
*/

const colors = [
    "#3B82F6", // azul-brillante
    "#8B5CF6", // purpura
    "#10B981", // verde
    "#F7FAFC", // blanco-hueso
    "#F59B0E"  // ambar
];

const svg = document.getElementById("pcb-svg");
let W = svg.clientWidth, H = svg.clientHeight;

window.addEventListener('resize', () => {
  W = svg.clientWidth;
  H = svg.clientHeight;
});

function rand(min, max){ return Math.random()*(max-min)+min; }


function createZigzag() {
  const size = rand(40, 150);
  const segments = Math.floor(rand(3, 6));
  const originX = rand(W * 0.3, W * 0.8);
  const originY = rand(H * 0.3, H * 0.70);

  let points = [];
  let px = originX;
  let py = originY;
  points.push(`${px},${py}`);

  let lastDirection = null;

  for (let i = 0; i < segments; i++) {
    // Ángulos rectos (derecha, arriba, izquierda, abajo)
    const directions = [
      [1, 0],   // →
      [0, 1],   // ↓
      [-1, 0],  // ←
      [0, -1]   // ↑
    ];

    // Filtra para no repetir dirección contraria
    const validDirs = directions.filter(dir => {
      if (!lastDirection) return true;
      return !(dir[0] === -lastDirection[0] && dir[1] === -lastDirection[1]);
    });

    const dir = validDirs[Math.floor(Math.random() * validDirs.length)];
    lastDirection = dir;

    px += dir[0] * size;
    py += dir[1] * size;

    points.push(`${px},${py}`);
  }

  const poly = document.createElementNS(svg.namespaceURI, 'polyline');
  poly.setAttribute('points', points.join(' '));
  poly.setAttribute('class', 'trace');
  svg.appendChild(poly);

  const animationDuration = rand(3, 5);

  requestAnimationFrame(() => {
    const length = poly.getTotalLength();
    poly.setAttribute('stroke-dasharray', length);
    poly.setAttribute('stroke-dashoffset', length);
    poly.style.animationDuration = `${animationDuration}s`;
    poly.style.stroke = colors[Math.floor(Math.random() * colors.length)];  
  });

  setTimeout(() => {
    if (poly.parentNode) poly.remove();
  }, animationDuration * 1000 + 500); // Elimina después de la animación más un pequeño margen
}
setInterval(createZigzag, 300);
