//sidebar
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");

    // Prevent scrolling when sidebar is open
    if (sidebar.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  overlay.addEventListener("click", function () {
    hamburger.classList.remove("active");
    sidebar.classList.remove("active");
    this.classList.remove("active");
    document.body.style.overflow = "";
  });
});

//dropdown
document.addEventListener('DOMContentLoaded', function() {
  const dropdown = document.querySelector('.dropdown');
  const dropbtn = document.querySelector('.dropbtn');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  
  // Toggle menu on button click (mobile)
  dropbtn.addEventListener('click', function(e) {
    if (window.innerWidth < 992) {
      e.stopPropagation(); // Prevent event from reaching document
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      dropdownMenu.classList.toggle('show');
    }
  });
  
  // Keep menu open when clicking inside (mobile)
  dropdownMenu.addEventListener('click', function(e) {
    if (window.innerWidth < 992) {
      e.stopPropagation(); // Prevent event from reaching document
      
      // If clicking a category link
      if (e.target.tagName === 'A') {
        e.preventDefault();
        const category = e.target.dataset.category;
        
        // Your category selection logic here
        console.log('Selected category:', category);
        // filterProjects(category);
        
        // Close menu after selection
        dropdownMenu.classList.remove('show');
        dropbtn.setAttribute('aria-expanded', 'false');
      }
    }
  });
  
  // Close menu when clicking outside (mobile)
  document.addEventListener('click', function() {
    if (window.innerWidth < 992 && dropdownMenu.classList.contains('show')) {
      dropdownMenu.classList.remove('show');
      dropbtn.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Desktop hover behavior
  dropdown.addEventListener('mouseenter', function() {
    if (window.innerWidth >= 992) {
      dropdownMenu.classList.add('show');
      dropbtn.setAttribute('aria-expanded', 'true');
    }
  });
  
  dropdown.addEventListener('mouseleave', function() {
    if (window.innerWidth >= 992) {
      dropdownMenu.classList.remove('show');
      dropbtn.setAttribute('aria-expanded', 'false');
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".image-container");
  const beforeImg = document.querySelector(".image-before");
  const handle = document.querySelector(".slider-handle");
  let isDragging = false;

  // Set initial position (50%)
  function initSlider() {
    beforeImg.style.width = "50%";
    handle.style.left = "50%";
  }

  // Handle slider movement
  function moveSlider(e) {
    if (!isDragging) return;

    const containerRect = container.getBoundingClientRect();
    let xPos;

    // Check event type (touch or mouse)
    if (e.type.includes("touch")) {
      xPos = e.touches[0].clientX - containerRect.left;
    } else {
      xPos = e.clientX - containerRect.left;
    }

    const percent = Math.max(0, Math.min((xPos / containerRect.width) * 100, 100));

    beforeImg.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;
  }

  handle.addEventListener("mousedown", () => {
    isDragging = true;
    handle.style.transition = "none"; // Disable transition during drag
  });

  handle.addEventListener("touchstart", () => {
    isDragging = true;
    handle.style.transition = "none";
  }, { passive: true });

  function stopDragging() {
    isDragging = false;
    handle.style.transition = "left 0.1s ease"; // Smooth transition after release
  }

  window.addEventListener("mouseup", stopDragging);
  window.addEventListener("touchend", stopDragging, { passive: true });

  window.addEventListener("mousemove", moveSlider);
  window.addEventListener("touchmove", moveSlider, { passive: false });

  initSlider();

  window.addEventListener("resize", initSlider);
});

// Dark mode toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
    }
    
    // Check for system preference
    if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
});

// Dark mode toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle1');
    const htmlElement = document.documentElement;
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
    }
    
    // Check for system preference
    if (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlElement.setAttribute('data-theme', 'dark');
        darkModeToggle.checked = true;
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
});

        const form = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const submitBtn = document.getElementById('submitBtn');
        const emailError = document.getElementById('emailError');
        const successMessage = document.getElementById('successMessage');

        // Check if all fields are filled and valid
        function checkForm() {
            const isNameValid = nameInput.value.trim() !== '';
            const isEmailValid = validateEmail(emailInput.value);
            const isMessageValid = messageInput.value.trim() !== '';

            submitBtn.disabled = !(isNameValid && isEmailValid && isMessageValid);
        }

        // Basic email validation (checks for @ and .)
        function validateEmail(email) {
            const re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        // Real-time validation
        nameInput.addEventListener('input', checkForm);
        emailInput.addEventListener('input', function() {
            if (!validateEmail(emailInput.value)) {
                emailError.textContent = "Please enter a valid email address (e.g., user@example.com)";
            } else {
                emailError.textContent = "";
            }
            checkForm();
        });
        messageInput.addEventListener('input', checkForm);

        // Formspree submission handling
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.value = "Sending...";
            const loadingSpan = document.createElement('span');
            loadingSpan.className = 'loading';
            submitBtn.appendChild(loadingSpan);
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    successMessage.style.display = 'block';
                    form.reset();
                    submitBtn.disabled = true;
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                alert('There was a problem sending your message. Please try again later.');
                console.error('Error:', error);
            } finally {
                // Reset button state
                submitBtn.value = "Submit";
                submitBtn.removeChild(loadingSpan);
                checkForm(); // Re-enable if form wasn't cleared
            }
        });




