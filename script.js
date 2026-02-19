const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-nav');
const openLogin = document.getElementById('openLogin');
const closeLogin = document.getElementById('closeLogin');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));

openLogin?.addEventListener('click', () => {
  loginModal.style.display = 'flex';
  loginModal.setAttribute('aria-hidden', 'false');
});

closeLogin?.addEventListener('click', () => {
  loginModal.style.display = 'none';
  loginModal.setAttribute('aria-hidden', 'true');
});

window.addEventListener('click', (event) => {
  if (event.target === loginModal) {
    loginModal.style.display = 'none';
    loginModal.setAttribute('aria-hidden', 'true');
  }
});

const adminCred = { id: 'Ping1542', pass: 'Ping@1542' };

loginForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const loginId = document.getElementById('loginId').value.trim();
  const loginPassword = document.getElementById('loginPassword').value;

  if (loginId === adminCred.id && loginPassword === adminCred.pass) {
    localStorage.setItem('brokerRole', 'admin');
    window.location.href = 'admin.html';
    return;
  }

  if (loginId.length >= 3 && loginPassword.length >= 4) {
    localStorage.setItem('brokerRole', 'user');
    localStorage.setItem('brokerUser', loginId);
    window.location.href = 'user.html';
    return;
  }

  loginMessage.textContent = 'Invalid credentials. Please try again.';
  loginMessage.style.color = '#b21f24';
});

const filterButtons = document.querySelectorAll('.filter-btn');
const propertyCards = document.querySelectorAll('.property-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    propertyCards.forEach((card) => {
      card.style.display = filter === 'all' || card.dataset.type === filter ? 'block' : 'none';
    });
  });
});

document.querySelector('.inquiry-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thanks! Our team will contact you shortly.');
  event.target.reset();
});
