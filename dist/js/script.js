const initOpenPopups = function () {
    const openPopups = function (e) {
        const button = e.target.closest(".popupActivation");
        if (!button) {
            return;
        }
        e.preventDefault();
        const namePopup = button.dataset.popup,
            popup = document.querySelector(`.popup[data-popup='${namePopup}']`),
            popups = document.querySelectorAll(".popup");
        popups.forEach(function (item) {
            item.classList.remove("active");
            if (item.closest(".popup").querySelector(".popup-slider")) {
                item.closest(".popup").querySelector(".popup-slider").style.opacity = "0";
            }
        });
        popup.classList.add("active");
        document.body.style.overflowY = 'hidden';
        if (document.body.offsetHeight > window.innerHeight) {
            document.querySelector(".app__wrapper").style.overflowY = "scroll";
        }
    }
    document.addEventListener("click", openPopups);
}

const initClosePopups = function () {
    const closePopups = function (e) {
        if (!e.target.closest(".closePopup")) {
            if (!e.target.closest(".popup")
                || !e.target.closest(".popup__close")
                && e.target.closest(".popup__content")) {
                return;
            }
        }
        e.preventDefault();
        const popups = document.querySelectorAll(".popup");
        document.body.style = "";
        document.querySelector(".app__wrapper").style.overflowY = "";
        popups.forEach(function (item) {
            item.classList.remove("active");
        });
    }
    document.addEventListener("mousedown", closePopups);
}

const closePopup = function (popup) {
    document.body.style = "";
    document.querySelector(".app__wrapper").style.overflowY = "";
    popup.classList.remove("active");
    const iframes = popup.querySelectorAll("iframe");
    if (iframes.length > 0) {
        iframes.forEach(function (item) {
            item.src = "";
        })
    }
}

window.addEventListener("load", initOpenPopups);
window.addEventListener("load", initClosePopups);

const initClearInput = function () {
    const inputs = document.querySelectorAll(".input-interval__value input");
    if (inputs.length < 1) {
        return;
    }
    inputs.forEach(function (item) {
        if (item.value == item.min || item.value == item.max) {
            item.value = ""
        }
    })
}
const initRanges = function () {
    const rangesDouble = document.querySelectorAll(".range-double");
    rangesDouble.forEach(function (item) {
        let $range = $(item.querySelector(".input-range")),
            min = +item.querySelector(".input-range").dataset.min,
            max = +item.querySelector(".input-range").dataset.max;
        if (item.querySelector(".input-range__value01")) {
            let $inputFrom = $(item.querySelector(".input-range__value01")),
                $inputTo = $(item.querySelector(".input-range__value02")),
                instance,
                from = min,
                to = max;
            $range.ionRangeSlider({
                type: "double",
                min: min,
                max: max,
                hide_min_max: true,
                hide_from_to: true,
                force_edges: true,
                onStart: updateInputs,
                onChange: updateInputs,
                onFinish: updateInputs1
            });
            instance = $range.data("ionRangeSlider");
            function updateInputs (data) {
                from = data.from;
                to = data.to;
                $inputFrom.prop("value", from);
                $inputTo.prop("value", to);
            }
            function updateInputs1 (data) {
                from = data.from;
                to = data.to;
                $inputFrom.prop("value", from);
                $inputTo.prop("value", to);
                item.querySelector(".input-range__value01").dispatchEvent(new Event('input',{bubbles: true, cancelable: false, composed: false}));
            }
            $inputFrom.on("change", function () {
                var val = $(this).prop("value");
                // validate
                if (val < min) {
                    val = min;
                } else if (val > to) {
                    val = to;
                }
                instance.update({
                    from: val
                });
                $(this).prop("value", val);
            });
            $inputTo.on("change", function () {
                var val = $(this).prop("value");
                // validate
                if (val < from) {
                    val = from;
                } else if (val > max) {
                    val = max;
                }
                instance.update({
                    to: val
                });
                $(this).prop("value", val);
            });
        }
        $range.ionRangeSlider({
            type: "double",
            hide_min_max: true,
            force_edges: true
        });
    })
    const ranges = document.querySelectorAll(".range-input");
    ranges.forEach(function (item) {
        let $range = $(item);
        $range.ionRangeSlider({
            grid: true,
        });
    })
    initClearInput();
}
initRanges();

var rellax = new Rellax('.rellax', {
    speed: -2,
    center: false,
    round: true,
    vertical: true,
    horizontal: false
});

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

initNoSwipe();
initSliders();

const initToggleVideo = function () {
    if (!document.querySelector(".full-video")) {
        return;
    }
    const toggleVideo = function (e) {
        const btn = e.target.closest(".full-video__btn");
        if (!btn) {
            return;
        }
        e.preventDefault();
        const cont = btn.closest(".full-video");
        cont.classList.toggle("_active");
        cont.classList.contains("_active") ? cont.querySelector("video").play() : cont.querySelector("video").pause();
    }
    document.addEventListener("click", toggleVideo);
}

initToggleVideo();