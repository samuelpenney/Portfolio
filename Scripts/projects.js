const projectDialog = document.querySelector(".project-dialog");
const projectCards = document.querySelectorAll(".project-card");
const dialogTitle = document.querySelector("#project-dialog-title");
const dialogDescription = document.querySelector(".dialog-description");
const dialogSkills = document.querySelector(".dialog-skills");
const dialogGallery = document.querySelector(".dialog-gallery");
const dialogGithub = document.querySelector(".dialog-github");
const dialogClose = document.querySelector(".dialog-close");

projectCards.forEach((card) => {
  card.querySelector(".project-trigger").addEventListener("click", () => {
    dialogTitle.textContent = card.dataset.title;
    dialogDescription.textContent = card.dataset.description;
    dialogGithub.href = card.dataset.github;
    dialogSkills.replaceChildren();
    dialogGallery.replaceChildren();

    card.dataset.skills.split(",").forEach((skill) => {
      const skillTag = document.createElement("span");
      skillTag.textContent = skill.trim();
      dialogSkills.appendChild(skillTag);
    });

    card.dataset.gallery.split(",").forEach((imagePath) => {
      const image = document.createElement("img");
      image.src = imagePath;
      image.alt = `${card.dataset.title} project detail`;
      dialogGallery.appendChild(image);
    });

    projectDialog.showModal();
  });
});

dialogClose.addEventListener("click", () => projectDialog.close());

projectDialog.addEventListener("click", (event) => {
  if (event.target === projectDialog) {
    projectDialog.close();
  }
});
