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



    /* ===== BUTTON ===== */

    function updateButton() {

        if (bgMusic.paused) {

            musicToggle.textContent =
                "MUSIC OFF ♫";

        } else {

            musicToggle.textContent =
                "MUSIC ON ♫";

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
                Math.max(
                    0,
                    bgMusic.duration - 0.1
                )
            );

        }

    }



    /* ===== START MUSIC ===== */

    function startMusic() {

        const savedState =
            localStorage.getItem(
                "otterMusicState"
            ) || "on";


        /* Người dùng đã tắt nhạc */

        if (savedState === "off") {

            bgMusic.pause();

            updateButton();

            return;

        }



        function playMusic() {

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


                    /* 
                       Chưa phát được vì trình duyệt chặn autoplay.
                       Hiện trạng thái OFF.
                    */

                    updateButton();

                });

        }



        if (bgMusic.readyState >= 1) {

            playMusic();

        } else {

            bgMusic.addEventListener(
                "loadedmetadata",
                playMusic,
                { once: true }
            );

        }

    }



    /* ===== START MUSIC ===== */

    startMusic();



    /* ===== MUSIC ON / OFF BUTTON ===== */

    musicToggle.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();



            /* ===== OFF → ON ===== */

            if (bgMusic.paused) {

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

            }


            /* ===== ON → OFF ===== */

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



    /* ===== SAVE MUSIC POSITION ===== */

    setInterval(
        function () {

            if (!bgMusic.paused) {

                localStorage.setItem(
                    "otterMusicTime",
                    bgMusic.currentTime
                );

            }

        },
        500
    );



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



    /* ===== AUTOPLAY FALLBACK ===== */

    document.addEventListener(
        "pointerdown",
        function (event) {

            /* Không ảnh hưởng khi bấm nút MUSIC */

            if (
                event.target.closest("#musicToggle")
            ) {
                return;
            }



            /* Người dùng đã chủ động tắt */

            if (
                localStorage.getItem(
                    "otterMusicState"
                ) === "off"
            ) {
                return;
            }



            /* Nhạc đang phát rồi */

            if (!bgMusic.paused) {
                return;
            }



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
                        "Music still blocked:",
                        error
                    );

                });

        }
    );



    /* ===== INITIAL BUTTON STATE ===== */

    updateButton();

});
