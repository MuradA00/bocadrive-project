const sidebar = document.querySelector('.sidebar');
const expandButton = document.querySelector('.sidebar-expand');
const searchFilter = document.querySelector('.search-dropdown');
const filterDropdown = document.querySelector('.search-hidden');
const body = document.body;
const sidebarHeader = document.querySelector('.sidebar-top');
const sidebarFooter = document.querySelector('.sidebar-footer');
const textareas = document.querySelectorAll('.textarea');
const dropdowns = document.querySelectorAll('.dropdown');
const purchaseButton = document.querySelector('.basket-purchase');
const purchaseModal = document.querySelector('.purchase');
const purchaseClose = document.querySelector('.purchase-close');
const purchaseImageItems = document.querySelectorAll('.purchase-item__image');
const modals = document.querySelectorAll('.popup');
const indexNavLinks = document.querySelectorAll('.nav-item__link');
const indexSlides = document.querySelectorAll('.main-slider section');
const modalScrollContainer = document.querySelector('.modal-scroll');
const modalAccs = document.querySelectorAll('.modal-acc');
const faqAccs = document.querySelectorAll('.faq-accs__item');
const slider_input = document.querySelector('.profile-range input'),
      slider_thumb = document.querySelector('.profile-range__thumb'),
      slider_line = document.querySelector('.profile-range__bar-line');
      slider_value = document.querySelector('.profile-range__value');


// if (indexNavLinks.length > 0) {
//   const indexSlidesArray = Array.from(indexSlides); // Преобразуйте DOM-коллекцию в массив
//   const activeSlideIndex = indexSlidesArray.findIndex(slide => slide.classList.contains('swiper-slide-active'));
//   console.log(activeSlideIndex);
// }

if (faqAccs.length > 0) {
  faqAccs.forEach(acc => {
    const accFooter = acc.querySelector('.faq-accs__footer');
    const accHiddenHeight = acc.querySelector('.faq-accs__hidden').scrollHeight + 'px';

    acc.addEventListener('click', () => {
      acc.classList.toggle('faq-accs__item--active');
      if (acc.classList.contains('faq-accs__item--active')) {
        accFooter.style.height = accHiddenHeight;
      } else {
        accFooter.style.height = 0;
      }
    });
  });
}

if (modalAccs.length > 0) {
  if (modalAccs.length > 0) {
    window.addEventListener('DOMContentLoaded', () => {
      modalAccs.forEach(acc => {
        const currentCheckbox = acc.querySelector('.checkbox-input');
        const currentHiddenContainer = acc.querySelector('.modal-acc__hidden');
        const currentHiddenHeight = acc.querySelector('.modal-acc__hidden-text').scrollHeight + 'px';

        acc.addEventListener('click', () => {
          acc.classList.toggle('modal-acc--active');

          if (acc.classList.contains('modal-acc--active')) {
            currentHiddenContainer.style.height = currentHiddenHeight;
            currentCheckbox.checked = true;
          } else {
            currentHiddenContainer.style.height = '0';
            currentCheckbox.checked = false;
          }
        });
      });
    })
  }
}

if (Swiper) {
  const indexSlider = new Swiper('.main-container', {
    direction: 'vertical',
    draggable: false,
    autoHeight: true,
    speed: 700,
    allowTouchMove: false,
    mousewheel: {
      enabled: true
    },
    keyboard: {
      enabled: true
    }
  })

  const homeVideo = document.querySelector('.video-slider');
  const videoPreviews = document.querySelectorAll('.video-flexbox__video');

  if (homeVideo) {

    videoPreviews.forEach(preview => {
      const currentPlayButton = preview.querySelector('.video-flexbox__play');
      const currentIframe = preview.querySelector('.video-flexbox__iframe');

      currentPlayButton.addEventListener('click', () => {
        currentPlayButton.classList.add('video-flexbox__play--active')

        if (currentPlayButton.classList.contains('video-flexbox__play--active')) {
          currentIframe.classList.add('video-flexbox__iframe--active')
        }
      })
    })

    const videoSlider = new Swiper(homeVideo, {
      slidesPerView: 1,
      speed: 600,
      spaceBetween: 10,
      draggable: false,
      noSwiping: true,
      allowTouchMove: false,
      navigation: {
        nextEl: '.video-pagination__button--next',
        prevEl: '.video-pagination__button--prev '
      },
      breakpoints: {
        568: {
          slidesPerView: 2
        },
        900: {
          spaceBetween: 24,
          slidesPerView: 3
        }
      }
    })
  }
}

