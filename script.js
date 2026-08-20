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


    // ===== TRẠNG THÁI NÚT =====

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

            // Autoplay được cho phép
            musicToggle.textContent = "MUSIC ON ♫";

            console.log("Music is playing.");

        })
        .catch(function (error) {

            // Trình duyệt chặn autoplay
            console.log("Autoplay blocked:", error);

            // Vẫn hiển thị ON vì người dùng chưa tắt nhạc
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

                    console.log("Cannot play music:", error);

                });

        } else {

            // ON → OFF
            bgMusic.pause();

            musicToggle.textContent = "MUSIC OFF ♫";

            console.log("Music OFF.");

        }

    });


    // ===== IPHONE / SAFARI AUTOPLAY =====
    // Nếu autoplay bị chặn, lần đầu người dùng
    // chạm vào TRANG (không phải nút Music)
    // thì nhạc sẽ bắt đầu.

    document.addEventListener("pointerdown", function startMusic(event) {

        // Nếu người dùng đang bấm nút Music thì
        // không can thiệp vào nút.
        if (event.target.closest("#musicToggle")) {
            return;
        }

        // Nếu nhạc đã chạy thì không làm gì.
        if (!bgMusic.paused) {
            return;
        }

        bgMusic.play()
            .then(function () {

                musicToggle.textContent = "MUSIC ON ♫";

                console.log("Music started after user interaction.");

            })
            .catch(function (error) {
});

    });

});
                console.log("Music still blocked:", error);
