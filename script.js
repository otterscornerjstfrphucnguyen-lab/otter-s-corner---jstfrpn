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

    musicToggle.addEventListener("click", function () {

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

});