function showSliderValue() {
  const max = parseFloat(document.querySelector('.profile-range-value').textContent.replace(/[^0-9]/g, ''));
  console.log(max)
  const currentValue = parseInt(slider_input.value);

  const scaledValue = Math.floor((currentValue / slider_input.max) * max);

  const bulletPosition = (currentValue / slider_input.max);
  const space = slider_input.offsetWidth - slider_thumb.offsetWidth;

  slider_thumb.style.left = (bulletPosition * space) + 'px';
  slider_line.style.width = bulletPosition * 100 + '%';
  slider_value.innerText = scaledValue + ' ₽' ;
}

if (slider_input) {
  showSliderValue();
  window.addEventListener("resize",showSliderValue);
  slider_input.addEventListener('input', showSliderValue, false);
}
// if (modalScrollContainer) {
//   new SimpleBar(modalScrollContainer), { autoHide: true };
// }

if (purchaseImageItems.length > 0) {
  purchaseImageItems.forEach(item => {
    const currentRadio = item.querySelector('input[type="radio"]');

    item.addEventListener('click', () => {
      item.classList.toggle('purchase-item__image--active');

      if (item.classList.contains('purchase-item__image--active')) {
        currentRadio.checked = true;
      }
      else {
        currentRadio.checked = false;
      }
    })
  })
  purchaseImageItems.forEach(item => item.classList.remove('purchase-item__image--active'));
}

const handleBodyScroll = () => {
  body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

const removeBodyScroll = () => {
  body.style.overflow = '';
  document.documentElement.style.overflow = '';
}

const showModal = (modal) => {
  modal.classList.toggle('modal--active');
  handleBodyScroll();
}

const buttons = document.querySelectorAll('.popup-trigger');
modals.forEach(modal => {
  const modalCloseBtn = modal.querySelector('.modal-close');

  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-container')) {
      modal.classList.remove('modal--active')
    }
  })

  modalCloseBtn.addEventListener('click', () => {
    modal.classList.remove('modal--active');
    removeBodyScroll();
  })
})
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const triggerValue = button.getAttribute('data-trigger');
    const modal = document.querySelector(`[data-modal="${triggerValue}"]`);
    handleBodyScroll();

    if (modal) {
      modal.classList.add('modal--active')
    }
  });
});

if (purchaseModal) {
  const purchaseBody = document.querySelector('.purchase-body');
  new SimpleBar(document.querySelector('.purchase-body'), { autoHide: true });
  purchaseButton.addEventListener('click', () => {
    purchaseModal.classList.add('purchase--active')
    setTimeout(() => {
      purchaseModal.style.transition = 'all 300ms ease 300ms'
      purchaseBody.style.transition = 'all 300ms ease'
    }, 400)
    handleBodyScroll();
  })
  purchaseModal.addEventListener('click', (e) => {
    if (e.target.classList.contains('purchase')) {
      purchaseModal.classList.remove('purchase--active');
      setTimeout(() => {
        purchaseBody.style.transition = ''
        purchaseModal.style.transition = ''
      }, 400)
      removeBodyScroll();
    }
  })
  purchaseClose.addEventListener('click', () => {
    purchaseModal.classList.remove('purchase--active');
    setTimeout(() => {
      purchaseBody.style.transition = ''
      purchaseModal.style.transition = ''
    }, 400)
    removeBodyScroll();
  })
}

if (textareas.length > 0) {
  textareas.forEach(area => {
    const inputBox = area.querySelector('.textarea-box');
    const areaNotification = area.querySelector('.textarea-notification');
    const areaNotificationText = area.querySelector('.textarea-notification__text');

    inputBox.addEventListener('click', () => {
      inputBox.classList.toggle('textarea-box--focus');

      inputBox.classList.contains('textarea-box--focus') ? areaNotification.style.height = `${areaNotificationText.scrollHeight}px` : areaNotification.style.height = 0;
      inputBox.classList.contains('textarea-box--focus') ? areaNotification.style.margin = '6px 0 8px 0' : areaNotification.style.margin = 0;
    })

    // document.addEventListener('click', (e) => {
    //   if (e.target !== inputBox) {
    //     inputBox.classList.remove('textarea-box--focus')
    //   }
    // })
  })
}

