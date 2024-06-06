
import { useEffect, useRef } from 'react';

const useScrollSnap = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionIndex = sectionRefs.current.indexOf(entry.target);
          window.scrollTo({
            top: sectionIndex * window.innerHeight,
            behavior: 'smooth',
          });
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    sectionRefs.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const setRef = (index) => (el) => {
    sectionRefs.current[index] = el;
  };

  return { containerRef, setRef };
};

export default useScrollSnap;
// import { useEffect, useRef } from 'react';

// const useScrollSnap = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!containerRef.current) return;

//       const sections = containerRef.current.children;
//       const sectionHeight = window.innerHeight;
//       let currentScroll = window.scrollY;
      
//       let closestSectionIndex = Math.round(currentScroll / sectionHeight);

//       if (closestSectionIndex < 0) closestSectionIndex = 0;
//       if (closestSectionIndex >= sections.length) closestSectionIndex = sections.length - 1;

//       window.scrollTo({
//         top: closestSectionIndex * sectionHeight,
//         behavior: 'smooth'
//       });
//     };

//     let scrollTimeout;
//     const handleScrollDebounced = () => {
//       clearTimeout(scrollTimeout);
//       scrollTimeout = setTimeout(handleScroll, 100);
//     };

//     window.addEventListener('scroll', handleScrollDebounced);

//     return () => {
//       window.removeEventListener('scroll', handleScrollDebounced);
//     };
//   }, []);

//   return containerRef;
// };

// export default useScrollSnap;

// import { useEffect } from 'react';

// const useScrollSnap = (containerRef) => {

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!containerRef.current) return;

//       const sections = containerRef.current.children;
//       const scrollTop = containerRef.current.scrollTop;
//       const sectionHeight = window.innerHeight;
//       let closestSectionIndex = Math.round(scrollTop / sectionHeight);

//       if (closestSectionIndex < 0) closestSectionIndex = 0;
//       if (closestSectionIndex >= sections.length) closestSectionIndex = sections.length - 1;

//       containerRef.current.scrollTo({
//         top: closestSectionIndex * sectionHeight,
//         behavior: 'smooth'
//       });
//     };

//     const refCurrent = containerRef.current;
//     refCurrent.addEventListener('scroll', handleScroll);

//     return () => {
//       refCurrent.removeEventListener('scroll', handleScroll);
//     };
//   }, [containerRef]);
// };

// export default useScrollSnap;