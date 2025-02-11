import { isChrome, mediaDesktop } from './initUi'
import Lenis from '@studio-freight/lenis'

// === SCROLL HANDLING (Lenis) ===
let lenis
const hasSmoothScroll = typeof lenis !== 'undefined'

export const stopScroll = () => {
    if (hasSmoothScroll) {
        lenis.stop()
    } else {
        $('body').addClass('scroll-hidden')
    }
}

export const startScroll = () => {
    if (hasSmoothScroll) {
        lenis.start()
    } else {
        $('body').removeClass('scroll-hidden')
    }
}

// =================
// Scroll Smooth
// =================
const hasSmooth = $('body').hasClass('tt-scroll-smooth') && isChrome && mediaDesktop
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
