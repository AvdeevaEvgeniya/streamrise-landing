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