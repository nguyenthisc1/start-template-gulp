// === IMPORTS ===
import Lenis from '@studio-freight/lenis'
import LazyLoad from 'vanilla-lazyload'

import moment from 'moment'
import 'moment/locale/vi'

// === DEVICE AND BROWSER DETECTION ===
const isFirefox = navigator.userAgent.includes('Firefox')
const isChrome = navigator.userAgent.includes('Chrome')
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(navigator.userAgent)
const mediaDesktopLarge = $(window).width() > 1439
const mediaDesktop = $(window).width() > 1023
const mediaTablet = $(window).width() > 768 // Fixed typo: `76` -> `768` for tablets
const isLoading = $('.loading').length > 0
const isHero = $('.hero').length > 0
const isHome = window.location.pathname === '/'

// === CUSTOM PROPERTIES ===
const setCustomVHProperty = () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    window.addEventListener('resize', () => {
        vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
}

// === SCROLL BEHAVIOR ===
const handleScrollBehavior = () => {
    let lastScroll = 0
    $(window).on('scroll', () => {
        const scroll = $(window).scrollTop()
        const header = $('header')

        if (scroll > lastScroll + 1) {
            header.addClass('active-scroll')
        } else if (scroll < lastScroll - 30) {
            header.removeClass('active-scroll')
        }

        if (scroll <= 0) {
            header.removeClass('active-scroll')
        }

        lastScroll = scroll
    })
}

// === BROWSER AND DEVICE CLASS HANDLING ===
const addBrowserClasses = () => {
    const body = $('body')

    if (isFirefox) body.addClass('is-firefox')
    if (isChrome) body.addClass('is-chrome')
    if (isMobile) body.addClass('is-mobile')
}

// === SCROLL HANDLING (Lenis) ===
let lenis
const hasSmoothScroll = typeof lenis !== 'undefined'

const stopScroll = () => {
    if (hasSmoothScroll) {
        lenis.stop()
    } else {
        $('body').addClass('scroll-hidden')
    }
}

const startScroll = () => {
    if (hasSmoothScroll) {
        lenis.start()
    } else {
        $('body').removeClass('scroll-hidden')
    }
}

// === LAZY LOADING ===
const initLazyLoad = () => {
    new LazyLoad({
        elements_selector: '.tt-lazy',
        use_native: true,
        callback_error: (img) => {
            img.setAttribute('srcset', 'fallback_image@1x.jpg 1x, fallback_image@2x.jpg 2x')
            img.setAttribute('src', 'fallback_image@1x.jpg')
        },
    })
}

// === CLICK PROPAGATION ===
const setClickPropagation = (element) => {
    element.on('click', (event) => {
        event.stopPropagation()
    })
}

const initClickPropagation = () => {
    setClickPropagation($('.nav .wrapper, .modal .modal-wrapper__inner > *, .custom-select .custom-select__body'))
}

// === WINDOW CLICK EVENT ===
const initWindowClickEvent = () => {
    $(window).on('click', () => {
        const headerNav = $('.header, .nav')
        const modal = $('.modal')
        const customSelect = $('.custom-select')

        if (headerNav.hasClass('active-nav')) {
            headerNav.removeClass('active-nav')
            $('[data-hamburger]').removeClass('active-nav')
            startScroll()
        }

        if (modal.hasClass('active')) {
            modal.removeClass('active')
            startScroll()
        }

        if (customSelect.hasClass('active')) {
            customSelect.removeClass('active')
        }
    })
}

// === DATEPCIKER ===
const initDatePicker = () => {
    if ($('.date-picker').length) {
        moment.locale($('date-picker').data('lang') ? $('date-picker').data('lang') : 'vi')
        const picker = new Lightpick({
            field: document.getElementById('startDay'),
            secondField: document.getElementById('endDay'),
            // inline: true,
            lang: $('date-picker').data('lang') ? $('date-picker').data('lang') : 'vi',
            minDate: moment().startOf('now'),
            numberOfMonths: $(window).width() > 1023 ? 2 : 1,
            format: 'Do MMMM YYYY, dddd',
            singleDate: false,
        })
    }

    if ($('.date-picker-mobile').length) {
        moment.locale($('date-picker-mobile').data('lang') ? $('date-picker-mobile').data('lang') : 'vi')
        const pickerMobile = new Lightpick({
            field: document.getElementById('startDayMobile'),
            secondField: document.getElementById('endDayMobile'),
            // inline: true,
            lang: $('date-picker-mobile').data('lang') ? $('date-picker-mobile').data('lang') : 'vi',
            minDate: moment().startOf('now'),
            numberOfMonths: $(window).width() > 1023 ? 2 : 1,
            format: 'Do MMMM YYYY, dddd',
            singleDate: false,
        })
    }
}

// === SMOOTH SCROLL LENIS ===
const initLenis = () => {
const hasSmooth = $('body').hasClass('tt-scroll-smooth') && chromeAgent && mediaDesktop
if (hasSmooth) {
    gsap.registerPlugin(ScrollTrigger)
    lenis = new Lenis({
        duration: $('body').data('lenis-duration') ? $('body').data('lenis-duration') : 0.5,
        lerp: 0,
    })

    // lenis.on('scroll', (e) => {
    //     console.log(e);
    // });

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    if ($('body').hasClass('tt-transition')) {
        lenis.stop()
    }

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })
}

}

export const initUi = () => {
    setCustomVHProperty()
    addBrowserClasses()

    if (!mediaTablet) {
        handleScrollBehavior()
    }

    initLazyLoad()
    initClickPropagation()
    initWindowClickEvent()
    initDatePicker()
    initLenis()
}
