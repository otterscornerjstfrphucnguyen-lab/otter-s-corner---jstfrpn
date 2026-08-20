// ===== OTTER'S CORNER =====

console.log("Otter's Corner project is ready!");


/* ===== MOBILE MENU ===== */

function openMobileMenu() {
    document.getElementById("mobileMenu").classList.add("active");
}

function closeMobileMenu() {
    document.getElementById("mobileMenu").classList.remove("active");
}


/* ===== BACKGROUND MUSIC ===== */

document.addEventListener("DOMContentLoaded", function () {

    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggle");

    if (!bgMusic || !musicToggle) {
        console.log("Music elements not found.");
        return;
    }


    /* ===== SETTINGS ===== */

    bgMusic.volume = 0.4;

    const savedTime = parseFloat(
        localStorage.getItem("otterMusicTime") || "0"
    );

    const savedState =
        localStorage.getItem("otterMusicState") || "on";


    /* ===== BUTTON ===== */

    function updateButton() {

        if (bgMusic.paused) {
            musicToggle.textContent = "MUSIC OFF ♫";
        } else {
            musicToggle.textContent = "MUSIC ON ♫";
        }

    }


    /* ===== RESTORE MUSIC POSITION ===== */

    function restorePosition() {

        if (
            !isNaN(savedTime) &&
            savedTime > 0 &&
            isFinite(bgMusic.duration)
        ) {

            bgMusic.currentTime = Math.min(
                savedTime,
                Math.max(0, bgMusic.duration - 0.1)
            );

        }

    }


    /* ===== START MUSIC ===== */

    function startMusic() {

        if (
            localStorage.getItem("otterMusicState") === "off"
        ) {
            bgMusic.pause();
            updateButton();
            return;
        }


        function play() {

            restorePosition();

            bgMusic.play()
                .then(function () {

                    localStorage.setItem(
                        "otterMusicState",
                        "on"
                    );

                    updateButton();

                    console.log(
                        "🎵 Music playing from:",
                        bgMusic.currentTime
                    );

                })
                .catch(function (error) {

                    console.log(
                        "Autoplay blocked:",
                        error
                    );

                    // Vẫn hiện ON vì người dùng chưa tắt
                    musicToggle.textContent =
                        "MUSIC ON ♫";

                });

        }


        if (bgMusic.readyState >= 1) {
            play();
        } else {

            bgMusic.addEventListener(
                "loadedmetadata",
                play,
                { once: true }
            );

        }

    }


    /* ===== TỰ PHÁT NGAY KHI MỞ WEB ===== */

    startMusic();


    /* ===== MUSIC ON / OFF ===== */

    musicToggle.addEventListener(
        "click",
        function (event) {
            event.stopPropagation();


            if (bgMusic.paused) {

                // OFF → ON

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
                            "Cannot play music:",
                            error
                        );

                    });

            } else {

                // ON → OFF

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


    /* ===== SAVE POSITION ===== */

    setInterval(function () {

        if (!bgMusic.paused) {

            localStorage.setItem(
                "otterMusicTime",
                bgMusic.currentTime
            );

        }

    }, 500);


    /* ===== SAVE BEFORE LEAVING PAGE ===== */

    window.addEventListener(
        "pagehide",
        function () {

            localStorage.setItem(
                "otterMusicTime",
                bgMusic.currentTime
            );

        }
    );


    window.addEventListener(
        "beforeunload",
        function () {

            localStorage.setItem(
                "otterMusicTime",
                bgMusic.currentTime
            );

        }
    );


    /* ===== AUTOPLAY FALLBACK ===== */

    document.addEventListener(
        "pointerdown",
        function (event) {

            // Không can thiệp vào nút MUSIC
            if (
                event.target.closest("#musicToggle")
            ) {
                return;
            }


            // Người dùng đã OFF
            if (
                localStorage.getItem(
                    "otterMusicState"
                ) === "off"
            ) {
                return;
            }


            // Nhạc đang chạy
            if (!bgMusic.paused) {
                return;
            }


            // Thử phát sau tương tác
            restorePosition();

            bgMusic.play()
                .then(function () {

                    localStorage.setItem(
                        "otterMusicState",
                        "on"
                    );

                    updateButton();

                    console.log(
                        "🎵 Music started after interaction."
                    );

                })
                .catch(function (error) {

                    console.log(
                        "Music still blocked:",
                        error
                    );

                });

        }
    );

});
