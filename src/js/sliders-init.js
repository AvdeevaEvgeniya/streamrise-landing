const initSliders = function () {
    const sliders4cols = document.querySelectorAll(".swiper._4-col");
    if (sliders4cols.length > 0) {
        sliders4cols.forEach(function (item) {
            const cont = item.closest(".swiper-parent");
            let prev, next, pagination, autoheight, fraction, loop;
            if (cont) {
                prev = cont.querySelector(".swiper-button-prev") || cont.querySelector(".swiper-btn-prev");
                next = cont.querySelector(".swiper-button-next") || cont.querySelector(".swiper-btn-next");
                pagination = cont.querySelector(".swiper-pagination");
                fraction = cont.dataset.fraction;
                autoheight = cont.dataset.autoheight;
                loop = cont.dataset.loop;
            }
            new Swiper(item, {
                slidesPerView: 1.15,
                spaceBetween: 15,
                // allowTouchMove: false,
                loop: loop ? true : false,
                navigation: {
                    nextEl: next ? next : "",
                    prevEl: prev ? prev : "",
                },
                autoHeight: autoheight ? true : false,
                speed: 1000,
                watchSlidesProgress: true,
                pagination: {
                    el: pagination ? pagination : "",
                    type: fraction ? 'fraction' : 'bullets',
                    clickable: true,
                },
                breakpoints: {
                    530: {
                        slidesPerView: 1.4,
                        spaceBetween: 15,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 25
                    },
                    1100: {
                        slidesPerView: 3,
                        spaceBetween: 25
                    },
                    1501: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                    1600: {
                        slidesPerView: 4,
                        spaceBetween: 45
                    },
                }
            })
        })
    }
    const sliders3cols = document.querySelectorAll(".swiper._3-col");
    if (sliders3cols.length > 0) {
        sliders3cols.forEach(function (item) {
            const cont = item.closest(".swiper-parent");
            let prev, next, pagination, autoheight, fraction, loop;
            if (cont) {
                prev = cont.querySelector(".swiper-button-prev") || cont.querySelector(".swiper-btn-prev");
                next = cont.querySelector(".swiper-button-next") || cont.querySelector(".swiper-btn-next");
                pagination = cont.querySelector(".swiper-pagination");
                fraction = cont.dataset.fraction;
                autoheight = cont.dataset.autoheight;
                loop = cont.dataset.loop;
            }
            new Swiper(item, {
                slidesPerView: 1.15,
                spaceBetween: 15,
                // allowTouchMove: false,
                loop: loop ? true : false,
                navigation: {
                    nextEl: next ? next : "",
                    prevEl: prev ? prev : "",
                },
                autoHeight: autoheight ? true : false,
                speed: 1000,
                watchSlidesProgress: true,
                pagination: {
                    el: pagination ? pagination : "",
                    type: fraction ? 'fraction' : 'bullets',
                    clickable: true,
                },
                breakpoints: {
                    530: {
                        slidesPerView: 1.4,
                        spaceBetween: 15,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1400: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    1500: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    },
                }
            })
        })
    }
},
initNoSwipe = function () {
    if (!document.querySelector('.range')) {
        return;
    }
    document.querySelectorAll('.range').forEach(slider => {
        const swiper = slider.closest(".swiper").swiper;
        slider.addEventListener('pointerdown', () => {
            swiper.allowTouchMove = false;
        });
        slider.addEventListener('pointerup', () => {
            swiper.allowTouchMove = true;
        });
        slider.addEventListener('pointerleave', () => {
            swiper.allowTouchMove = true;
        });
    });
}

initSliders();
initNoSwipe();
