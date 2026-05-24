/* ═══════════════════════════════════════════════════════════
   HIGHLAND COW SIGNS CO. — MAIN JS
   Cart · Mobile Menu · Scroll Animations · Interactions
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── CART STATE ────────────────────────────────────────────── */
const Cart = (() => {
  const STORAGE_KEY = 'hcs-cart';

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }
  function save(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  let items = load();

  function add(product) {
    const existing = items.find(i => i.id === product.id && i.size === product.size);
    if (existing) {
      existing.qty += product.qty;
    } else {
      items.push({ ...product });
    }
    save(items);
    render();
    updateBadge();
    showToast(`${product.name} added to bag`);
    openDrawer();
  }

  function remove(id, size) {
    items = items.filter(i => !(i.id === id && i.size === size));
    save(items);
    render();
    updateBadge();
  }

  function total() {
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function count() {
    return items.reduce((sum, i) => sum + i.qty, 0);
  }

  function render() {
    const body = document.getElementById('cart-body');
    if (!body) return;

    if (items.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-1.684 2.032-3.547 2.032-5.25a4.5 4.5 0 00-4.5-4.5H7.5m-3 1.5h12.75"/>
          </svg>
          <p>Your bag is empty</p>
          <a href="collections.html" class="btn btn-dark btn-sm" style="margin-top:16px">Start Shopping</a>
        </div>`;
    } else {
      body.innerHTML = items.map(item => `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.name}" loading="lazy">
          <div>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-meta">${item.size ? item.size + ' · ' : ''}Qty: ${item.qty}</div>
            <button class="cart-remove" onclick="Cart.remove('${item.id}','${item.size}')">Remove</button>
          </div>
          <div class="cart-item-price">£${(item.price * item.qty).toFixed(2)}</div>
        </div>`).join('');
    }

    const footer = document.getElementById('cart-footer');
    if (footer) {
      footer.innerHTML = items.length ? `
        <div class="cart-total">
          <span>Total</span>
          <span>£${total().toFixed(2)}</span>
        </div>
        <a href="#" class="btn btn-primary btn-block">Checkout</a>
        <p class="cart-note">Shipping calculated at checkout · Free over £35</p>` : '';
    }
  }

  return { add, remove, total, count, render, load };
})();

/* ─── CART DRAWER ───────────────────────────────────────────── */
function openDrawer() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function updateBadge() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  const n = Cart.count();
  badge.textContent = n;
  badge.classList.toggle('visible', n > 0);
}

/* ─── MOBILE MENU ───────────────────────────────────────────── */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu      = document.getElementById('mobile-menu');
  if (!hamburger || !menu) return;

  hamburger.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    })
  );
}

/* ─── SCROLL ANIMATIONS ─────────────────────────────────────── */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
}

/* ─── TOAST ─────────────────────────────────────────────────── */
let toastTimer;
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">✦</span><span id="toast-msg"></span>`;
    document.body.appendChild(toast);
  }
  document.getElementById('toast-msg').textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ─── STICKY HEADER SHADOW ──────────────────────────────────── */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const observer = new IntersectionObserver(
    ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
    { rootMargin: '-1px 0px 0px 0px', threshold: 0 }
  );
  const sentinel = document.createElement('div');
  document.body.prepend(sentinel);
  observer.observe(sentinel);
}

/* ─── ACTIVE NAV LINK ───────────────────────────────────────── */
function initActiveNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.primary-nav a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href')?.split('/').pop();
    if (href === path) a.classList.add('active');
  });
}

/* ─── COLLECTIONS FILTER ────────────────────────────────────── */
function initCollectionsFilter() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  // Filter checkboxes
  document.querySelectorAll('.filter-option input').forEach(cb => {
    cb.addEventListener('change', () => applyFilters());
  });

  // Sort select
  const sort = document.getElementById('sort-select');
  if (sort) sort.addEventListener('change', () => applyFilters());

  function applyFilters() {
    const checkedCats = [...document.querySelectorAll('.filter-option input:checked')]
      .map(cb => cb.dataset.cat);
    const sortVal = document.getElementById('sort-select')?.value || 'featured';

    let cards = [...grid.querySelectorAll('.product-card')];

    // Filter
    cards.forEach(card => {
      const cat = card.dataset.category;
      const show = checkedCats.length === 0 || checkedCats.includes(cat);
      card.style.display = show ? '' : 'none';
    });

    // Sort
    const visible = cards.filter(c => c.style.display !== 'none');
    visible.sort((a, b) => {
      if (sortVal === 'price-asc')  return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
      if (sortVal === 'price-desc') return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
      if (sortVal === 'name-asc')   return a.dataset.name?.localeCompare(b.dataset.name);
      return parseInt(a.dataset.order || 0) - parseInt(b.dataset.order || 0);
    });
    visible.forEach(c => grid.appendChild(c));

    // Update count
    const countEl = document.getElementById('product-count');
    if (countEl) countEl.textContent = `${visible.length} products`;
  }

  // Mobile filter toggle
  document.getElementById('filter-toggle')?.addEventListener('click', () => {
    document.querySelector('.filter-sidebar')?.classList.toggle('open');
  });
}

