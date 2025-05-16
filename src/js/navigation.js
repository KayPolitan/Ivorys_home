/**
 * Navigation script for the children's book website
 */

// Total number of pages in the book (excluding cover)
const TOTAL_PAGES = 14;

// Update progress bar
function updateProgressBar(currentPage) {
  // Calculate progress percentage (cover page is 0, first page is 1)
  const progressPercentage = (currentPage / (TOTAL_PAGES + 1)) * 100;
  const progressBar = document.querySelector('.progress-bar');
  
  if (progressBar) {
    progressBar.style.width = `${progressPercentage}%`;
  }
}

// Go to specified page with page turn animation
function goToPage(pageNumber) {
  const pageContent = document.querySelector('.page-content');
  
  // Add page turn animation class
  if (pageContent) {
    pageContent.classList.add('page-turn');
    
    // After animation completes, navigate to new page
    setTimeout(() => {
      let destination;
      
      if (pageNumber === 0) {
        destination = 'index.html';
      } else {
        destination = `page${pageNumber}.html`;
      }
      
      window.location.href = destination;
    }, 300);
  } else {
    // If animation not supported, just navigate
    if (pageNumber === 0) {
      window.location.href = 'index.html';
    } else {
      window.location.href = `page${pageNumber}.html`;
    }
  }
}

// Navigation button setup
function setupNavigation() {
  // Get current page number from data attribute
  const pageContent = document.querySelector('.page-content');
  let currentPage = 0;
  
  if (pageContent && pageContent.dataset.page) {
    currentPage = parseInt(pageContent.dataset.page, 10);
  }
  
  // Set up previous button
  const prevButton = document.querySelector('.nav-button.prev');
  if (prevButton) {
    if (currentPage <= 1) {
      prevButton.classList.add('disabled');
    } else {
      prevButton.addEventListener('click', () => {
        goToPage(currentPage - 1);
      });
    }
  }
  
  // Set up next button
  const nextButton = document.querySelector('.nav-button.next');
  if (nextButton) {
    if (currentPage >= TOTAL_PAGES) {
      nextButton.classList.add('disabled');
    } else {
      nextButton.addEventListener('click', () => {
        goToPage(currentPage + 1);
      });
    }
  }
  
  // Set up start reading button (on cover page)
  const startReadingButton = document.querySelector('.start-reading');
  if (startReadingButton) {
    startReadingButton.addEventListener('click', () => {
      goToPage(1);
    });
  }
  
  // Update progress bar
  updateProgressBar(currentPage);
  
  // Add keyboard navigation
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight' && currentPage < TOTAL_PAGES) {
      goToPage(currentPage + 1);
    } else if (event.key === 'ArrowLeft' && currentPage > 1) {
      goToPage(currentPage - 1);
    }
  });
  
  // Add touch swipe navigation for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, false);
  
  document.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold && currentPage < TOTAL_PAGES) {
      // Swipe left to go forward
      goToPage(currentPage + 1);
    } else if (touchEndX > touchStartX + swipeThreshold && currentPage > 1) {
      // Swipe right to go back
      goToPage(currentPage - 1);
    }
  }
}

// Initialize navigation when the DOM is loaded
document.addEventListener('DOMContentLoaded', setupNavigation);

// Preload adjacent pages for smoother navigation
function preloadAdjacentPages() {
  const pageContent = document.querySelector('.page-content');
  let currentPage = 0;
  
  if (pageContent && pageContent.dataset.page) {
    currentPage = parseInt(pageContent.dataset.page, 10);
    
    // Preload next page if it exists
    if (currentPage < TOTAL_PAGES) {
      const nextPageLink = document.createElement('link');
      nextPageLink.rel = 'prefetch';
      nextPageLink.href = `page${currentPage + 1}.html`;
      document.head.appendChild(nextPageLink);
    }
    
    // Preload previous page if it exists
    if (currentPage > 1) {
      const prevPageLink = document.createElement('link');
      prevPageLink.rel = 'prefetch';
      prevPageLink.href = `page${currentPage - 1}.html`;
      document.head.appendChild(prevPageLink);
    }
  }
}

// Call preload function when page is fully loaded
window.addEventListener('load', preloadAdjacentPages);