// ===== OTTER'S CORNER =====

console.log("Otter's Corner project is ready!");



/* ===== MOBILE MENU ===== */

function openMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");

    if (mobileMenu) {
        mobileMenu.classList.add("active");
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu");

    if (mobileMenu) {
        mobileMenu.classList.remove("active");
    }
}



/* ===== BACKGROUND MUSIC ===== */

document.addEventListener("DOMContentLoaded", function () {

    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");


    /* Không có nhạc trên trang này thì bỏ qua */

    if (!bgMusic || !musicToggle) {
        return;
    }


    bgMusic.volume = 0.4;


    /* ===== LẤY TRẠNG THÁI ĐÃ LƯU ===== */

    const savedState =
        localStorage.getItem("otterMusicState");


    /* ===== CẬP NHẬT NÚT ===== */

    function updateButton() {

        if (bgMusic.paused) {

            musicToggle.textContent =
                "MUSIC OFF ♫";

        } else {

            musicToggle.textContent =
                "MUSIC ON ♫";

        }

    }


    /* ===== KHÔI PHỤC VỊ TRÍ NHẠC ===== */

    function restorePosition() {

        const savedTime = parseFloat(
            localStorage.getItem(
                "otterMusicTime"
            ) || "0"
        );


        if (
            !isNaN(savedTime) &&
            savedTime > 0 &&
            isFinite(bgMusic.duration)
        ) {

            bgMusic.currentTime = Math.min(
                savedTime,
                Math.max(
                    0,
                    bgMusic.duration - 0.1
                )
            );

        }

    }


    /* ===== PHÁT NHẠC ===== */

    function playMusic() {

        restorePosition();


        bgMusic.play()
            .then(function () {

                localStorage.setItem(
                    "otterMusicState",
                    "on"
                );

                updateButton();

            })
            .catch(function (error) {

                console.log(
                    "Music waiting for interaction:",
                    error
                );

                updateButton();

            });

    }


    /* ===== AUDIO SẴN SÀNG ===== */

    function setupMusic() {

        restorePosition();

        updateButton();


        /*
        Nếu trang trước nhạc đang bật
        thì cố gắng phát tiếp
        */

        if (savedState === "on") {

            playMusic();

        }

    }


    if (bgMusic.readyState >= 1) {

        setupMusic();

    } else {

        bgMusic.addEventListener(
            "loadedmetadata",
            setupMusic,
            { once: true }
        );

    }


    /* ===== CLICK NÚT MUSIC ===== */

    musicToggle.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            /* Nếu đang tắt → bật */

            if (bgMusic.paused) {

                playMusic();

            }


            /* Nếu đang bật → tắt */

            else {

                bgMusic.pause();


                localStorage.setItem(
                    "otterMusicState",
                    "off"
                );


                localStorage.setItem(
                    "otterMusicTime",
                    bgMusic.currentTime
                );


                updateButton();

            }

        }
    );


    /* ===== TƯƠNG TÁC ĐẦU TIÊN → BẬT NHẠC ===== */

    function startOnInteraction(event) {

        /*
        Không tự bật nếu người dùng
        đã chủ động tắt
        */

        if (
            localStorage.getItem(
                "otterMusicState"
            ) === "off"
        ) {
            return;
        }


        if (bgMusic.paused) {

            playMusic();

        }

    }


    document.addEventListener(
        "pointerdown",
        function (event) {

            if (
                event.target.closest(
                    "#musicToggle"
                )
            ) {
                return;
            }

            startOnInteraction();

        },
        { once: true }
    );


    window.addEventListener(
        "wheel",
        startOnInteraction,
        {
            once: true,
            passive: true
        }
    );


    window.addEventListener(
        "touchstart",
        startOnInteraction,
        {
            once: true,
            passive: true
        }
    );


    window.addEventListener(
        "keydown",
        startOnInteraction,
        { once: true }
    );


    /* ===== LƯU VỊ TRÍ LIÊN TỤC ===== */

    bgMusic.addEventListener(
        "timeupdate",
        function () {

            if (!bgMusic.paused) {

                localStorage.setItem(
                    "otterMusicTime",
                    bgMusic.currentTime
                );


                localStorage.setItem(
                    "otterMusicState",
                    "on"
                );

            }

        }
    );


    /* ===== LƯU KHI RỜI TRANG ===== */

    window.addEventListener(
        "pagehide",
        function () {

            localStorage.setItem(
                "otterMusicTime",
                bgMusic.currentTime
            );


            localStorage.setItem(
                "otterMusicState",
                bgMusic.paused
                    ? "off"
                    : "on"
            );

        }
    );

});
