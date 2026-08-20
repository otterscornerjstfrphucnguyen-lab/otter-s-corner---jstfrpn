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


    // ===== CẬP NHẬT NÚT MUSIC =====

    function updateMusicButton() {

        if (bgMusic.paused) {
            musicToggle.textContent = "MUSIC OFF ♫";
        } else {
            musicToggle.textContent = "MUSIC ON ♫";
        }

    }


    // ===== TỰ PHÁT NHẠC KHI MỞ WEB =====

    bgMusic.play()
        .then(function () {

            musicToggle.textContent = "MUSIC ON ♫";

            console.log("Music is playing.");

        })
        .catch(function (error) {

            console.log("Autoplay bị trình duyệt chặn:", error);

            // Người dùng chưa chủ động tắt
            // nên nút vẫn hiển thị ON
            musicToggle.textContent = "MUSIC ON ♫";

        });


    // ===== NÚT MUSIC ON / OFF =====

    musicToggle.addEventListener("click", function () {

        if (bgMusic.paused) {

            // OFF → ON
            bgMusic.play()
                .then(function () {

                    musicToggle.textContent = "MUSIC ON ♫";

                    console.log("Music ON.");

                })
                .catch(function (error) {

                    console.log("Không thể phát nhạc:", error);

                });

        } else {

            // ON → OFF
            bgMusic.pause();

            musicToggle.textContent = "MUSIC OFF ♫";

            console.log("Music OFF.");

        }

    });


    // ===== IPHONE / SAFARI AUTOPLAY FALLBACK =====
    // Nếu trình duyệt chặn autoplay,
    // lần đầu người dùng chạm vào trang
    // thì nhạc sẽ bắt đầu.

    document.addEventListener("pointerdown", function startMusic(event) {

        // Nếu đang bấm nút Music thì không can thiệp
        if (event.target.closest("#musicToggle")) {
            return;
        }

        // Nếu nhạc đang chạy thì không làm gì
        if (!bgMusic.paused) {
            return;
        }

        bgMusic.play()
            .then(function () {

                musicToggle.textContent = "MUSIC ON ♫";

                console.log("Music started after user interaction.");

            })
            .catch(function (error) {

                console.log("Music still blocked:", error);

            });

    });

});
