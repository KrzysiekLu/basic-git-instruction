"use strict";

const navbar = document.querySelector(".navbar");
const btnOpenNavbar = document.querySelector(".btn-open-navbar");
const sections = document.querySelectorAll(".section");
const sectionsContent = document.querySelectorAll(".section__content");
const btnMoveDown = document.querySelector(".main-header__btn-move-down");
const btnChangeSectionNext = document.querySelector(".btn-next");
const btnChangeSectionPrev = document.querySelector(".btn-prev");
const changeSectionBtns = document.querySelectorAll(".btn-change-section");

//Scroll to first section
btnMoveDown.addEventListener("click", () => {
  document.querySelector(".section-1").scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
});

// Open Navbar
const openNavbar = () => {
  navbar.classList.toggle("show-navbar");
  navbar.classList.contains("show-navbar")
    ? (btnOpenNavbar.textContent = "Close Menu")
    : (btnOpenNavbar.textContent = "Open Menu");
};
btnOpenNavbar.addEventListener("click", openNavbar);

// observer;
const options = {
  threshold: 0.5,
  rootMargin: "100px",
};

// Fade in animation observer
let currentSection = -1;
const sectionsObserver = new IntersectionObserver((entries) => {
  let [watchedSection] = entries;

  if (watchedSection.isIntersecting)
    currentSection = watchedSection.target.dataset.index;
  console.log(currentSection);

  entries.forEach((entry) => {
    entry.target.children[0].classList.toggle(
      "show-section-content",
      entry.isIntersecting
    );
  });
  showHideChangeSectionBtns();
}, options);

sections.forEach((section) => {
  sectionsObserver.observe(section);
});

const changeSection = (e) => {
  if (
    e.target.parentElement.classList.contains("btn-next") &&
    currentSection != 10
  ) {
    currentSection++;
    document
      .querySelector(`.section-${currentSection}`)
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }
  if (
    e.target.parentElement.classList.contains("btn-prev") &&
    currentSection != -1
  ) {
    currentSection--;
    document
      .querySelector(`.section-${currentSection}`)
      .scrollIntoView({ behavior: "smooth", block: "center" });
  }
};
changeSectionBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    changeSection(e);
  })
);

//hide buttons

const showHideChangeSectionBtns = () => {
  +currentSection >= 0
    ? changeSectionBtns.forEach((btn) => (btn.style.display = "block"))
    : changeSectionBtns.forEach((btn) => (btn.style.display = "none"));
};
