// ===== OTTER'S CORNER =====

console.log("Otter's Corner project is ready!");



/* =========================================
   MOBILE MENU
========================================= */

function openMobileMenu() {

    const mobileMenu =
        document.getElementById("mobileMenu");

    if (mobileMenu) {
        mobileMenu.classList.add("active");
    }

}


function closeMobileMenu() {

    const mobileMenu =
        document.getElementById("mobileMenu");

    if (mobileMenu) {
        mobileMenu.classList.remove("active");
    }

}



/* =========================================
   BACKGROUND MUSIC
   GLOBAL WEBSITE MUSIC
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const bgMusic =
        document.getElementById("bgMusic");

    const musicToggle =
        document.getElementById("musicToggle");


    if (!bgMusic || !musicToggle) {
        return;
    }


    /* =========================================
       SETTINGS
    ========================================= */

    bgMusic.volume = 0.4;


    const TIME_KEY =
        "otterMusicTime";

    const STATE_KEY =
        "otterMusicState";



    /* =========================================
       UPDATE BUTTON
    ========================================= */

    function updateButton() {

        if (bgMusic.paused) {

            musicToggle.textContent =
                "MUSIC OFF ♫";

        } else {

            musicToggle.textContent =
                "MUSIC ON ♫";

        }

    }



    /* =========================================
       RESTORE MUSIC POSITION
    ========================================= */

    function restorePosition() {

        const savedTime =
            parseFloat(
                localStorage.getItem(TIME_KEY) || "0"
            );


        if (
            !isNaN(savedTime) &&
            savedTime >= 0 &&
            isFinite(bgMusic.duration) &&
            bgMusic.duration > 0
        ) {

            try {

                bgMusic.currentTime =
                    Math.min(
                        savedTime,
                        Math.max(
                            0,
                            bgMusic.duration - 0.1
                        )
                    );

            } catch (error) {

                console.log(
                    "Cannot restore music position:",
                    error
                );

            }

        }

    }



    /* =========================================
       SAVE POSITION
    ========================================= */

    function savePosition() {

        if (
            !isNaN(bgMusic.currentTime) &&
            bgMusic.currentTime >= 0
        ) {

            localStorage.setItem(
                TIME_KEY,
                bgMusic.currentTime
            );

        }

    }



    /* =========================================
       START MUSIC
    ========================================= */

    function startMusic() {

        restorePosition();


        bgMusic.play()
            .then(function () {

                localStorage.setItem(
                    STATE_KEY,
                    "on"
                );


                updateButton();


                console.log(
                    "🎵 Music ON"
                );

            })
            .catch(function (error) {

                console.log(
                    "Music playback blocked:",
                    error
                );


                updateButton();

            });

    }



    /* =========================================
       STOP MUSIC
    ========================================= */

    function stopMusic() {

        savePosition();


        bgMusic.pause();


        localStorage.setItem(
            STATE_KEY,
            "off"
        );


        updateButton();


        console.log(
            "🔇 Music OFF"
        );

    }



    /* =========================================
       MUSIC BUTTON
    ========================================= */

    musicToggle.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();


            if (bgMusic.paused) {

                /*
                 * Bấm OFF → ON
                 */

                startMusic();

            } else {

                /*
                 * Bấm ON → OFF
                 */

                stopMusic();

            }

        }
    );



    /* =========================================
       AUTO START
       KHI NGƯỜI DÙNG LƯỚT / CHẠM
    ========================================= */

    function autoStartMusic() {

        /*
         * Nếu người dùng đã chủ động
         * tắt nhạc thì KHÔNG tự bật lại.
         */

        const savedState =
            localStorage.getItem(
                STATE_KEY
            );


        if (savedState === "off") {

            return;

        }


        /*
         * Nếu nhạc đang chạy
         * thì không làm gì.
         */

        if (!bgMusic.paused) {

            return;

        }


        startMusic();

    }



    /* =========================================
       LƯỚT CHUỘT / TRACKPAD
    ========================================= */

    window.addEventListener(
        "wheel",
        autoStartMusic,
        {
            passive: true
        }
    );



    /* =========================================
       LƯỚT / CHẠM ĐIỆN THOẠI
    ========================================= */

    window.addEventListener(
        "touchmove",
        autoStartMusic,
        {
            passive: true
        }
    );



    /* =========================================
       CHẠM MÀN HÌNH
    ========================================= */

    window.addEventListener(
        "touchstart",
        function (event) {

            /*
             * Nếu chạm chính nút Music
             * thì không tự xử lý.
             */

            if (
                event.target.closest(
                    "#musicToggle"
                )
            ) {

                return;

            }


            autoStartMusic();

        },
        {
            passive: true
        }
    );



    /* =========================================
       KEYBOARD
    ========================================= */

    window.addEventListener(
        "keydown",
        autoStartMusic,
        {
            once: true
        }
    );



    /* =========================================
       SAVE MUSIC POSITION
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
       SAVE BEFORE LEAVING
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



    /* =========================================
       INITIAL BUTTON
    ========================================= */

    /*
     * Khi mở một trang mới:
     *
     * OFF → hiện OFF
     * ON  → nếu browser cho phép tiếp tục
     *       thì vẫn giữ trạng thái ON
     *
     * Tuyệt đối không tự play khi vừa load.
     */

    updateButton();

});
