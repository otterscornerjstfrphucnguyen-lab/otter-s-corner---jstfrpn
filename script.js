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


    // ===== CẬP NHẬT TRẠNG THÁI NÚT =====

    function updateButton() {

        if (bgMusic.paused) {
            musicToggle.textContent = "MUSIC OFF ♫";
        } else {
            musicToggle.textContent = "MUSIC ON ♫";
        }

    }


    // ===== TỰ PHÁT KHI MỞ WEB =====

    bgMusic.play()
        .then(function () {

            musicToggle.textContent = "MUSIC ON ♫";

        })
        .catch(function (error) {

            console.log("Autoplay bị trình duyệt chặn:", error);

            // Vẫn để ON vì người dùng chưa chủ động tắt
            musicToggle.textContent = "MUSIC ON ♫";

        });


    // ===== NÚT MUSIC ON / OFF =====

    musicToggle.addEventListener("click", function () {

        if (bgMusic.paused) {

            bgMusic.play()
                .then(function () {

                    musicToggle.textContent = "MUSIC ON ♫";

                })
                .catch(function (error) {

                    console.log("Không thể phát nhạc:", error);

                });

        } else {

            bgMusic.pause();

            musicToggle.textContent = "MUSIC OFF ♫";

        }

    });


    // ===== AUTOPLAY FALLBACK CHO IPHONE / SAFARI =====
    // Nếu trình duyệt chặn autoplay,
    // lần đầu người dùng chạm vào trang sẽ phát nhạc.

    let userTurnedOff = false;


    musicToggle.addEventListener("click", function () {

        if (bgMusic.paused) {
            userTurnedOff = true;
        } else {
            userTurnedOff = false;
        }

    });


    document.addEventListener("pointerdown", function () {

        if (userTurnedOff) {
            return;
        }

        if (bgMusic.paused) {

            bgMusic.play()
                .then(function () {

                    musicToggle.textContent = "MUSIC ON ♫";

                })
                .catch(function (error) {

                    console.log("Music still blocked:", error);

                });

        }

    }, { once: true });

});
