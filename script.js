document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.scroll-container'); // Get the scrollable container
  const sections = document.querySelectorAll('.snap-section'); // Get all sections that should snap
  let lastScrollTop = 0; // Store the last scroll position to detect scroll direction
  let scrollTimeout; // Timeout for debouncing the scroll event

  container.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollPos = container.scrollTop; // Get current scroll position
      const containerHeight = container.clientHeight; // Height of the scroll container
      let nearestSection = null;
      let minDistance = Infinity;
      let nextSection = null;
      let prevSection = null;
      let currentSection = null;

      // Iterate through each section to determine proximity to viewport center
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop; // Get section's top position relative to container
        const sectionCenter = sectionTop + section.clientHeight / 2; // Calculate section center
        const distance = Math.abs(sectionCenter - (scrollPos + containerHeight / 2)); // Distance from viewport center
        
        if (distance < minDistance) {
          minDistance = distance;
          nearestSection = section; // Track nearest section to viewport center
        }
        
        // Determine which section the viewport is currently over
        if (scrollPos + containerHeight / 2 > sectionTop && scrollPos + containerHeight / 2 < sectionTop + section.clientHeight) {
          currentSection = section;
          nextSection = sections[index + 1] || null; // Get the next section if available
          prevSection = sections[index - 1] || null; // Get the previous section if available
        }
      });

      const scrollDirection = scrollPos > lastScrollTop ? 'down' : 'up'; // Determine scroll direction
      lastScrollTop = scrollPos; // Update last scroll position
      
      if (nearestSection) {
        const sectionCenter = nearestSection.offsetTop + nearestSection.clientHeight / 2; // Get center of nearest section
        const viewportCenter = scrollPos + containerHeight / 2; // Get center of viewport

        // Determine whether to stay in current section or move to next/previous
        if (viewportCenter > sectionCenter) {
          if (scrollDirection === 'down' && nextSection) {
            container.scrollTo({
              top: nextSection.offsetTop,
              behavior: 'smooth' // Smooth scrolling transition
            });
          } else {
            container.scrollTo({
              top: nearestSection.offsetTop,
              behavior: 'smooth'
            });
          }
        } else {
          if (scrollDirection === 'up' && prevSection) {
            container.scrollTo({
              top: prevSection.offsetTop,
              behavior: 'smooth'
            });
          } else {
            container.scrollTo({
              top: nearestSection.offsetTop,
              behavior: 'smooth'
            });
          }
        }
      }
    }, 100); // Debounce delay to prevent excessive calculations
  });
});

// Optional: Toggle mobile navigation menu
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links'); // Get navigation links container
  if (navLinks.style.display === 'flex') {
    navLinks.style.display = 'none'; // Hide menu if already displayed
  } else {
    navLinks.style.display = 'flex'; // Show menu when toggled
    navLinks.style.flexDirection = 'column'; // Ensure vertical stacking of links
  }
}
