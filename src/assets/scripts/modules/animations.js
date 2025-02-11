import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// =================
// Page Effects
// =================
export const animations = () => {
    if ($('[data-fade-in]').length) {
        $('[data-fade-in]').each(function () {
            let $this = $(this)
            gsap.from($this, {
                opacity: 0,
                y: 12,
                delay: $this.data('delay') ? $this.data('delay') : 0,
                clearProps: 'all',
                scrollTrigger: {
                    trigger: $this.data('trigger') ? $this.data('trigger') : $this,
                    start: $this.data('start') ? $this.data('start') : 'top bottom',
                    once: true,
                    markers: false,
                },
            })
        })
    }
    if ($('[data-fade-in-item]').length) {
        $('[data-fade-in-item').each(function () {
            const $this = $(this)
            gsap.from($this.find('> *'), {
                opacity: 0,
                y: 12,
                stagger: $this.data('stagger') ? $this.data('stagger') : 0.05,
                delay: $this.data('delay') ? $this.data('delay') : 0,
                clearProps: 'all',
                scrollTrigger: {
                    trigger: $this.data('trigger') ? $this.data('trigger') : $this,
                    start: $this.data('start') ? $this.data('start') : mediaDesktop ? 'top 70%' : 'top bottom',
                    scrub: false,
                    markers: false,
                    once: true,
                },
            })
        })
    }
    if ($('[data-split-text]').length) {
        // ==================================================
        // lettering
        // Source: https://github.com/davatron5000/Lettering.js/
        // ==================================================
        // Begin fade up split text

        if ($('[data-split-text="words"]').length) {
            const $splitTextWords = $('[data-split-text="words"]')

            $splitTextWords.lettering('words').children('span').lettering('words').find('span:empty').parent().remove()
        }

        if ($('[data-split-text="lines"]').length) {
            const $splitTextLines = $('[data-split-text="lines"]')

            $splitTextLines.lettering('lines').children('span').lettering('lines')
        }

        if ($('[data-split-text="wordchars"]').length) {
            const $splitTextLines = $('[data-split-text="wordchars"]')
            $splitTextLines.lettering('words').find('span:empty').remove()
            $splitTextLines.children('span').lettering()
        }

        if ($('[data-split-text="linesWordchars"]').length) {
            const $splitTextLines = $('[data-split-text="linesWordchars"]')

            $splitTextLines.lettering('lines')
            $splitTextLines.children('span').lettering('words').find('span:empty').remove()
            $splitTextLines.find('span span').lettering()
        }
    }
    if ($('[data-text-up]').length) {
        if ($('[data-text-up="lines"]').length) {
            $('[data-text-up="lines"]').each(function (idx, item) {
                const $this = $(this)
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: $this.data('trigger') ? $this.data('trigger') : $this,
                        start: $this.data('start') ? $this.data('start') : 'bottom bottom',
                        end: $this.data('end') ? $this.data('end') : 'bottom top',
                        delay: $this.data('start') ? $this.data('start') : 0,
                        markers: false,
                        once: true,
                        ease: Circ.easeOut,
                    },
                })
                gsap.set($this.find('span'), {
                    y: '100%',
                })
                tl.to($this.find('span'), {
                    y: 0,
                    duration: $this.data('duration') ? $this.data('duration') : 1,
                    stagger: $this.data('stagger') ? $this.data('stagger') : 0.2,
                    delay: $this.data('delay') ? $this.data('delay') : 0,
                    clearProps: 'all',
                })
            })
        }

        if ($('[data-text-up="linesWordchars"]').length) {
            $('[data-text-up="linesWordchars"]').each(function (idx, item) {
                const $this = $(this)
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: $this.data('trigger') ? $this.data('trigger') : $this,
                        start: $this.data('start') ? $this.data('start') : 'bottom bottom',
                        end: $this.data('end') ? $this.data('end') : 'bottom top',
                        markers: false,
                        once: true,
                        ease: Circ.easeOut,
                    },
                })
                gsap.set($this.find('span span span'), {
                    y: '100%',
                })
                tl.to($this.find('span span span'), {
                    y: 0,
                    duration: $this.data('duration') ? $this.data('duration') : 1,
                    stagger: $this.data('stagger') ? $this.data('stagger') : 0.03,
                    delay: $this.data('delay') ? $this.data('delay') : 0,
                    clearProps: 'all',
                })
            })
        }
    }
    if ($('[data-split-color-line]').length) {
        const $splitTextLines = $('[data-split-color-line]')

        $splitTextLines.children('span').each(function () {
            const $this = $(this)
            $this.append(`<span class="text-mask"></span>`)
        })

        $splitTextLines.each(function (idx, item) {
            const $this = $(this)
            const tl = gsap.timeline({
                toggleActions: 'play none none reverse',
                scrollTrigger: {
                    trigger: $this.data('trigger') ? $this.data('trigger') : $this,
                    start: $this.data('start') ? $this.data('start') : 'top 90%',
                    end: $this.data('end') ? $this.data('end') : 'bottom 50%',
                    markers: false,
                    scrub: 1,
                },
            })

            $this.find('.text-mask').addClass($this.data('split-color-line'))

            tl.to($this.find('.text-mask'), {
                xPercent: 100,
            })
        })
    }
    if ($('[anim-parallax]').length) {
        $('[anim-parallax]').each(function () {
            const $this = $(this)

            gsap.to($this, {
                yPercent: $this.data('speed') ? $this.data('speed') : 25,
                ease: 'none',
                scrollTrigger: {
                    trigger: $this.data('trigger') ? $this.data('trigger') : $this,
                    start: $this.data('start') ? $this.data('start') : 'top bottom',
                    end: $this.data('end') ? $this.data('end') : 'bottom top',
                    scrub: true,
                    markers: false,
                },
            })
        })
    }
    if ($('[data-map-area]').length) {
        $('[data-map-area] li')
            .on('mouseenter', function () {
                const $this = $(this)
                $this.addClass('opacity-100').siblings().addClass('opacity-20')
                $('[data-area]').removeClass('stroke-primary fill-primary')
                $('[data-area-number]').removeClass('fill-white')
                const $areaNumber = $this.data('map-area-number')
                const $selectArea = $("[data-area='" + $areaNumber + "']")
                const $selectAreaNumber = $("[data-area-number='" + $areaNumber + "']")
                $selectArea.addClass('stroke-primary fill-primary')
                $selectAreaNumber.addClass('fill-white')
            })
            .on('mouseleave', function () {
                const $this = $(this)
                $this.removeClass('opacity-100').siblings().removeClass('opacity-20')

                $('[data-area]').removeClass('stroke-primary fill-primary')
                $('[data-area-number]').removeClass('fill-white')
            })

        $('[data-map-area] li').each(function (idx, item) {
            item.setAttribute('data-map-area-number', idx)
        })
    }
}
