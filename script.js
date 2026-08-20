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

    bgMusic.volume = 0.4;

    const savedTime = parseFloat(
        localStorage.getItem("otterMusicTime") || "0"
    );

    const savedState =
        localStorage.getItem("otterMusicState") || "on";


    /* ===== CẬP NHẬT NÚT ===== */

    function updateButton() {

        if (bgMusic.paused) {
            musicToggle.textContent = "MUSIC OFF ♫";
        } else {
            musicToggle.textContent = "MUSIC ON ♫";
        }

    }


    /* ===== KHÔI PHỤC VỊ TRÍ ===== */

    function restorePosition() {

        if (
            !isNaN(savedTime) &&
            savedTime > 0 &&
            isFinite(bgMusic.duration)
        ) {

            // Không cho currentTime vượt quá thời lượng bài
            bgMusic.currentTime = Math.min(
                savedTime,
                bgMusic.duration - 0.1
            );

            console.log(
                "Restored music position:",
                bgMusic.currentTime
            );

        }

    }


    /*
     * Khi metadata đã sẵn sàng
     * thì khôi phục vị trí trước khi phát.
     */

    if (bgMusic.readyState >= 1) {

        restorePosition();

    } else {

        bgMusic.addEventListener(
            "loadedmetadata",
            restorePosition,
            { once: true }
        );

    }


    /* ===== PHÁT NHẠC SAU KHI KHÔI PHỤC ===== */

    function playMusic() {

        // Nếu người dùng đã tắt nhạc
        // thì không tự phát.

        if (savedState === "off") {

            bgMusic.pause();
            updateButton();
            return;

        }


        // Đợi audio load xong rồi mới play
        // để currentTime không bị reset.

        function start() {

            restorePosition();

            bgMusic.play()
                .then(function () {

                    localStorage.setItem(
                        "otterMusicState",
                        "on"
                    );

                    updateButton();

                    console.log(
                        "Music resumed from:",
                        bgMusic.currentTime
                    );

                })
                .catch(function (error) {

                    console.log(
                        "Autoplay blocked:",
                        error
                    );
                    musicToggle.textContent =
                        "MUSIC ON ♫";

                });

        }


        if (bgMusic.readyState >= 1) {

            start();

        } else {

            bgMusic.addEventListener(
                "loadedmetadata",
                start,
                { once: true }
            );

        }

    }


    /* ===== TỰ PHÁT / KHÔI PHỤC ===== */

    playMusic();


    /* ===== MUSIC ON / OFF ===== */

    musicToggle.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            if (bgMusic.paused) {

                // OFF → ON

                bgMusic.play()
                    .then(function () {

                        localStorage.setItem(
                            "otterMusicState",
                            "on"
                        );

                        musicToggle.textContent =
                            "MUSIC ON ♫";

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

                musicToggle.textContent =
                    "MUSIC OFF ♫";

            }

        }
    );


    /* ===== LƯU VỊ TRÍ LIÊN TỤC ===== */

    setInterval(function () {

        if (!bgMusic.paused) {

            localStorage.setItem(
                "otterMusicTime",
                bgMusic.currentTime
            );

        }

    }, 500);


    /* ===== LƯU TRƯỚC KHI ĐỔI TRANG ===== */

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


    /* ===== IPHONE / SAFARI ===== */

    document.addEventListener(
        "pointerdown",
        function (event) {

            // Không can thiệp khi bấm Music

            if (
                event.target.closest("#musicToggle")
            ) {
                return;
            }


            // Người dùng đã OFF thì không tự bật

            if (
                localStorage.getItem(
                    "otterMusicState"
                ) === "off"
            ) {
                return;
            }


            if (!bgMusic.paused) {
                return;
            }


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
                        "Music still blocked:",
                        error
                    );

                });

        }
    );

});