/* ─── PRODUCT GALLERY ───────────────────────────────────────── */
function initProductGallery() {
  const mainImg  = document.getElementById('gallery-main-img');
  const thumbs   = document.querySelectorAll('.gallery-thumb');
  if (!mainImg || !thumbs.length) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      mainImg.src = thumb.querySelector('img').src;
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
}

/* ─── QUANTITY CONTROL ──────────────────────────────────────── */
function initQtyControl() {
  document.querySelectorAll('.qty-control').forEach(ctrl => {
    const input = ctrl.querySelector('.qty-num');
    ctrl.querySelector('.qty-minus')?.addEventListener('click', () => {
      const val = parseInt(input.value);
      if (val > 1) input.value = val - 1;
    });
    ctrl.querySelector('.qty-plus')?.addEventListener('click', () => {
      input.value = parseInt(input.value) + 1;
    });
  });
}

/* ─── SIZE SELECTOR ─────────────────────────────────────────── */
function initSizeSelector() {
  document.querySelectorAll('.size-options').forEach(group => {
    group.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });
}

/* ─── ACCORDION ─────────────────────────────────────────────── */
function initAccordion() {
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const body = btn.nextElementSibling;
      const open = btn.classList.toggle('open');
      body.classList.toggle('open', open);
    });
  });
}

/* ─── PERSONALISED PREVIEW ──────────────────────────────────── */
function initPersonalisedPreview() {
  const line1Input = document.getElementById('preview-line1');
  const line2Input = document.getElementById('preview-line2');
  const canvasLine1 = document.getElementById('sign-line1');
  const canvasLine2 = document.getElementById('sign-line2');
  if (!line1Input) return;

  function updatePreview() {
    if (canvasLine1) canvasLine1.textContent = line1Input.value || 'Your Name Here';
    if (canvasLine2 && line2Input) canvasLine2.textContent = line2Input.value || 'Est. 2024';
  }
  line1Input.addEventListener('input', updatePreview);
  if (line2Input) line2Input.addEventListener('input', updatePreview);

  // Style swatches
  document.querySelectorAll('.style-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.style-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const canvas = document.querySelector('.sign-canvas');
      if (canvas) {
        canvas.style.background = swatch.dataset.bg || '';
        canvas.style.borderColor = swatch.dataset.border || '';
      }
    });
  });
}

/* ─── ADD TO CART BUTTONS ───────────────────────────────────── */
function initAddToCart() {
  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('[data-product-id]') || btn.closest('.product-card');
      const size = card?.querySelector('.size-btn.active')?.textContent || '';
      const qty  = parseInt(card?.querySelector('.qty-num')?.value || 1);
      Cart.add({
        id:    btn.dataset.addCart || card?.dataset.productId || String(Math.random()),
        name:  card?.dataset.name  || btn.dataset.name  || 'Highland Cow Sign',
        price: parseFloat(card?.dataset.price || btn.dataset.price || 14.99),
        img:   card?.querySelector('img')?.src || '',
        size, qty
      });
    });
  });
}

/* ─── NEWSLETTER ────────────────────────────────────────────── */
function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input?.value) {
        showToast('Thanks! You\'re signed up for Highland news 🐄');
        input.value = '';
      }
    });
  });
}

/* ─── CONTACT FORM ──────────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Message sent — we\'ll be in touch soon!');
    form.reset();
  });
}

/* ─── INIT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  Cart.render();
  updateBadge();

  initMobileMenu();
  initReveal();
  initStickyHeader();
  initActiveNav();
  initCollectionsFilter();
  initProductGallery();
  initQtyControl();
  initSizeSelector();
  initAccordion();
  initPersonalisedPreview();
  initAddToCart();
  initNewsletter();
  initContactForm();

  // Cart drawer toggle
  document.getElementById('cart-btn')?.addEventListener('click', openDrawer);
  document.getElementById('cart-overlay')?.addEventListener('click', closeDrawer);
  document.querySelector('.cart-close')?.addEventListener('click', closeDrawer);
});

// Expose globals needed by inline handlers
window.Cart = Cart;
window.closeDrawer = closeDrawer;
