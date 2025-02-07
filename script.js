// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.scroll-container');
  const sections = document.querySelectorAll('.snap-section');
  let scrollTimeout;

  container.addEventListener('scroll', () => {
    // Clear any previous timeout to debounce the scroll event
    window.clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollTop = container.scrollTop;
      let nearestSection = null;
      let minDistance = Infinity;

      sections.forEach(section => {
        // Calculate the distance from the top of the container to this section
        const distance = Math.abs(section.offsetTop - scrollTop);
        if (distance < minDistance) {
          minDistance = distance;
          nearestSection = section;
        }
      });

      // If a section was found, smoothly scroll to its top offset
      if (nearestSection) {
        container.scrollTo({
          top: nearestSection.offsetTop,
          behavior: 'smooth'
        });
      }
    }, 100); // Adjust debounce delay as needed
  });
});

// Optional: Toggle mobile menu (if needed)
function toggleMenu() {
  const navLinks = document.querySelector('.nav .nav-links');
  if (navLinks.style.display === 'flex') {
    navLinks.style.display = 'none';
  } else {
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
  }
}
