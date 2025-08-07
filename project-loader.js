document.addEventListener('DOMContentLoaded', function() {
  // Get project ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  
  if (!projectId || !projectsData[projectId]) {
    window.location.href = '/projects.html'; // Redirect if invalid
    return;
  }

  const project = projectsData[projectId];
  
  // Load content into template
  document.title = `${project.title} | Your Portfolio`;
  
  // Hero Section
  document.querySelector('.cover-photo').src = `/images/${projectId}-cover.jpg`;
  document.querySelector('.content h2').textContent = project.title;
  document.querySelector('.content small').textContent = 
    `${project.meta.type} | ${project.meta.year}`;
  document.querySelector('.content p').textContent = project.meta.description;
  
  // Details Grid
  const detailsGrid = document.querySelector('.details-grid');
  detailsGrid.innerHTML = project.details.map(item => `
    <div class="detail-item">
      <h6>${item.label}</h6>
      <p>${item.value}</p>
    </div>
  `).join('');

  // Problem Section
  document.querySelector('.problem h2').textContent = project.sections.problem.title;
  document.querySelector('.problem p').textContent = project.sections.problem.content;

  // Comparison Section
  const comparison = project.sections.comparison;
  document.querySelector('.comparison h2').textContent = comparison.title;
  document.querySelector('.comparison p').textContent = comparison.description;
  document.querySelector('.image-before').src = comparison.images.before;
  document.querySelector('.image-after').src = comparison.images.after;

  // Gallery Section
  const galleryGrid = document.querySelector('.gallery-grid');
  galleryGrid.innerHTML = project.sections.gallery.map((item, index) => `
    <div class="gallery-item" data-index="${index}">
      <img src="${item.image}" alt="${item.description}" class="gallery-image">
      <div class="image-overlay">
        <p class="image-description">${item.description}</p>
        <i class="fas fa-expand overlay-icon"></i>
      </div>
    </div>
  `).join('');

  // Add Figma Prototype Section after gallery
  const prototypeSection = document.createElement('section');
  prototypeSection.className = 'prototype';
  prototypeSection.innerHTML = `
    <div class="container">
      <h2>EXPLORE</h2>
      <div class="content">
        <h3>View Figma Prototype</h3>
        <p>Explore clickable screens, animations, and design iterations.</p>
      </div>
      <div>
        <a href="${project.sections.prototype?.link || '#'}" class="secondary-btn" target="_blank">
          Open Figma Prototype 
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" 
               class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right">
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </a>
      </div>
    </div>
  `;
  
  // Insert after gallery section
  const gallerySection = document.querySelector('.gallery');
  gallerySection.insertAdjacentElement('afterend', prototypeSection);

  // Initialize all interactive elements
  initLightbox();
  initImageComparison();
});

function initImageComparison() {
  const container = document.querySelector(".image-container");
  const beforeImg = document.querySelector(".image-before");
  const handle = document.querySelector(".slider-handle");
  let isDragging = false;

  // Set initial position (50%)
  beforeImg.style.width = "50%";
  handle.style.left = "50%";

  function moveSlider(e) {
    if (!isDragging) return;

    const containerRect = container.getBoundingClientRect();
    let xPos = e.type.includes("touch") ? e.touches[0].clientX - containerRect.left : e.clientX - containerRect.left;
    const percent = Math.max(0, Math.min((xPos / containerRect.width) * 100, 100));

    beforeImg.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;
  }

  // Mouse events
  handle.addEventListener("mousedown", () => {
    isDragging = true;
    handle.style.transition = "none";
  });

  // Touch events
  handle.addEventListener("touchstart", () => {
    isDragging = true;
    handle.style.transition = "none";
  }, { passive: true });

  function stopDragging() {
    isDragging = false;
    handle.style.transition = "left 0.1s ease";
  }

  window.addEventListener("mouseup", stopDragging);
  window.addEventListener("touchend", stopDragging, { passive: true });
  window.addEventListener("mousemove", moveSlider);
  window.addEventListener("touchmove", moveSlider, { passive: false });
}

function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const captionText = document.getElementById('caption');
  const closeBtn = document.querySelector('.close-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  let currentIndex = 0;
  const images = [];
  const captions = [];

  galleryItems.forEach((item, index) => {
    const img = item.querySelector('.gallery-image');
    const desc = item.querySelector('.image-description');

    images.push(img.src);
    captions.push(desc.textContent);

    item.addEventListener('click', () => {
      currentIndex = index;
      updateLightbox();
      lightbox.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  function updateLightbox() {
    lightboxImg.src = images[currentIndex];
    captionText.textContent = captions[currentIndex];
  }

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
      switch(e.key) {
        case 'Escape':
          lightbox.style.display = 'none';
          document.body.style.overflow = 'auto';
          break;
        case 'ArrowLeft':
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          updateLightbox();
          break;
        case 'ArrowRight':
          currentIndex = (currentIndex + 1) % images.length;
          updateLightbox();
          break;
      }
    }
  });
}