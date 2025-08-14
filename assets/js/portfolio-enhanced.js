let allProjects = [];
let visibleCount = 3;
let currentFilter = "all";
let scrollY = 0;

// 포트폴리오 데이터 불러오기
fetch("assets/data/portfolio.json")
  .then((response) => response.json())
  .then((data) => {
    allProjects = data;
    renderProjects();
    setupCategoryFilter();
  });

// 포트폴리오 렌더링
function renderProjects() {
  const container = document.getElementById("portfolio-container");
  container.innerHTML = "";

  // 필터 적용
  let filtered =
    currentFilter === "all"
      ? allProjects
      : allProjects.filter(
          (item) => item.category.toLowerCase() === currentFilter
        );

  // 보여줄 포폴 slice
  const visibleProjects = filtered.slice(0, visibleCount);

  visibleProjects.forEach((item) => {
    const box = document.createElement("div");
    box.className = "work-card";
    box.innerHTML = `
      <img
        src="${item.thumbnail}"
        alt="${item.title}"
        class="work-img portfolio-modal-trigger"
        style="cursor:pointer;"
      />
      <h4 class="work-category">${item.category}</h4>
      <h3 class="work-title">${item.title}</h3>
      <p class="work-description">${item.description}</p>
      <a
        href="#"
        class="work-link"
        data-full="${item.thumbnail}"
      >
        See Details <span class="work-icon">&#8594;</span>
      </a>
    `;
    container.appendChild(box);
  });

  // 더보기 버튼 표시/숨김
  const seeMoreBtn = document.getElementById("see-more");
  if (filtered.length > visibleCount) {
    seeMoreBtn.style.display = "block";
  } else {
    seeMoreBtn.style.display = "none";
  }

  // 아무것도 없으면 빈 화면
  if (filtered.length === 0) {
    container.innerHTML = "";
  }

  // mixitup 초기화 (포트폴리오 컨테이너가 DOM에 있을 때만)
  if (window.mixitup && !container.classList.contains("mixitup-initialized")) {
    mixitup(container, {
      animation: {
        effects: "fade",
        duration: 300,
      },
      layout: {
        display: "grid",
      },
    });
    container.classList.add("mixitup-initialized");
  }
}

// 더보기 버튼 이벤트
document.getElementById("see-more").addEventListener("click", () => {
  visibleCount += 3;
  renderProjects();
});

// 카테고리 필터 이벤트
function setupCategoryFilter() {
  document.querySelectorAll(".work-item").forEach((item) => {
    item.addEventListener("click", function () {
      document
        .querySelectorAll(".work-item")
        .forEach((el) => el.classList.remove("active-work"));
      this.classList.add("active-work");
      currentFilter =
        this.dataset.filter === "all"
          ? "all"
          : this.dataset.filter.replace(".", "");
      visibleCount = 3;
      renderProjects();
    });
  });
}

// 팝업 기능
document.addEventListener("click", function (e) {
  // See Details 또는 아이콘 클릭 시
  let linkEl = null;
  if (e.target.classList.contains("work-link")) {
    linkEl = e.target;
  } else if (e.target.classList.contains("work-icon")) {
    linkEl = e.target.closest(".work-link");
  }
  if (linkEl) {
    e.preventDefault();
    const imgSrc = linkEl.getAttribute("data-full");
    showModal(imgSrc);
    return;
  }
  // 이미지 클릭 시
  if (e.target.classList.contains("portfolio-modal-trigger")) {
    e.preventDefault();
    const imgSrc = e.target.getAttribute("src");
    showModal(imgSrc);
    return;
  }
  // 모달 닫기
  if (e.target.id === "modal-close" || e.target.id === "portfolio-modal") {
    e.preventDefault();
    closeModal();
    return;
  }
});

// ESC 키로 모달 닫기
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    e.preventDefault();
    closeModal();
  }
});

function showModal(imgSrc) {
  scrollY = window.scrollY || window.pageYOffset;
  document.body.style.overflow = "hidden";

  const modal = document.getElementById("portfolio-modal");
  modal.classList.remove("hidden");
  modal.innerHTML = `
    <div class="modal-content" style="position:relative;">
      <button id="modal-close" style="
        position: absolute;
        top: 1rem;
        right: 1rem;
        width: 2.5rem;
        height: 2.5rem;
        font-size: 2rem;
        background: rgba(0,0,0,0.5);
        border-radius: 50%;
        border: none;
        color: #fff;
        cursor: pointer;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      ">&times;</button>
      <div class="modal-image-wrapper">
        <img id="modal-image" src="${imgSrc}" alt="Full View">
      </div>
    </div>
  `;
}

function closeModal() {
  const modal = document.getElementById("portfolio-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.innerHTML = "";
    document.body.style.overflow = "";
    window.scrollTo(0, scrollY); // 스크롤 위치 복원
  }
}
