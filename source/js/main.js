const body = document.body;
const menu = document.querySelector('.menu');
const headerBurger = document.querySelector('.header-burger');
const menuClose = document.querySelector('.menu-close');
const menuLinks = document.querySelectorAll('.menu-nav__link');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const modal =  document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');

const hideMenu = () => {
  menu.classList.remove('menu--active');
  headerBurger.classList.remove('header-burger--active');
  body.style.overflow = '';
  document.documentElement.style = '';
}

if (modalTriggers.length > 0) {

  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-container')) {
      modal.classList.remove('modal--active');
      body.style.overflow = '';
      document.documentElement.style = '';
    }
  })

  modalClose.addEventListener('click', () => {
    modal.classList.remove('modal--active');
    body.style.overflow = '';
    document.documentElement.style = '';
  })

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('modal--active');
      body.style.overflow = 'hidden';
      document.documentElement.style = 'hidden';
    })
  })
}

if (headerBurger) {
  headerBurger.addEventListener('click', (e) => {

    headerBurger.classList.add('header-burger--active');

    if (headerBurger.classList.contains('header-burger--active')) {
      menu.classList.add('menu--active');
      body.style.overflow = 'hidden';
      document.documentElement.style = 'hidden';
    }
  })

  menuClose.addEventListener('click', () => {
    hideMenu();
  })

  menu.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu')) {
      hideMenu();
    }
  })

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hideMenu();
    })
  })

}

const sliderReviews = new Swiper('.slider-inner', {
  slidesPerView: 1,
  speed: 400,
  allowTouchMove: false,
  navigation: {
    nextEl: '.slider-arrow--next', // Селектор кнопки "Вперед"
    prevEl: '.slider-arrow--prev', // Селектор кнопки "Назад"
  },
})

