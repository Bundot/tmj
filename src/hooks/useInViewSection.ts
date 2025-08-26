import { useState, useEffect } from 'react';
/**
 * useInViewSection Hook
 *
 * A custom hook that tracks which section is currently in the viewport.
 * Uses IntersectionObserver to monitor sections and determine which one
 * is most visible to the user.
 *
 * This is used to highlight the corresponding navigation link in the header.
 *
 * @returns {string} The ID of the section currently in view
 */
export const useInViewSection = (): string => {
  const [activeSection, setActiveSection] = useState<string>('home');
  useEffect(() => {
    // Define the sections we want to observe
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    // Configure the intersection observer
    const observerOptions = {
      // Root margin makes sections become "active" a bit before they hit the top of the viewport
      // This creates a more natural feeling navigation
      rootMargin: '-10% 0px -85% 0px',
      threshold: 0.1 // 10% of the section must be visible
    };
    // Track section visibility percentages
    const sectionVisibility = new Map<string, number>();
    // Intersection observer callback
    const observerCallback: IntersectionObserverCallback = entries => {
      entries.forEach(entry => {
        // Get section ID
        const id = entry.target.getAttribute('id') || '';
        // Calculate visibility ratio and store it
        const visibilityRatio = entry.intersectionRatio;
        sectionVisibility.set(id, visibilityRatio);
      });
      // Find the section with the highest visibility
      let maxVisibility = 0;
      let mostVisibleSection = activeSection;
      sectionVisibility.forEach((visibility, id) => {
        if (visibility > maxVisibility) {
          maxVisibility = visibility;
          mostVisibleSection = id;
        }
      });
      // Update active section if there's a change
      if (mostVisibleSection !== activeSection) {
        setActiveSection(mostVisibleSection);
        // Update URL hash without scrolling (for bookmarking/sharing)
        history.replaceState(null, document.title, mostVisibleSection ? `#${mostVisibleSection}` : window.location.pathname);
      }
    };
    // Create and start the observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
    // Cleanup observer on unmount
    return () => observer.disconnect();
  }, [activeSection]);
  return activeSection;
};