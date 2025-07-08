// assets/js/portfolio.js
document.addEventListener('DOMContentLoaded', async () => {
  // 1) JSON 불러오기
  const resp = await fetch('./data/portfolio.json');
  if (!resp.ok) {
    console.error('portfolio.json not found:', resp.status);
    return;
  }
  const data = await resp.json();

  // 2) DOM 요소
  const listEl     = document.getElementById('portfolio-list');
  const btn        = document.getElementById('see-more-btn');
  const tpl        = document.getElementById('portfolio-item-tpl').content;
  const modal      = document.getElementById('portfolio-modal');
  const modalImg   = document.getElementById('modal-image');
  const closeBtn   = document.getElementById('modal-close');
  const backdrop   = modal.querySelector('.modal-backdrop');
  const body       = document.body;

  // 3) 로드 카운트 & 배치 크기
  let loadedCount = 0;
  const batchSize = 3;

  // 4) 카드 생성 함수
  function createCard(item) {
    const clone = tpl.cloneNode(true);
    const mix   = clone.querySelector('.mix');
    mix.dataset.id = item.id;

    clone.querySelector('.work-img').src         = item.thumbnail;
    clone.querySelector('.work-img').alt         = item.title;
    clone.querySelector('.work-category').textContent = item.category;
    clone.querySelector('.work-title').textContent    = item.title;
    clone.querySelector('.work-description').textContent = item.description;

    const link = clone.querySelector('.work-link');
    if (item.category === 'development') {
      link.href   = item.url;
      link.target = '_blank';
    } else {
      link.href = '#';
      link.addEventListener('click', e => {
        e.preventDefault();
        openModal(item.fullImage || item.thumbnail);
      });
    }
    return mix;
  }

  // 5) 하드코딩 카드에도 모달 바인딩
  listEl.querySelectorAll('.mix.artwork .work-link, .mix.design .work-link')
    .forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const card = e.currentTarget.closest('.mix');
        const thumb = card.querySelector('.work-img').src;
        openModal(thumb);
      });
    });

  // 6) 모달 열기/닫기
  function openModal(src) {
    modalImg.src = src;
    modal.classList.remove('hidden');
    body.classList.add('no-scroll');
  }
  function closeModal() {
    modal.classList.add('hidden');
    body.classList.remove('no-scroll');
  }
  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  // 7) See More 클릭 시 카드 렌더링
  function renderBatch() {
    const slice = data.slice(loadedCount, loadedCount + batchSize);
    if (slice.length === 0) {
      btn.classList.add('hidden');
      return;
    }

    slice.forEach((item, idx) => {
      const card = createCard(item);
      listEl.appendChild(card);

      // 애니메이션만 실행
      ScrollReveal().reveal(card, {
        origin: 'top',
        distance: '60px',
        duration: 800,
        delay: idx * 100,
        reset: true
      });
    });

    loadedCount += slice.length;
    if (loadedCount >= data.length) {
      btn.classList.add('hidden');
    }
  }

  btn.addEventListener('click', renderBatch);
});
