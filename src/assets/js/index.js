const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Nokia|Opera Mini/i.test(navigator.userAgent) ? true : false;
const isLoading = $('.loading').length;
const isHero = $('.hero').length;
const isFooterForm = $('.footer-form').length;
const isHome = window.location.pathname == '/';
let lenis;
const mediaDesktop = $(window).width() > 1024;
const mediaTablet = $(window).width() > 768;

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// show footer form when scroll last page
if (mediaDesktop && isFooterForm) {
    $('body').css('margin-bottom', $('.footer-form').innerHeight());
    $(window).on('resize', function () {
        $('body').css('margin-bottom', $('.footer-form').innerHeight());
    });
}

// scroll show/hide header mobile
if (!mediaTablet) {
    let lastScroll = 0;
    $(window).on('scroll', function () {
        const scroll = $(window).scrollTop();

        if (scroll > lastScroll + 1) {
            $('header').addClass('active-scroll');
        } else if (scroll < lastScroll - 30) {
            $('header').removeClass('active-scroll');
        }

        if (scroll <= 0) {
            $('header').removeClass('active-scroll');
        }

        lastScroll = scroll;
    });
}

// ========================s================
// Detect browser and add class to </body>
// ========================================
// Detect Firefox
const firefoxAgent = navigator.userAgent.indexOf('Firefox') > -1;
const chromeAgent = navigator.userAgent.indexOf('Chrome') > -1;

// Add class "is-'Agent'" to </body>
if (firefoxAgent) {
    $('body').addClass('is-firefox');
}
if (chromeAgent) {
    $('body').addClass('is-chrome');
}
// ==========================================================
// Detect mobile device and add class "is-mobile" to </body>
// ==========================================================

// Detect mobile device (Do not remove!!!)

// Add class "is-mobile" to </body>
if (isMobile) {
    $('body').addClass('is-mobile');
}

