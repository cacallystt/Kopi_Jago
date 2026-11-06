const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false');
}));

// Reveal content as it enters the viewport.
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Menu category filters.
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.filter.active')?.classList.remove('active');
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.product-card').forEach(card => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.hidden = !show;
  });
}));

const modal = document.getElementById('order-modal');
const selectedProduct = document.getElementById('selected-product');
const orderNote = document.getElementById('order-note');
let currentProduct = '';
function openOrder(product) {
  currentProduct = product;
  selectedProduct.textContent = product;
  orderNote.value = '';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.querySelector('.modal-close').focus();
}
function closeOrder() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.querySelectorAll('.quick-add').forEach(button => button.addEventListener('click', () => openOrder(button.dataset.product)));
document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeOrder));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('open')) closeOrder(); });
document.getElementById('confirm-order').addEventListener('click', () => {
  const phone = '6281234567890'; // Ganti dengan nomor WhatsApp resmi Kopi Jago.
  const note = orderNote.value.trim();
  const message = `Halo Kopi Jago! Saya ingin memesan ${currentProduct}.${note ? ` Catatan: ${note}.` : ''} Mohon info ketersediaan dan lokasi cart hari ini. Terima kasih!`;
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  closeOrder();
});

// Simple collaboration CTA feedback; update the WhatsApp number before publishing.
document.getElementById('year').textContent = new Date().getFullYear();
