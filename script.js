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



/* =========================================
   BACKGROUND MUSIC — OTTER'S CORNER
   Đồng bộ toàn bộ website
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");

    if (!bgMusic || !musicToggle) {
        console.log("Music elements not found.");
        return;
    }


    /* ===== MUSIC SETTINGS ===== */

    bgMusic.volume = 0.4;


    /* ===== LOAD SAVED DATA ===== */

    let savedTime = parseFloat(
        localStorage.getItem("otterMusicTime") || "0"
    );

    let savedState =
        localStorage.getItem("otterMusicState") || "on";


    /* ===== UPDATE BUTTON ===== */

    function updateButton() {

        if (bgMusic.paused) {

            musicToggle.textContent = "MUSIC OFF ♫";

        } else {

            musicToggle.textContent = "MUSIC ON ♫";

        }

    }


    /* ===== RESTORE POSITION ===== */

    function restorePosition() {

        if (
            !isNaN(savedTime) &&
            savedTime >= 0 &&
            isFinite(bgMusic.duration) &&
            bgMusic.duration > 0
        ) {

            bgMusic.currentTime = Math.min(
                savedTime,
                bgMusic.duration - 0.1
            );

        }

    }


    /* ===== SAVE CURRENT POSITION ===== */

    function savePosition() {

        if (
            !isNaN(bgMusic.currentTime) &&
            bgMusic.currentTime >= 0
        ) {

            localStorage.setItem(
                "otterMusicTime",
                bgMusic.currentTime
            );

        }

    }


    /* ===== WHEN AUDIO READY ===== */

    function prepareMusic() {

        restorePosition();

        updateButton();

    }


    if (bgMusic.readyState >= 1) {

        prepareMusic();

    } else {

        bgMusic.addEventListener(
            "loadedmetadata",
            prepareMusic,
            { once: true }
        );

    }


    /* ===== START MUSIC ===== */

    function startMusic() {

        restorePosition();

        bgMusic.play()
            .then(function () {

                localStorage.setItem(
                    "otterMusicState",
                    "on"
                );

                updateButton();

                console.log(
                    "🎵 Music ON — time:",
                    bgMusic.currentTime
                );

            })
            .catch(function (error) {

                console.log(
                    "Music play blocked:",
                    error
                );

                updateButton();

            });

    }


    /* ===== STOP MUSIC ===== */

    function stopMusic() {

        savePosition();

        bgMusic.pause();

        localStorage.setItem(
            "otterMusicState",
            "off"
        );

        updateButton();

    }


    /* ===== MUSIC BUTTON ===== */

    musicToggle.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            if (bgMusic.paused) {

                startMusic();

            } else {

                stopMusic();

            }

        }
    );


    /* =========================================
       FIRST USER INTERACTION
    ========================================= */

    function userInteraction() {

        /*
         * Nếu nhạc đang OFF do người dùng
         * bấm nút OFF thì không tự bật lại.
         */

        const state =
            localStorage.getItem(
                "otterMusicState"
            );


        if (state === "off") {
            return;
        }


        if (!bgMusic.paused) {
            return;
        }


        startMusic();

    }


    /* ===== CLICK ===== */

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

            userInteraction();

        }
    );


    /* ===== WHEEL ===== */

    window.addEventListener(
        "wheel",
        userInteraction,
        { passive: true }
    );


    /* ===== TOUCH ===== */

    window.addEventListener(
        "touchstart",
        userInteraction,
        { passive: true }
    );


    /* ===== KEYBOARD ===== */

    window.addEventListener(
        "keydown",
        userInteraction
    );


    /* =========================================
       SAVE MUSIC TIME CONTINUOUSLY
    ========================================= */

    setInterval(
        function () {

            if (!bgMusic.paused) {

                savePosition();

            }

        },
        500
    );


    /* =========================================
       SAVE BEFORE LEAVING PAGE
    ========================================= */

    window.addEventListener(
        "pagehide",
        function () {

            savePosition();

        }
    );


    window.addEventListener(
        "beforeunload",
        function () {

            savePosition();

        }
    );


    /* ===== INITIAL BUTTON ===== */

    updateButton();

});
