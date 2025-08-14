/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");
// Validate if constant exists
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav-link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");

  navMenu.classList.remove("show-menu");
};

navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== CHANGE BACKGROUND HEADER ====================*/
const scrollHeader = () => {
  const header = document.getElementById("header");
  if (this.scrollY >= 20) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
};
window.addEventListener("scroll", scrollHeader);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

const scrollActive = () => {
  const scrollY = window.pageYOffset;
  const headerHeight = document.getElementById("header").offsetHeight;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - headerHeight,
      sectionId = current.getAttribute("id"),
      sectionClass = document.querySelector(
        `.nav-menu a[href*="#${sectionId}"]`
      );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (sectionClass) sectionClass.classList.add("active-link");
    } else {
      if (sectionClass) sectionClass.classList.remove("active-link");
    }
  });
};
window.addEventListener("scroll", scrollActive);

/*==================== SCROLL ABOUT ANIMATION ====================*/
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".text-gradient").forEach((span) => {
  gsap.to(span, {
    backgroundSize: "100% 100%",
    ease: "none",
    scrollTrigger: {
      trigger: span,
      start: "top bottom",
      end: "top center",
      scrub: true,
    },
  });
});
/*==================== DARK LIGHT THEME ====================*/
window.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("light-theme");
      toggleBtn.classList.remove("ri-sun-line");
      toggleBtn.classList.add("ri-moon-line");
    } else {
      document.body.classList.remove("light-theme");
      toggleBtn.classList.add("ri-sun-line");
      toggleBtn.classList.remove("ri-moon-line");
    }

    localStorage.setItem("theme", theme);
  }

  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  toggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-theme");
    applyTheme(isLight ? "dark" : "light");
  });
});


/*==================== MIXITUP FILTER PORTFOLIO ====================*/
var mixer = mixitup(".work-container", {
  selectors: { target: ".mix" },
  animation: { duration: 300 },
});

/* Active work */
const linkWork = document.querySelectorAll(".work-item");
function activeWork(e) {
  linkWork.forEach((l) => l.classList.remove("active-work"));
  e.currentTarget.classList.add("active-work");
}
linkWork.forEach((l) => l.addEventListener("click", activeWork));

// ⭐️ 포트폴리오 모달
let lastScrollY = 0;

// work-link(Visual Project) 클릭 시
document.querySelectorAll('.work-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const imgSrc = this.getAttribute('data-full');
    if (!imgSrc) return;
    document.getElementById('modal-image').src = imgSrc;
    document.getElementById('portfolio-modal').classList.remove('hidden');
    lastScrollY = window.scrollY;
    document.body.classList.add('modal-open');
    document.body.style.top = `-${lastScrollY}px`;
  });
});
// work-img(이미지) 클릭 시
document.querySelectorAll('.work-img').forEach(img => {
  img.addEventListener('click', function() {
    const imgSrc = img.getAttribute('data-full') || img.src;
    document.getElementById('modal-image').src = imgSrc;
    document.getElementById('portfolio-modal').classList.remove('hidden');
    lastScrollY = window.scrollY;
    document.body.classList.add('modal-open');
    document.body.style.top = `-${lastScrollY}px`;
  });
});

function closeModal() {
  document.getElementById('portfolio-modal').classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.body.style.top = '';
  window.scrollTo(0, lastScrollY || 0);
}
// 닫기 버튼
document.getElementById('modal-close').onclick = closeModal;
// ESC
document.addEventListener('keydown', function(e){
  if (e.key === 'Escape') closeModal();
});
// 바깥(배경) 클릭 닫기
document.getElementById('portfolio-modal').addEventListener('click', function(e){
  if (e.target === this) closeModal();
});


/*==================== EMAIL JS ====================*/
const contactForm = document.getElementById("contact-form"),
  contactName = document.getElementById("contact-name"),
  contactEmail = document.getElementById("contact-email"),
  contactMessage = document.getElementById("contact-message"),
  message = document.getElementById("message");

const sendEmail = (e) => {
  e.preventDefault();

  if (
    contactName.value === "" ||
    contactEmail.value === "" ||
    contactMessage.value === ""
  ) {
    message.textContent = "Please fill in all fields.";
    message.style.color = "red";

    setTimeout(() => {
      message.textContent = "";
    }, 3000);
    return;
  }

  emailjs
    .sendForm(
      "service_6hvnwx7",
      "template_mhciy9s",
      "#contact-form",
      "rpnwvGuuV6_v-ikyL"
    )
    .then(
      () => {
        message.textContent = "Your message has been sent successfully!";
        message.style.color = "green";

        setTimeout(() => {
          message.textContent = "";
        }, 5000);
      },
      (error) => {
        message.textContent = "Failed to send your message. Please try again.";
        message.style.color = "red";
        console.error("Error sending email:", error);
      }
    );

  contactName.value = "";
  contactEmail.value = "";
  contactMessage.value = "";
};

contactForm.addEventListener("submit", sendEmail);

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: true,
});

sr.reveal(`.home-data`);
sr.reveal(`.home-img-wrapper`, { delay: 500 });
sr.reveal(`.home-social`, { delay: 600 });
sr.reveal(`.services-card, .mix`, { interval: 100 });
sr.reveal(`.skills-developer, .resume-left, .contact-group`, {
  origin: "left",
});
sr.reveal(`.skills-designer, .resume-right, .contact-form`, {
  origin: "right",
});