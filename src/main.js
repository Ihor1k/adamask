const openBtn = document.getElementById('openPopup');
const popup = document.getElementById('popup');
const closeBtn = popup.querySelector('.close');
const openPopupButtons = document.querySelectorAll('.header-button, .hero-btn, .contact-btn, .subscribe-btn');
const burger = document.querySelector('.burger');
const headerMenu = document.querySelector('.header-menu');
const closeBurgerBtn = document.querySelector('.burger-close');
const headerLinks = document.querySelectorAll('.header-link');
const mobileBtn = document.querySelector('.header-button.mobile-visible');
const form = document.getElementById('joinForm');
const successPopup = document.getElementById('successPopup');
const errorPopup = document.getElementById('errorPopup');

const openPopup = (el) => {
  el.classList.add("active");
  document.body.classList.add('noscroll');
};

const closePopUp = (el) => {
  el.classList.remove("active");
  document.body.classList.remove('noscroll');
};

openPopupButtons.forEach(button => {
  button.addEventListener("click", () => openPopup(popup));
});

closeBtn.addEventListener("click", () => closePopUp(popup));

window.addEventListener('click', (e) => {
  if (e.target === popup || e.target === successPopup || e.target === errorPopup) {
    closePopUp(e.target);
  }
});

document.querySelectorAll('.popup .close').forEach((btn) => {
  btn.addEventListener('click', () => {
    closePopUp(btn.closest('.popup-overlay'));
  });
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (name && email) {
    localStorage.setItem('joinName', name);
    localStorage.setItem('joinEmail', email);

    closePopUp(popup);
    openPopup(successPopup);
  } else {
    // помилка
    closePopUp(popup);
    openPopup(errorPopup);
  }
});

function onEntry(entry) {
  entry.forEach(change => {
    if (change.isIntersecting) {
      change.target.classList.add('trade-show');
    }
  });
}

let options = {
  threshold: [0.2]
};

let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll('.trade-item');

for (let elm of elements) {
  observer.observe(elm);
}

burger.addEventListener('click', () => {
  headerMenu.classList.add('open');
  document.body.classList.add('menu-open');
});

closeBurgerBtn.addEventListener('click', () => {
  headerMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
});

headerLinks.forEach(link => {
  link.addEventListener('click', () => {
    headerMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

mobileBtn.addEventListener('click', () => {
  headerMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
});




const words = document.querySelectorAll('.about-title, .word');

const titleObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
      }
    });
  },
  { threshold: 0.5 }
);

words.forEach(word => titleObserver.observe(word));

const title = document.querySelector('.trade-title');
  const text = document.querySelector('.trade-text');
  const firstCard = document.querySelector('.trade-item');

  const onScroll = () => {
    const rect = firstCard.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.3;

    if (rect.top < triggerPoint) {
      title.classList.add('trade-hidden');
      text.classList.add('trade-hidden');
    } else {
      title.classList.remove('trade-hidden');
      text.classList.remove('trade-hidden');
    }
  };

  window.addEventListener('scroll', onScroll);
