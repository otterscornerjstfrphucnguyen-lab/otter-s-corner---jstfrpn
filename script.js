// File này để thêm các hiệu ứng/tính năng sau này.
// Hiện tại website đã hoạt động mà không cần chỉnh gì ở đây.
console.log("Otter's Corner project is ready!");
/* ===== BACKGROUND MUSIC ===== */

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

if (bgMusic && musicToggle) {

    bgMusic.volume = 0.4;

    musicToggle.addEventListener("click", function () {

        if (bgMusic.paused) {

            bgMusic.play();
            musicToggle.textContent = "MUSIC ON ♫";

        } else {

            bgMusic.pause();
            musicToggle.textContent = "MUSIC OFF ♫";

        }

    });

}
