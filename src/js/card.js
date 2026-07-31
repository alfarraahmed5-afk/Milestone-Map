/**
 * Trading card interaction system.
 * Tap 1: card enlarges to modal overlay
 * Tap 2: card flips to reveal story side
 * Tap 3 / tap outside / Escape: dismiss
 */

let activeCard = null;
let flipState = false; // false = front, true = back (story)

export function openCard(cp) {
  if (activeCard) closeCard();
  activeCard = cp;
  flipState = false;
  renderModal(cp);
}

export function closeCard() {
  const overlay = document.getElementById('card-overlay');
  if (overlay) {
    overlay.classList.add('dismissing');
    setTimeout(() => overlay.remove(), 300);
  }
  activeCard = null;
  flipState = false;
}

function renderModal(cp) {
  const overlay = document.createElement('div');
  overlay.id = 'card-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', `${cp.name} trading card`);

  // Tap outside to close
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeCard();
  });

  const cardEl = document.createElement('div');
  cardEl.className = 'card-modal';

  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner';

  // Front face
  const front = document.createElement('div');
  front.className = 'card-face card-front';
  front.innerHTML = `
    <div class="card-frame">
      <div class="card-art">
        ${cp.card.front.image
          ? `<img src="${cp.card.front.image}" alt="${cp.name}" />`
          : `<div class="card-art-placeholder"><span>${cp.name}</span></div>`}
      </div>
      <div class="card-title">${cp.name}</div>
      <div class="card-subtitle">${cp.country} · ${cp.km} km</div>
      <div class="card-hint">Tap to reveal story</div>
    </div>`;

  // Back face
  const back = document.createElement('div');
  back.className = 'card-face card-back';
  back.innerHTML = `
    <div class="card-frame card-frame-back">
      <div class="card-back-title">${cp.name}</div>
      <div class="card-story">${cp.card.back.story}</div>
      <div class="card-fact-label">Did you know?</div>
      <div class="card-fact">${cp.card.back.fact}</div>
      <div class="card-hint">Tap to close</div>
    </div>`;

  cardInner.appendChild(front);
  cardInner.appendChild(back);
  cardEl.appendChild(cardInner);
  overlay.appendChild(cardEl);
  document.body.appendChild(overlay);

  // Trigger entrance animation on next frame
  requestAnimationFrame(() => overlay.classList.add('visible'));

  // Card tap: first flip, second close
  cardEl.addEventListener('click', () => {
    if (!flipState) {
      flipState = true;
      cardInner.classList.add('flipped');
    } else {
      closeCard();
    }
  });

  // Keyboard: Escape closes, Enter flips
  const onKey = e => {
    if (e.key === 'Escape') { closeCard(); document.removeEventListener('keydown', onKey); }
    if (e.key === 'Enter') cardEl.click();
  };
  document.addEventListener('keydown', onKey);
}