if (dropdowns.length > 0) {
  document.querySelectorAll('.dropdown').forEach(function (dropdownWrapper) {
    const dropdownBtn = dropdownWrapper.querySelector('.dropdown__button');
    const dropdownList = dropdownWrapper.querySelector('.dropdown__list');
    const dropdownItems = dropdownList.querySelectorAll('.dropdown__list-item');

    dropdownBtn.addEventListener('click', function () {
      dropdownList.classList.toggle('dropdown__list--active');
      this.classList.toggle('dropdown__button--active');
    });

    dropdownItems.forEach(function(listItem) {
      listItem.addEventListener('click', function (e) {
        dropdownItems.forEach(function(el) {
          el.classList.remove('dropdown__button--active');
        })
        e.target.classList.add('dropdown__button--active');
        dropdownBtn.textContent = this.textContent;
        dropdownList.classList.remove('dropdown__list--active');
      })
    })

    document.addEventListener('click', function (e) {
      if ( e.target !== dropdownBtn ){
        dropdownBtn.classList.remove('dropdown__button--active');
        dropdownList.classList.remove('dropdown__list--active');
      }
    })

    document.addEventListener('keydown', function (e) {
      if( e.key === 'Tab' || e.key === 'Escape' ) {
        dropdownBtn.classList.remove('dropdown__button--active');
        dropdownList.classList.remove('dropdown__list--active');
      }
    })
  })

}

const handleSidebarHeight = () => {
  sidebar.style.setProperty('--window-h', window.innerHeight + 'px');
  sidebar.style.setProperty('--sidebar-header-h', sidebarHeader.scrollHeight + 'px');
  sidebar.style.setProperty('--sidebar-footer-h', sidebarFooter.scrollHeight + 'px');
}
if (sidebar) {
  new SimpleBar(document.querySelector('.sidebar-nav'), { autoHide: true });
  // let vh = window.innerHeight * 0.01;
  // document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('DOMContentLoaded', handleSidebarHeight);
  window.addEventListener('resize', () => {
    handleSidebarHeight();
    // let vh = window.innerHeight * 0.01;
    // document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
  window.addEventListener('orientationchange', handleSidebarHeight);
  expandButton.addEventListener('click', () => {
    expandSidebar();
    handleSidebarHeight();
  });
}
const sidebarWidthHandler = () => {
  expandButton.classList.toggle('sidebar-expand--active');

  if (expandButton.classList.contains('sidebar-expand--active')) {
    sidebar.style.setProperty('--root-sidebar-w', sidebarWidthShrink);
    sidebar.classList.add('sidebar--collapsed'); // Добавить класс
  } else {
    sidebar.style.removeProperty('--root-sidebar-w', sidebarWidthShrink);
    sidebar.classList.remove('sidebar-collapsed'); // Удалить класс
  }
}
const expandSidebar = () => {
  expandButton.classList.toggle('sidebar-expand--active');

  if (expandButton.classList.contains('sidebar-expand--active')) {
    sidebar.classList.add('sidebar--active');
    document.documentElement.classList.add('sidebar-dynamic');
  }
  else {
    document.documentElement.classList.remove('sidebar-dynamic');
    sidebar.classList.remove('sidebar--active');
  }
}
const showDropdown = (parentDropdown, dropdown) => {
  parentDropdown.classList.add('mouse-active');

  // parentDropdown.classList.contain('mouse-active') ? dropdown.classList.add('show-dropdown') : dropdown.classList.remove('show-dropdown');
  dropdown.classList.add('show-dropdown');
}
const hideDropdown = (parentDropdown, dropdown) => {
  parentDropdown.classList.remove('mouse-active');

  // parentDropdown.classList.contain('mouse-active') ? dropdown.classList.add('show-dropdown') : dropdown.classList.remove('show-dropdown');
  dropdown.classList.remove('show-dropdown');
}

// searchFilter.addEventListener('mouseenter', () => {
//   showDropdown(searchFilter, filterDropdown)
// });
// searchFilter.addEventListener('mouseleave', () => {
//   hideDropdown(searchFilter, filterDropdown)
// })

// expandButton.addEventListener('click', sidebarWidthHandler);

const preloaderContainer = document.querySelector('.preloader');
const preloaderValue = document.querySelector('.preloader-value');
const preloaderFilled = document.querySelector('.preloader-circle');

let currentValue = 0;
const finalValue = 100;
const duration = 1500;

let startTime = null;

function updateValue(timestamp) {
  if (!startTime) {
    startTime = timestamp;
  }

  const progress = Math.min(1, (timestamp - startTime) / duration);
  currentValue = progress * finalValue;
  preloaderFilled.style.setProperty('--value', currentValue);
  // preloaderValue.textContent = Math.floor( currentValue) + '%'

  if (progress < 1) {
    requestAnimationFrame(updateValue);
  } else {
    setTimeout(() => {
      preloaderContainer.classList.add('preloader--active');
    }, 200);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(updateValue);
});

