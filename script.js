```javascript
// ======================================================
// OTTER'S CORNER
// GLOBAL JAVASCRIPT
// ======================================================

console.log("Otter's Corner project is ready!");



// ======================================================
// MOBILE MENU
// ======================================================

function openMobileMenu() {

    const menu = document.getElementById("mobileMenu");

    if (menu) {
        menu.classList.add("active");
    }

}


function closeMobileMenu() {

    const menu = document.getElementById("mobileMenu");

    if (menu) {
        menu.classList.remove("active");
    }

}



// ======================================================
// GLOBAL BACKGROUND MUSIC
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");


    // --------------------------------------------------
    // Nếu trang không có Music thì bỏ qua
    // --------------------------------------------------

    if (!bgMusic || !musicToggle) {

        console.log("Music elements not found on this page.");

        return;

    }



    // --------------------------------------------------
    // MUSIC SETTINGS
    // --------------------------------------------------

    bgMusic.volume = 0.4;



    // --------------------------------------------------
    // LOCAL STORAGE
    // --------------------------------------------------

    const TIME_KEY = "otterMusicTime";
    const STATE_KEY = "otterMusicState";



    // --------------------------------------------------
    // LẤY VỊ TRÍ NHẠC ĐÃ LƯU
    // --------------------------------------------------

    function getSavedTime() {

        const value = parseFloat(
            localStorage.getItem(TIME_KEY)
        );

        if (
            !isNaN(value) &&
            isFinite(value) &&
            value >= 0
        ) {

            return value;

        }

        return 0;

    }



    // --------------------------------------------------
    // CẬP NHẬT NÚT MUSIC
    // --------------------------------------------------

    function updateMusicButton() {

        if (bgMusic.paused) {

            musicToggle.textContent = "MUSIC OFF ♫";

        } else {

            musicToggle.textContent = "MUSIC ON ♫";

        }

    }



    // --------------------------------------------------
    // KHÔI PHỤC VỊ TRÍ NHẠC
    // --------------------------------------------------

    function restoreMusicPosition() {

        const savedTime = getSavedTime();


        if (
            savedTime <= 0
        ) {

            return;

        }


        if (
            isFinite(bgMusic.duration) &&
            bgMusic.duration > 0
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



    // --------------------------------------------------
    // AUDIO ĐÃ LOAD METADATA
    // --------------------------------------------------

    function audioReady() {

        restoreMusicPosition();

        updateMusicButton();

    }


    if (bgMusic.readyState >= 1) {

        audioReady();

    } else {

        bgMusic.addEventListener(
            "loadedmetadata",
            audioReady,
            { once: true }
        );

    }



    // ==================================================
    // START MUSIC
    // ==================================================

    function startMusic() {

        restoreMusicPosition();


        bgMusic.play()

            .then(function () {

                localStorage.setItem(
                    STATE_KEY,
                    "on"
                );


                updateMusicButton();


                console.log(
                    "🎵 Music ON — position:",
                    bgMusic.currentTime
                );

            })

            .catch(function (error) {

                console.log(
                    "Music playback blocked:",
                    error
                );


                updateMusicButton();

            });

    }



    // ==================================================
    // STOP MUSIC
    // ==================================================

    function stopMusic() {

        // Lưu vị trí trước khi pause

        localStorage.setItem(
            TIME_KEY,
            bgMusic.currentTime
        );


        bgMusic.pause();


        localStorage.setItem(
            STATE_KEY,
            "off"
        );


        updateMusicButton();


        console.log(
            "🔇 Music OFF — position:",
            bgMusic.currentTime
        );

    }



    // ==================================================
    // MUSIC BUTTON
    // ==================================================

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



    // ==================================================
    // USER INTERACTION
    // ==================================================

    function startMusicFromInteraction() {

        /*
         * Nếu người dùng đã chủ động
         * tắt Music thì không tự bật lại.
         */

        const savedState =
            localStorage.getItem(STATE_KEY);


        if (
            savedState === "off"
        ) {

            return;

        }


        /*
         * Nếu Music đang chạy
         * thì không làm gì.
         */

        if (
            !bgMusic.paused
        ) {

            return;

        }


        startMusic();

    }



    // ==================================================
    // CLICK / TAP
    // ==================================================

    document.addEventListener(
        "pointerdown",
        function (event) {

            /*
             * Không kích hoạt khi click
             * chính nút Music.
             */

            if (
                event.target.closest(
                    "#musicToggle"
                )
            ) {

                return;

            }


            startMusicFromInteraction();

        }
    );



    // ==================================================
    // MOUSE WHEEL / TRACKPAD
    // ==================================================

    window.addEventListener(
        "wheel",
        function () {

            startMusicFromInteraction();

        },
        {
            passive: true
        }
    );



    // ==================================================
    // MOBILE TOUCH
    // ==================================================

    window.addEventListener(
        "touchstart",
        function () {

            startMusicFromInteraction();

        },
        {
            passive: true
        }
    );



    // ==================================================
    // KEYBOARD
    // ==================================================

    window.addEventListener(
        "keydown",
        function () {

            startMusicFromInteraction();

        }
    );



    // ==================================================
    // SAVE MUSIC POSITION
    // ==================================================

    setInterval(
        function () {

            if (
                !bgMusic.paused
            ) {

                localStorage.setItem(
                    TIME_KEY,
                    bgMusic.currentTime
                );

            }

        },
        500
    );



    // ==================================================
    // SAVE WHEN LEAVING PAGE
    // ==================================================

    window.addEventListener(
        "pagehide",
        function () {

            localStorage.setItem(
                TIME_KEY,
                bgMusic.currentTime
            );

        }
    );


    window.addEventListener(
        "beforeunload",
        function () {

            localStorage.setItem(
                TIME_KEY,
                bgMusic.currentTime
            );

        }
    );



    // ==================================================
    // INITIAL BUTTON STATE
    // ==================================================

    updateMusicButton();

});
```
