const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-nav');
const openLogin = document.getElementById('openLogin');
const closeLogin = document.getElementById('closeLogin');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const toggleModal = (show) => {
  if (!loginModal) return;
  loginModal.style.display = show ? 'flex' : 'none';
  loginModal.setAttribute('aria-hidden', show ? 'false' : 'true');
  document.body.style.overflow = show ? 'hidden' : '';
};

openLogin?.addEventListener('click', () => toggleModal(true));
closeLogin?.addEventListener('click', () => toggleModal(false));

window.addEventListener('click', (event) => {
  if (event.target === loginModal) toggleModal(false);
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    toggleModal(false);
    document.getElementById('adminSidebar')?.classList.remove('open');
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
    localStorage.setItem('brokerUser', loginId.replace(/[<>]/g, ''));
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

const phonePattern = /^[6-9]\d{9}$/;
document.querySelector('.inquiry-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const phone = document.getElementById('phoneInput').value.replace(/\D/g, '');
  if (!phonePattern.test(phone)) {
    alert('Please enter a valid 10-digit Indian mobile number.');
    return;
  }
  alert('Thanks! Our team will contact you shortly.');
  event.target.reset();
});

const feeInput = document.getElementById('feeInput');
const feeOutput = document.getElementById('feeOutput');
feeInput?.addEventListener('input', () => {
  const amount = Number(feeInput.value || 0);
  const fee = amount > 0 ? Math.round(amount * 0.01) : 0;
  feeOutput.textContent = fee ? `Estimated service fee: ₹${fee.toLocaleString('en-IN')}` : 'Estimated service fee: —';
});

document.getElementById('appointmentForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Visit appointment booked. Our team will confirm shortly.');
  event.target.reset();
});

document.getElementById('newsletterForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Subscribed successfully for property updates.');
  event.target.reset();
});

document.getElementById('searchForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const city = document.getElementById('searchCity').value || 'selected area';
  const type = document.getElementById('searchType').value || 'property';
  document.getElementById('searchResult').textContent = `Showing ${type} options for ${city}. Call +91 78018 73050 for instant matching.`;
});

const liveStatus = document.getElementById('liveStatus');
if (liveStatus) {
  const hr = new Date().getHours();
  liveStatus.textContent = hr >= 9 && hr < 20 ? 'Office: Open Now' : 'Office: Closed (Will reopen at 9AM)';
}

const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  if (!backTop) return;
  backTop.classList.toggle('show', window.scrollY > 360);
});
backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.querySelectorAll('.shortlist').forEach((button) => {
  button.addEventListener('click', () => {
    button.textContent = 'Shortlisted ✓';
    button.disabled = true;
  });
});
