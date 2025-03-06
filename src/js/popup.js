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
