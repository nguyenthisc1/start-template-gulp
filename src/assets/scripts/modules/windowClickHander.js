export const setClickPropagation = (selectors) => {
  document.querySelectorAll(selectors).forEach((element) => {
      element.addEventListener('click', (event) => {
          event.stopPropagation()
      })
  })
}

export const handleGlobalClick = () => {
  document.addEventListener('click', () => {
      const headerNavElements = document.querySelectorAll('.header, .nav, [data-hamburger]')
      const modalElements = document.querySelectorAll('.modal')
      const customSelectElements = document.querySelectorAll('.custom-select')

      if (document.querySelector('.header.active-nav, .nav.active-nav')) {
          headerNavElements.forEach((el) => el.classList.remove('active-nav'))
          startScroll()
      }

      if (document.querySelector('.modal.active')) {
          modalElements.forEach((el) => el.classList.remove('active'))
          startScroll()
      }

      if (document.querySelector('.custom-select.active')) {
          customSelectElements.forEach((el) => el.classList.remove('active'))
      }
  })
}

// Khởi chạy các hàm sau khi DOM được load
document.addEventListener('DOMContentLoaded', () => {
  setClickPropagation('.nav .wrapper, .modal .modal-wrapper__inner > *, .custom-select .custom-select__body')
  handleGlobalClick()
})
