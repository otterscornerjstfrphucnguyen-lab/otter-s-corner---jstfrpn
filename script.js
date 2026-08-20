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


    // ===== UPDATE BUTTON =====

    function updateMusicButton() {

        if (bgMusic.paused) {
            musicToggle.textContent = "MUSIC OFF ♫";
        } else {
            musicToggle.textContent = "MUSIC ON ♫";
        }

    }


    // ===== AUTOPLAY =====

    bgMusic.play()
        .then(function () {

            musicToggle.textContent = "MUSIC ON ♫";

        })
        .catch(function (error) {

            console.log("Autoplay bị trình duyệt chặn:", error);

            updateMusicButton();

        });


    // ===== ON / OFF BUTTON =====

    musicToggle.addEventListener("click", function (event) {

        event.stopPropagation();

        if (bgMusic.paused) {

            bgMusic.play()
                .then(function () {

                    musicToggle.textContent = "MUSIC ON ♫";

                })
                .catch(function (error) {

                    console.log("Cannot play music:", error);

                });

        } else {

            bgMusic.pause();

            musicToggle.textContent = "MUSIC OFF ♫";

        }

    });


    // ===== IPHONE / SAFARI AUTOPLAY FALLBACK =====

    function playAfterInteraction() {

        // Nếu nhạc đang OFF do người dùng bấm nút
        // thì không tự bật lại
        if (bgMusic.paused && musicToggle.textContent === "MUSIC OFF ♫") {
            return;
        }

        if (bgMusic.paused) {

            bgMusic.play()
                .then(function () {

                    musicToggle.textContent = "MUSIC ON ♫";

                })
                .catch(function () {

                    console.log("Music cannot start yet.");

                });

        }

    }


    document.addEventListener("pointerdown", playAfterInteraction, {
        once: true
    });

});
