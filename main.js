// ===== CAROUSEL =====
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

const cards = Array.from(track.children);
let currentIndex = 0;

function getVisibleCount() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function getCardWidth() {
  const visible = getVisibleCount();
  const gap = 24;
  const containerWidth = track.parentElement.offsetWidth;
  return (containerWidth - gap * (visible - 1)) / visible;
}

function buildDots() {
  dotsContainer.innerHTML = '';
  const visible = getVisibleCount();
  const totalSlides = cards.length - visible + 1;
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
}

function goTo(index) {
  const visible = getVisibleCount();
  const maxIndex = cards.length - visible;
  currentIndex = Math.max(0, Math.min(index, maxIndex));
  const cardWidth = getCardWidth();
  track.style.transform = `translateX(-${currentIndex * (cardWidth + 24)}px)`;
  updateDots();
}

prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

window.addEventListener('resize', () => {
  buildDots();
  goTo(0);
});

// Init
buildDots();
goTo(0);

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.style.padding = window.scrollY > 50 ? '10px 0' : '16px 0';
});

// ===== CONTACT FORM =====
document.querySelector('.contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = 'Message Sent!';
  btn.style.background = '#27ae60';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});