// =====================================================
// Swiper
// Source: https://swiperjs.com/swiper-api
// =====================================================
if ($('.hero-slider').length) {
    $('.hero-slider').each(function () {
        let $slider = $(this);

        let $dataSpeed;
        let $dataLoop = $slider.attr('data-loop');
        let $dataAutoplay = $slider.data('autoplay') ? { delay: $slider.data('autoplay') } : $slider.data('autoplay');
        if ($slider.is('[data-speed]')) {
            $dataSpeed = $slider.data('speed');
        } else {
            $dataSpeed = 900; // by default
        }

        const $sliderSwiper = new Swiper($slider[0], {
            direction: 'horizontal',
            speed: $dataSpeed,
            loop: $dataLoop,
            autoplay: $dataAutoplay,
            preloadImages: true,
            lazy: {
                loadPrevNext: true,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            on: {
                init: function () {
                    let $this = this;
                    let $slideActive = $($this.slides[$this.activeIndex]);

                    // gsap.to($slideActive.find(".fade-up-split").find("span"), {
                    //   duration: 0.4,
                    //   opacity: 1,
                    //   rotate: 0,
                    //   y: 0,
                    //   stagger: 0.1,
                    //   ease: Power4.ease,
                    // });
                    // gsap.to($this.slides.find(".fade-up-split").find("span"), {
                    //   opacity: 0,
                    //   rotate: 6,
                    //   y: 20,
                    // });
                },

                transitionStart: function () {
                    let $this = this;
                    let $slideActive = $($this.slides[$this.activeIndex]);
                    // if ($this.slides.find(".fade-up-split").length) {
                    //   gsap.to($slideActive.find(".fade-up-split").find("span"), {
                    //     duration: 0.4,
                    //     opacity: 1,
                    //     rotate: 0,
                    //     y: 0,
                    //     stagger: 0.1,
                    //     ease: Power4.ease,
                    //     delay: 0.2,
                    //   });
                    // }
                },

                transitionEnd: function () {
                    let $this = this;
                    let $slideActive = $($this.slides[$this.activeIndex]);

                    // if ($this.slides.find(".fade-up-split").length) {
                    //   $slideActive
                    //     .prevAll()
                    //     .find(".fade-up-split")
                    //     .find("span")
                    //     .each(function () {
                    //       gsap.to(this, {
                    //         opacity: 0,
                    //         rotate: 6,
                    //         y: 20,
                    //       });
                    //     });
                    //   $slideActive
                    //     .nextAll()
                    //     .find(".fade-up-split")
                    //     .find("span")
                    //     .each(function () {
                    //       gsap.to(this, {
                    //         opacity: 0,
                    //         rotate: 6,
                    //         y: 20,
                    //       });
                    //     });
                    // }
                },
            },
        });
    });
}


// =====================================================
// Light Gallery
// Source: https://github.com/sachinchoolur/lightGallery
// =====================================================
if ($('#gallery').length) {
    lightGallery(document.getElementById('gallery'), {
        // Please read about gallery options here: http://sachinchoolur.github.io/lightGallery/docs/api.html
        // lightGallery core
        selector: '.lg-trigger',
        mode: 'lg-fade', // Type of transition between images ('lg-fade' or 'lg-slide').
        height: '90%', // Height of the gallery (ex: '100%' or '300px').
        width: '80%', // Width of the gallery (ex: '100%' or '300px').
        iframeMaxWidth: '100%', // Set maximum width for iframe.
        loop: true, // If false, will disable the ability to loop back to the beginning of the gallery when on the last element.
        speed: 500, // Transition duration (in ms).
        closable: true, // Allows clicks on dimmer to close gallery.
        escKey: true, // Whether the LightGallery could be closed by pressing the "Esc" key.
        keyPress: true, // Enable keyboard navigation.
        hideBarsDelay: 3000, // Delay for hiding gallery controls (in ms).
        controls: true, // If false, prev/next buttons will not be displayed.
        mousewheel: true, // Chane slide on mousewheel.
        download: true, // Enable download button. By default download url will be taken from data-src/href attribute but it supports only for modern browsers. If you want you can provide another url for download via data-download-url.
        counter: true, // Whether to show total number of images and index number of currently displayed image.
        swipeThreshold: 50, // By setting the swipeThreshold (in px) you can set how far the user must swipe for the next/prev image.
        enableDrag: true, // Enables desktop mouse drag support.
        enableTouch: true, // Enables touch support.
        getCaptionFromTitleOrAlt: false, // Option to get captions from alt or title tags.

        // Zoom plugin
        zoom: true, // Enable/Disable zoom option.
        scale: 0.5, // Value of zoom should be incremented/decremented.
        enableZoomAfter: 50, // Some css styles will be added to the images if zoom is enabled. So it might conflict if you add some custom styles to the images such as the initial transition while opening the gallery. So you can delay adding zoom related styles to the images by changing the value of enableZoomAfter.

        // Video options
        videoMaxWidth: '1400px', // Set limit for video maximal width.

        // Youtube video options
        loadYoutubeThumbnail: true, // You can automatically load thumbnails for youtube videos from youtube by setting loadYoutubeThumbnail true.
        youtubeThumbSize: 'default', // You can specify the thumbnail size by setting respective number: 0, 1, 2, 3, 'hqdefault', 'mqdefault', 'default', 'sddefault', 'maxresdefault'.
        youtubePlayerParams: {
            // Change youtube player parameters: https://developers.google.com/youtube/player_parameters
            modestbranding: 0,
            showinfo: 1,
            controls: 1,
        },

        // Vimeo video options
        loadVimeoThumbnail: true, // You can automatically load thumbnails for vimeo videos from vimeo by setting loadYoutubeThumbnail true.
        vimeoThumbSize: 'thumbnail_medium', // Thumbnail size for vimeo videos: 'thumbnail_large' or 'thumbnail_medium' or 'thumbnail_small'.
        vimeoPlayerParams: {
            // Change vimeo player parameters: https://developer.vimeo.com/player/embedding#universal-parameters
            byline: 1,
            portrait: 1,
            title: 1,
            color: 'CCCCCC',
            autopause: 1,
        },

        plugins: [lgVideo, lgZoom],
    });
}

// =================
// Scroll Smooth
// =================
if ($('body').hasClass('tt-scroll-smooth') && chromeAgent && mediaDesktop) {
    gsap.registerPlugin(ScrollTrigger);
    lenis = new Lenis({
        duration: $('body').data('lenis-duration') ? $('body').data('lenis-duration') : 0.5,
        lerp: 0,
    });

    // lenis.on('scroll', (e) => {
    //     console.log(e);
    // });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    lenis.stop();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
}

// =================
// Scroll
// =================
if ($('body').hasClass('tt-scroll-social')) {
    if (!mediaDesktop) {
        let lastScroll = 0;
        $(window).on('scroll', function () {
            const scroll = $(window).scrollTop();

            if (scroll > lastScroll + 1) {
                $('.book-button, .contact-social').addClass('active-scroll');
            } else if (scroll < lastScroll - 30) {
                $('.book-button, .contact-social').removeClass('active-scroll');
            }

            lastScroll = scroll;
        });
    }
}

// =================
// Page transitions
// =================
if ($('body').hasClass('tt-transition')) {
    const HeroHideLoad = $(window).scrollTop() < 50;
    // preloader
    $(window).on('DOMContentLoaded', function () {
        HideLoad();
        // RevealLoad();
    });

    function RevealLoad() {

    }

    function HideLoad() {
        // Begin loading
        if (isLoading) {

        }
        // End loading
    }

    // ====================================================
    // run init when loaded
    window.onpageshow = function (event) {
        if (event.persisted) {
            window.location.reload();
        }
    };

    // wait second if have RevealLoad
    $('a')
        .not('[target="_blank"]') // omit from selection
        .not('[href^="#"]') // omit from selection
        .not('[href^="mailto"]') // omit from selection
        .not('[href^="tel"]') // omit from selection
        .not('.lg-trigger') // omit from selection
        .not('.no-transition') // omit from selection
        .on('click', function (e) {
            e.preventDefault();

            if ($(this).data('hash')) {
                localStorage.setItem('hashLink', $(this).data('hash'));
            }

            setTimeout(
                function (url) {
                    window.location = url;
                },
                1800,
                this.href
            );

            RevealLoad(); // call in animations.
        });
}

// =================
// Magic cursor
// =================
if ($('body').not('.is-mobile').hasClass('tt-magic-cursor')) {
    // Magic cursor
    // Cursor letiable
    let $mouse = { x: 0, y: 0 }; // Cursor position
    let $pos = { x: 0, y: 0 }; // Cursor position
    let $ratio = 0.15; // delay Em đã xong single 029. E sẽ up lên cho anh follow cursor
    let $active = false;
    let $ball = $('#ball');

    let $ballWidth = 8; // Ball default width
    let $ballHeight = 8; // Ball default height
    let $ballScale = 1; // Ball default scale
    let $ballOpacity = 1; // Ball default opacity
    let $ballBorderWidth = 2; // Ball default border width
    let $ballBackgroundColor = '#ffffff'; // Ball default border width
    $('.magnetic-item').wrap('<div class="magnetic-wrap"></div>');

    if ($('a.magnetic-item').length) {
        $('a.magnetic-item').addClass('not-hide-cursor');
    }

    gsap.set($ball, {
        // scale from middle and style ball
        xPercent: -50,
        yPercent: -50,
        width: $ballWidth,
        height: $ballHeight,
        borderWidth: $ballBorderWidth,
        opacity: $ballOpacity,
        backgroundColor: $ballBackgroundColor,
    });

    document.addEventListener('mousemove', mouseMove);

    function mouseMove(e) {
        $mouse.x = e.clientX;
        $mouse.y = e.clientY;
    }

    gsap.ticker.add(updatePosition);

    function updatePosition() {
        if (!$active) {
            $pos.x += ($mouse.x - $pos.x) * $ratio;
            $pos.y += ($mouse.y - $pos.y) * $ratio;

            gsap.set($ball, { x: $pos.x, y: $pos.y });
        }
    }

    $('.magnetic-wrap').mousemove(function (e) {
        parallaxCursor(e, this, 2); // magnetic ball = low number is more attractive
        callParallax(e, this);
    });

    function callParallax(e, parent) {
        parallaxIt(e, parent, parent.querySelector('.magnetic-item'), 25); // magnetic area = higher number is more attractive
    }

    function parallaxIt(e, parent, target, movement) {
        let boundingRect = parent.getBoundingClientRect();
        let relX = e.clientX - boundingRect.left;
        let relY = e.clientY - boundingRect.top;

        gsap.to(target, {
            duration: 0.3,
            x: ((relX - boundingRect.width / 2) / boundingRect.width) * movement,
            y: ((relY - boundingRect.height / 2) / boundingRect.height) * movement,
            ease: Power2.easeOut,
        });
    }

    function parallaxCursor(e, parent, movement) {
        let rect = parent.getBoundingClientRect();
        let relX = e.clientX - rect.left;
        let relY = e.clientY - rect.top;
        $pos.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
        $pos.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
        gsap.to($ball, { duration: 0.3, x: $pos.x, y: $pos.y });
    }

    // Magic cursor behavior
    // ======================
    // Magnetic item hover.
    $('.magnetic-wrap')
        .on('mouseenter', function (e) {
            gsap.to($ball, {
                duration: 0.3,
                width: $(this).children().width() * 2,
                height: $(this).children().width() * 2,
                borderWidth: 1,
                opacity: $ballOpacity,
            });
            $active = true;
        })
        .on('mouseleave', function (e) {
            gsap.to($ball, {
                duration: 0.3,
                width: $ballWidth,
                height: $ballHeight,
                borderWidth: $ballBorderWidth,
                opacity: $ballOpacity,
            });
            gsap.to(this.querySelector('.magnetic-item'), {
                duration: 0.3,
                x: 0,
                y: 0,
                clearProps: 'all',
            });
            $active = false;
        });

    // Hover get image
    $('.cursor-page-nav').each(function () {
        if ($(this).find('.cursor-pn-image').length) {
            $(this)
                .on('mouseenter mouseover', function () {
                    $('#magic-cursor').addClass('pn-hover-on');
                    $(this).find('.cursor-pn-image').appendTo($ball);
                    $('#magic-cursor').addClass('!mix-blend-normal');
                    gsap.to($ball, {
                        duration: 0.3,
                        width: '20vw',
                        height: '20vw',
                        opacity: 1,
                    });
                    $ball.find('.cursor-pn-image video').each(function () {
                        $(this).get(0).play();
                    });
                    if ($(this).parents('.modal')) {
                        $('#magic-cursor').appendTo($(this).parents('.modal'));
                    }
                })
                .on('mouseleave', function () {
                    $('#magic-cursor').removeClass('pn-hover-on');
                    $ball.find('.cursor-pn-image').appendTo(this);
                    $('#magic-cursor').removeClass('!mix-blend-normal');

                    gsap.to($ball, {
                        duration: 0.3,
                        width: $ballWidth,
                        height: $ballHeight,
                        opacity: $ballOpacity,
                    });
                    $(this)
                        .parent()
                        .find('.cursor-pn-image video')
                        .each(function () {
                            $(this).get(0).pause();
                        });
                    $(this).parents('.modal').find($('#magic-cursor')).appendTo('body');
                });
            $(this).addClass('not-hide-cursor');
        } else {
            $(this).removeClass('not-hide-cursor');
        }
    });

    // Hover discover
    $('[data-cursor]').each(function () {
        $(this)
            .on('mouseenter', function () {
                $ball.append('<div class="ball-view"></div>');
                $('.ball-view').append($(this).attr('data-cursor'));
                gsap.to(ball, {
                    duration: 0.3,
                    yPercent: -75,
                    // width: $(this).data('cursor-size') ? $(this).data('cursor-size') : 125,
                    // height: $(this).data('cursor-size') ? $(this).data('cursor-size') : 125,
                    opacity: 1,
                    // borderWidth: 1,
                    // borderColor: $(this).data('cursor-border-color') ? $(this).data('cursor-border-color') : '#ffffff',
                    // backgroundColor: 'transparent',
                });
                gsap.to(ball, {
                    borderWidth: 0,
                    duration: 0,
                });
                gsap.to($('.ball-view').find('.cursor-pn-discover span'), {
                    duration: 0.3,
                    y: 0,
                    delay: 0.3,
                });
                gsap.to('.ball-view', { duration: 0.3, scale: 1, autoAlpha: 1 });
            })
            .on('mouseleave', function () {
                gsap.to(ball, {
                    duration: 0.3,
                    yPercent: -50,
                    // width: $ballWidth,
                    // height: $ballHeight,
                    opacity: $ballOpacity,
                    // borderWidth: $ballBorderWidth,
                    // borderColor: '#414042',
                    // backgroundColor: 'transparent',
                    delay: 0.3,
                });
                gsap.to($('.ball-view').find('.cursor-pn-discover span'), {
                    duration: 0.3,
                    y: '-100%',
                });
                gsap.to('.ball-view', {
                    duration: 0.3,
                    scale: 0,
                    autoAlpha: 0,
                    delay: 0.3,
                    clearProps: 'all',
                });
                $ball
                    .find('.ball-view')
                    .delay(300)
                    .queue(function () {
                        $(this).remove();
                    });
            });
        $(this).addClass('not-hide-cursor');
    });

    // Hover slider
    $('.magic-cursor-slider').each(function () {
        $(this)
            .on('mouseenter', function () {
                $ballOpacity = 1;
                $ball.append('<div class="ball-view"></div>');
                $('.ball-view').append('<div class="cursor-slider"></div>');
                $('#magic-cursor').addClass('!mix-blend-normal');
                gsap.to(ball, {
                    duration: 0.3,
                    yPercent: -75,
                    width: 95,
                    height: 95,
                    opacity: 1,
                    borderWidth: 1,
                    // borderColor: $(this).data('cursor-border-color') ? $(this).data('cursor-border-color') : '#ffffff',
                });
                gsap.to(ball, {
                    borderWidth: 0,
                    duration: 0,
                });
                gsap.to('.ball-view', { duration: 0.3, scale: 1, autoAlpha: 1 });
            })
            .on('mouseleave', function () {
                $ballOpacity = 1;
                $('#magic-cursor').removeClass('!mix-blend-normal');

                gsap.to(ball, {
                    duration: 0.3,
                    yPercent: -50,
                    width: $ballWidth,
                    height: $ballHeight,
                    opacity: $ballOpacity,
                    // borderWidth: $ballBorderWidth,
                    // borderColor: '#414042',
                });
                gsap.to('.ball-view', {
                    duration: 0.3,
                    scale: 0,
                    autoAlpha: 0,
                    clearProps: 'all',
                });
                $ball.find('.ball-view').remove();
            })
            .on('mousemove', function (e) {
                if (e.clientX - $(this).offset().left > $(this).width() / 2) {
                    $('.ball-view .cursor-slider').removeClass('prev');
                } else {
                    $('.ball-view .cursor-slider').addClass('prev');
                }
            });
        $(this).addClass('not-hide-cursor hide-cursor');
        $(this).find('.swiper-button-prev,.swiper-button-next').addClass('not-hide-cursor');
    });

    // Hide on hover.
    $('a, button,.hide-cursor,.more-button,.main-button,.filter-button,.custom-select,.swiper-button-prev,.swiper-button-next') // class "hide-cursor" is for global use.
        .not('.not-hide-cursor') // omit from selection (class "not-hide-cursor" is for global use).
        .on('mouseenter', function () {
            gsap.to($ball, { duration: 0.3, scale: 0, opacity: 0 });
        })
        .on('mouseleave', function () {
            gsap.to($ball, {
                duration: 0.3,
                scale: $ballScale,
                opacity: $ballOpacity,
            });
        });

    // Show/hide on document leave/enter.
    $(document)
        .on('mouseleave', function () {
            gsap.to('#magic-cursor', { duration: 0.3, opacity: 0 });
        })
        .on('mouseenter', function () {
            gsap.to('#magic-cursor', { duration: 0.3, opacity: 1 });
        });

    // Show as the mouse moves.
    $(document).mousemove(function () {
        gsap.to('#magic-cursor', { duration: 0.3, opacity: 1 });
    });
    // End Magic cursor behavior
}

// ==================================================
// Image lazy loading
// Source: https://github.com/verlok/vanilla-lazyload
// ==================================================
const myLazyLoad = new LazyLoad({
    elements_selector: `.lazy`,
    use_native: true,
    // Other options here...
    callback_error: (img) => {
        // Use the following line only if your images have the `srcset` attribute
        img.setAttribute('srcset', 'fallback_image@1x.jpg 1x, fallback_image@2x.jpg 2x');
        img.setAttribute('src', 'fallback_image@1x.jpg');
    },
});

// =================
// Page Effects
// =================
if ($('[data-scroll-fade-in]').length) {
    ScrollTrigger.matchMedia({
        '(min-width: 320px)': function () {
            $('[data-scroll-fade-in]').each(function () {
                let $this = $(this);
                gsap.to(
                    $this,
                    {
                        // opacity: 0,
                        // y: 60,
                        // duration: 2,
                        // ease: Expo.easeOut,
                        // clearProps: 'all',
                        scrollTrigger: {
                            trigger: $this,
                            start: "top bottom",
                            // end: 'bottom top',
                            once: true,
                            // once: $this.data('once') ? $this.data('once') : true,
                            // scrub:  $this.data('once') ? $this.data('once') : false,
                            markers: false,
                            onEnter: () => $this.addClass('fade-in'),
                        },
                    }
                );
            });
        },
    });
}
if ($('[data-fade-in-item]').length && mediaDesktop) {
    const $list = gsap.utils.toArray($('[data-fade-in-item]').children());
    gsap.from($list, {
        opacity: 0,
        y: 12,
        stagger: 0.05,
        clearProps: 'all',
        scrollTrigger: {
            trigger: $('[data-fade-in-item]'),
            start: mediaDesktop ? 'top 70%' : 'top bottom',
            scrub: false,
            markers: false,
            once: true,
        },
    });
}
if ($('[data-spilit-text]').length) {
    // ==================================================
    // lettering
    // Source: https://github.com/davatron5000/Lettering.js/
    // ==================================================
    // Begin fade up spilit text

    if ($('[data-spilit-text]').length && !mediaDesktop) {
        const $spilitText = $('[data-spilit-text]');
        $spilitText.lettering('words').children('span').lettering('words').find('span:empty').parent().remove();

        // hidden up words
        $spilitText.each(function (idx, item) {
            const $this = $(this);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: $this,
                    start: 'top bottom',
                    markers: false,
                    once: true,
                    ease: Expo.easeIn,
                },
            });
            gsap.set($this.find('span span'), {
                y: $this.data('rotate') ? '120%' : '100%',
                rotate: 0,
            });
            tl.to($this.find('span span'), {
                y: 0,
                rotate: 0,
                duration: 1,
                stagger: 0,
                delay: $this.data('delay') ? $this.data('delay') : 0,
                clearProps: 'all',
            });
        });
    }

    if ($('[data-spilit-text="words"]').length && mediaDesktop) {
        const $spilitTextWords = $('[data-spilit-text="words"]');

        $spilitTextWords.lettering('words').children('span').lettering('words').find('span:empty').parent().remove();

        // hidden up words
        $spilitTextWords.each(function (idx, item) {
            const $this = $(this);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: $this,
                    start: 'bottom bottom',
                    end: 'bottom top',
                    markers: false,
                    once: true,
                    ease: Expo.easeIn,
                },
            });
            gsap.set($this.find('span span'), {
                y: $this.data('rotate') ? '120%' : '100%',
                rotate: $this.data('rotate') ? $this.data('rotate') : 0,
            });
            tl.to($this.find('span span'), {
                y: 0,
                rotate: 0,
                duration: $this.data('duration') ? $this.data('duration') : 0.6,
                stagger: $this.data('stagger') ? $this.data('stagger') : 0,
                delay: $this.data('delay') ? $this.data('delay') : 0,
                clearProps: 'all',
            });
        });
    }

    if ($('[data-spilit-text="lines"]').length && mediaDesktop) {
        const $spilitTextLines = $('[data-spilit-text="lines"]');

        $spilitTextLines.lettering('lines').children('span').lettering('lines');

        // hidden up lines
        $spilitTextLines.each(function (idx, item) {
            const $this = $(this);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: $this,
                    start: 'bottom bottom',
                    end: 'bottom top',
                    markers: false,
                    once: true,
                    ease: Circ.easeOut,
                },
            });
            gsap.set($this.find('span'), {
                y: '100%',
            });
            tl.to($this.find('span'), {
                y: 0,
                duration: $this.data('duration') ? $this.data('duration') : 0.7,
                stagger: $this.data('stagger') ? $this.data('stagger') : 0.04,
                delay: $this.data('delay') ? $this.data('delay') : 0,
                clearProps: 'all',
            });
        });
    }

    if ($('[data-spilit-text="wordchars"]').length && mediaDesktop) {
        const $spilitTextLines = $('[data-spilit-text="wordchars"]');
        const str = $spilitTextLines.text();
        $spilitTextLines.lettering('words').find('span:empty').remove();
        $spilitTextLines.children('span').lettering();
        // hidden up lines
        $spilitTextLines.each(function (idx, item) {
            const $this = $(this);
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: $this,
                    start: 'top 90%',
                    end: 'bottom top',
                    markers: false,
                    once: true,
                },
            });
            gsap.set($this.find('span span'), {
                y: '100%',
            });
            tl.to($this.find('span span'), {
                y: 0,
                duration: $this.data('duration') ? $this.data('duration') : 0.5,
                delay: $this.data('delay') ? $this.data('delay') : 0,
                ease: Back.easeOut.config(0.8),
                stagger: {
                    amount: $this.data('stagger') ? $this.data('stagger') : 1,
                    // from: '2',
                },
                clearProps: 'all',
            });
        });
    }
}

