document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.scroll-container');
  const sections = document.querySelectorAll('.snap-section');
  let scrollTimeout;

  container.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollPos = container.scrollTop;
      let nearestSection = null;
      let minDistance = Infinity;

      sections.forEach(section => {
        const distance = Math.abs(section.offsetTop - scrollPos);
        if (distance < minDistance) {
          minDistance = distance;
          nearestSection = section;
        }
      });

      if (nearestSection) {
        container.scrollTo({
          top: nearestSection.offsetTop,
          behavior: 'smooth'
        });
      }
    }, 100); // Adjust debounce delay if needed
  });
});

// Optional: Toggle mobile navigation menu
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks.style.display === 'flex') {
    navLinks.style.display = 'none';
  } else {
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
  }
}


