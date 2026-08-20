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


    /* ===== MUSIC SETTINGS ===== */

    bgMusic.volume = 0.4;

    const savedTime = localStorage.getItem("otterMusicTime");
    const savedState = localStorage.getItem("otterMusicState");


    /* ===== KHÔI PHỤC VỊ TRÍ BÀI NHẠC ===== */

    if (savedTime) {

        bgMusic.addEventListener("loadedmetadata", function () {

            const time = parseFloat(savedTime);

            if (!isNaN(time) && time < bgMusic.duration) {
                bgMusic.currentTime = time;
            }

        }, { once: true });

    }


    /* ===== CẬP NHẬT NÚT MUSIC ===== */

    function updateMusicButton() {

        if (bgMusic.paused) {
            musicToggle.textContent = "MUSIC OFF ♫";
        } else {
            musicToggle.textContent = "MUSIC ON ♫";
        }

    }


    /* ===== LƯU VỊ TRÍ NHẠC ===== */

    function saveMusicPosition() {

        if (!bgMusic.paused) {
            localStorage.setItem(
                "otterMusicTime",
                bgMusic.currentTime
            );
        }

    }


    /* ===== TỰ PHÁT KHI MỞ WEB ===== */

    // Nếu người dùng đã tắt nhạc trước đó
    // thì trang mới KHÔNG được tự bật lại.

    if (savedState !== "off") {

        bgMusic.play()
            .then(function () {

                localStorage.setItem("otterMusicState", "on");

                updateMusicButton();

                console.log("Music is playing.");

            })
            .catch(function (error) {

                console.log(
                    "Autoplay bị trình duyệt chặn:",
                    error
                );

                // Vẫn hiện ON vì người dùng chưa chủ động tắt
                musicToggle.textContent = "MUSIC ON ♫";

            });

    } else {

        bgMusic.pause();

        musicToggle.textContent = "MUSIC OFF ♫";

    }


    /* ===== MUSIC ON / OFF ===== */

    musicToggle.addEventListener("click", function (event) {

        // Không cho sự kiện click chạy sang phần fallback
        event.stopPropagation();


        if (bgMusic.paused) {

            // ===== OFF → ON =====

            bgMusic.play()
                .then(function () {

                    localStorage.setItem(
                        "otterMusicState",
                        "on"
                        );

                    musicToggle.textContent = "MUSIC ON ♫";

                    console.log("Music ON.");

                })
                .catch(function (error) {

                    console.log(
                        "Không thể phát nhạc:",
                        error
                    );

                });


        } else {

            // ===== ON → OFF =====

            bgMusic.pause();

            localStorage.setItem(
                "otterMusicState",
                "off"
            );

            localStorage.setItem(
                "otterMusicTime",
                bgMusic.currentTime
            );

            musicToggle.textContent = "MUSIC OFF ♫";

            console.log("Music OFF.");

        }

    });


    /* ===== LƯU VỊ TRÍ TRONG LÚC ĐANG PHÁT ===== */

    setInterval(function () {

        if (!bgMusic.paused) {

            localStorage.setItem(
                "otterMusicTime",
                bgMusic.currentTime
            );

        }

    }, 1000);


    /* ===== LƯU NGAY TRƯỚC KHI CHUYỂN TRANG ===== */

    window.addEventListener("beforeunload", function () {

        localStorage.setItem(
            "otterMusicTime",
            bgMusic.currentTime
        );

    });


    window.addEventListener("pagehide", function () {

        localStorage.setItem(
            "otterMusicTime",
            bgMusic.currentTime
        );

    });


    /* ===== IPHONE / SAFARI AUTOPLAY FALLBACK ===== */

    document.addEventListener("pointerdown", function startMusic(event) {

        // Nếu đang bấm nút MUSIC thì không can thiệp
        if (event.target.closest("#musicToggle")) {
            return;
        }


        // Nếu người dùng đã chủ động OFF
        // thì không tự bật lại.

        if (
            localStorage.getItem("otterMusicState") === "off"
        ) {
            return;
        }


        // Nếu nhạc đang chạy thì không làm gì

        if (!bgMusic.paused) {
            return;
        }


        bgMusic.play()
            .then(function () {

                localStorage.setItem(
                    "otterMusicState",
                    "on"
                );

                musicToggle.textContent = "MUSIC ON ♫";

                console.log(
                    "Music started after user interaction."
                );

            })
            .catch(function (error) {

                console.log(
                    "Music still blocked:",
                    error
                );

            });

    });

});
