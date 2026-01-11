// Navbar scroll effect
const navbar = document.getElementById('navbar');

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer para animaciones
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .proceso-step, .stat-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});


/* 
* AOS Initialization and Smooth Scroll for Anchor Links 
*/
AOS.init({duration:800,once:true,offset:100});
document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
    e.preventDefault();
    const t=document.querySelector(this.getAttribute('href'));
    if(t){
        t.scrollIntoView({behavior:'smooth'});
        const n=document.querySelector('.navbar-collapse');
        if(n&&n.classList.contains('show')){
        bootstrap.Collapse.getInstance(n).hide();
        }
    }
    });
});

/* Lines Animation
 * This code creates an animation of lines that appear and disappear randomly.
*/

const colors = [
  "#3B82F6", // azul-brillante
  "#8B5CF6", // purpura
];
/* SVG Setup */
const svg = document.getElementById("pcb-svg");
let W = svg.clientWidth, H = svg.clientHeight;

/* Adjust the SVG size on window resize */
window.addEventListener('resize', () => {
W = svg.clientWidth;
H = svg.clientHeight;
});

/* Function to generate a random number between min and max */
function rand(min, max){ return Math.random()*(max-min)+min; }

/* Function to create a zigzag line */
function createZigzag() {
    const size = rand(10, 200);
    const segments = Math.floor(rand(3, 6));
    const originX = rand(W * 0.3, W * 0.8);
    const originY = rand(H * 0.3, H * 0.70);

    let points = [];
    let px = originX;
    let py = originY;
    points.push(`${px},${py}`);

    let lastDirection = null;

    for (let i = 0; i < segments; i++) {
        /* Generate direction 90-degree angles */
        const directions = [
            [1, 0],   // →
            [0, 1],   // ↓
            [-1, 0],  // ←
            [0, -1]   // ↑
        ];

        /* Prevent immediate reversal */
        const validDirs = directions.filter(dir => {
            if (!lastDirection) return true;
            return !(dir[0] === -lastDirection[0] && dir[1] === -lastDirection[1]);
        });

        /* Choose a random valid direction */
        const dir = validDirs[Math.floor(Math.random() * validDirs.length)];
        lastDirection = dir;

        /* Update position */
        px += dir[0] * size;
        py += dir[1] * size;

        /* Keep within bounds */
        points.push(`${px},${py}`);
    }

    /* Create polyline element */
    const poly = document.createElementNS(svg.namespaceURI, 'polyline');
    poly.setAttribute('points', points.join(' '));
    poly.setAttribute('class', 'trace');
    svg.appendChild(poly);

    /* Animation setup */
    const animationDuration = rand(3, 5);

    /* Trigger reflow for CSS animation */
    requestAnimationFrame(() => {
        const length = poly.getTotalLength();
        poly.setAttribute('stroke-dasharray', length);
        poly.setAttribute('stroke-dashoffset', length);
        poly.style.animationDuration = `${animationDuration}s`;
        poly.style.stroke = colors[Math.floor(Math.random() * colors.length)];  
    });

    /* Remove polyline after animation */
    setTimeout(() => {
        if (poly.parentNode) poly.remove();
    }, animationDuration * 1000 + 500); /* Extra 500ms to ensure animation completes */
}

/* Create zigzag lines at intervals */
setInterval(createZigzag, 500);