// =================
// Click event
// =================
if ($('[data-hamburger]').length) {
    $('[data-hamburger]').on('click', function (e) {
        e.stopPropagation();
        $('.header,.nav,[data-hamburger]').toggleClass('active');

        let activeNav = $('.nav').hasClass('active');

        if (activeNav) {
            // Add transition delay nav social when open nav
            if (!mediaTablet && !chromeAgent) {
                $('body').addClass('scroll-hidden');
            }

            if (chromeAgent) {
                lenis.stop();
            }
        }

        if (!activeNav) {

            if (!mediaTablet && !chromeAgent) {
                $('body').removeClass('scroll-hidden');
            }

            if (chromeAgent) {
                lenis.start();
            }
        }
    });
}

// Begin modal
if ($('.modal').length) {
    $('[data-type-modal]').on('click', function (e) {
        e.stopPropagation();
        const $key = e.key;
        const $this = $(this);
        const $typeModal = $this.data('type-modal');
        const $selectModal = $("[data-modal='" + $typeModal + "']");

        // if (!chromeAgent) {
        //     $('body').addClass('scroll-hidden');
        // }

        $selectModal.toggleClass('active');
    });

    $('.modal-close').on('click', function () {
        $(this).parents('.modal').removeClass('active');

        // if (!chromeAgent) {
        //     $('body').removeClass('scroll-hidden');
        // }
    });
    $(document).keyup(function (e) {
        if (e.key === 'Escape') {
            if ($('.modal').hasClass('active')) {
                $('.modal').removeClass('active');
            }
        }
    });
}
// End modal

// set stopPropagation
const setClickPropagation = (element) => {
    element.on('click', function (event) {
        event.stopPropagation();
    });
};

setClickPropagation($('.nav .wrapper, .modal .modal-wrapper__inner > *'));

// window click stop event
$(window).on('click', function (e) {
    if ($('.header,.nav').hasClass('active')) {
        $('.header,.nav,[data-hamburger]').removeClass('active');
    }
    if ($('.modal').hasClass('active')) {
        $('.modal').removeClass('active');
    }
});
