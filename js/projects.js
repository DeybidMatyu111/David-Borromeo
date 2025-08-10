// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const projectsGrid = document.getElementById("card-grid");
  const galleryTitle = document.getElementById("card-title");
  const navLinks = document.querySelectorAll(".dropdown-menu a");

  // Current category (default to 'all')
  let currentCategory = "all";

  // Initialize the gallery
  renderProjects(currentCategory);

  // Set up navigation event listeners
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      currentCategory = this.dataset.category;
      updateActiveNavLink();
      renderProjects(currentCategory);
      updateGalleryTitle();
    });
  });

  // Render projects based on category
  function renderProjects(category) {
    // Clear existing projects
    projectsGrid.innerHTML = "";

    // Get projects to display
    let projectsToDisplay = [];

    if (category === "all") {
      // Combine all projects
      projectsToDisplay = [
        ...projectsData.web,
        ...projectsData.uiux,
        ...projectsData.graphic,
      ];
    } else {
      // Get specific category
      projectsToDisplay = projectsData[category] || [];
    }

    // Create and append project cards
    projectsToDisplay.forEach((project) => {
      const card = createProjectCard(project);
      projectsGrid.appendChild(card);
    });
  }

  // Create individual project card
  function createProjectCard(project) {
    const cardItem = document.createElement("div");
    cardItem.className = "card-item";
    cardItem.dataset.category = project.category;

    cardItem.innerHTML = `
            <a href="${project.link}">
                <img class="card-image" src="${project.image}" alt="${
      project.title
    }">
                <div class="card-info">
                    <h3 class="card-title">${project.title}</h3>
                    <span>${project.tags.join(", ")}</span>
                    <p class="card-description">${project.description}</p>
                </div>
            </a>
        `;

    return cardItem;
  }

  // Update active navigation link
  function updateActiveNavLink() {
    navLinks.forEach((link) => {
      if (link.dataset.category === currentCategory) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Update gallery title based on category
  function updateGalleryTitle() {
    let title = "ALL PROJECTS";

    switch (currentCategory) {
      case "web":
        title = "WEB DESIGN";
        break;
      case "uiux":
        title = "UI/UX DESIGN";
        break;
      case "graphic":
        title = "GRAPHIC DESIGN";
        break;
    }

    galleryTitle.textContent = title;
  }
});
