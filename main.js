const nav = document.getElementById("navbar");
const navPanel = document.getElementById("nav-panel");
const navToggle = document.getElementById("nav-toggle");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50 && nav) {
    nav.classList.remove("bg-transparent", "py-6");
    nav.classList.add("backdrop-blur-md", "py-4", "shadow-lg");
  } else if (nav) {
    nav.classList.remove(
      "bg-black/85",
      "backdrop-blur-md",
      "py-4",
      "shadow-lg",
    );
    nav.classList.add("bg-transparent", "py-6");
  }
});

if (navToggle && navPanel) {
  navToggle.addEventListener("click", function (event) {
    event.stopPropagation();

    navPanel.classList.toggle("hidden");
    navPanel.classList.toggle("flex");

    const spans = navToggle.querySelectorAll("span");
    const isOpen = !navPanel.classList.contains("hidden");

    if (isOpen) {
      spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });
}

document.addEventListener("click", function (event) {
  if (
    navPanel &&
    !navPanel.classList.contains("hidden") &&
    !nav.contains(event.target)
  ) {
    navPanel.classList.add("hidden");
    navPanel.classList.remove("flex");

    const spans = navToggle.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  }
});

const path = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("nav a, #nav-panel a").forEach((link) => {
  if (link.getAttribute("href") === path) {
    link.classList.add("text-gray-400");
  }
});

document.querySelectorAll(".faq-entry").forEach((entry) => {
  const button = entry.querySelector(".faq-item");
  const answer = entry.querySelector(".faq-answer");
  const icon = entry.querySelector("[data-plus]");

  if (button) {
    button.addEventListener("click", function () {
      const isOpen = entry.classList.contains("is-open");

      document.querySelectorAll(".faq-entry").forEach((otherEntry) => {
        otherEntry.classList.remove("is-open");
        const otherBtn = otherEntry.querySelector(".faq-item");
        const otherAns = otherEntry.querySelector(".faq-answer");
        const otherIcon = otherEntry.querySelector("[data-plus]");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        if (otherAns) otherAns.style.maxHeight = "0px";
        if (otherIcon) otherIcon.textContent = "+";
      });

      if (!isOpen) {
        entry.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        if (answer) {
          answer.style.maxHeight = `${answer.scrollHeight}px`;
        }
        if (icon) {
          icon.textContent = "−";
        }
      }
    });
  }
});

const gymSlides = document.querySelectorAll(".gym-slide");
const gymDots = document.querySelectorAll(".gym-dot");
let currentSlide = 0;

function showGymSlide(index) {
  gymSlides.forEach((slide, i) => {
    slide.classList.toggle("opacity-100", i === index);
    slide.classList.toggle("opacity-0", i !== index);
    slide.classList.toggle("z-10", i === index);
    slide.classList.toggle("z-0", i !== index);
  });
  gymDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
    dot.classList.toggle("bg-white", i === index);
    dot.classList.toggle("bg-white/40", i !== index);
  });
  currentSlide = index;
}

gymDots.forEach((dot, index) => {
  dot.addEventListener("click", () => showGymSlide(index));
});

if (gymSlides.length > 0) {
  setInterval(() => {
    let nextSlide = (currentSlide + 1) % gymSlides.length;
    showGymSlide(nextSlide);
  }, 5000);
}

const teamCards = document.querySelectorAll("[data-team-card]");
const modal = document.getElementById("team-modal");

if (modal && teamCards.length > 0) {
  const modalCloseBtn = modal.querySelector("[data-team-close]");
  const modalPrevBtn = modal.querySelector("[data-team-prev]");
  const modalNextBtn = modal.querySelector("[data-team-next]");
  const modalImage = document.getElementById("modal-image");
  const modalName = document.getElementById("modal-name");
  const modalBio = document.getElementById("modal-bio");

  const teamMembers = Array.from(teamCards).map((card) => card.dataset);
  let currentIndex = 0;

  const updateModalContent = (index) => {
    const member = teamMembers[index];
    modalImage.src = member.image;
    modalImage.alt = member.name;
    modalName.textContent = member.name;
    modalBio.textContent = member.bio;
  };

  const openModal = (index) => {
    currentIndex = index;
    updateModalContent(currentIndex);
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.style.overflow = "";
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % teamMembers.length;
    updateModalContent(currentIndex);
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + teamMembers.length) % teamMembers.length;
    updateModalContent(currentIndex);
  };

  teamCards.forEach((card, index) => {
    card.addEventListener("click", () => openModal(index));
  });

  modalCloseBtn.addEventListener("click", closeModal);
  modalNextBtn.addEventListener("click", showNext);
  modalPrevBtn.addEventListener("click", showPrev);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("hidden")) {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    }
  });
}
