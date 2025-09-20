document.addEventListener("DOMContentLoaded", function() {                            
    const btnBelajarKembali = document.getElementById("btn-KembaliBelajar");
    const btnKembali = document.getElementById("btn-kembali");
    const btnSelanjutnya = document.getElementById("btn-SelanjutnyaBelajar");
    const chalkText = document.getElementById("chalk-text");
    const kapur = document.getElementById("kapur");

    // === Navigasi Tombol ===
    if (btnKembali) {
        btnKembali.addEventListener("click", function() {
            window.location.href = "../TampilanUtama/TampilanUtama.html"; 
        });
    }

    if (btnBelajarKembali) {
        btnBelajarKembali.addEventListener("click", function() {
            window.location.href = "Halaman1.html"; 
        });
    }

    if (btnSelanjutnya) {
        btnSelanjutnya.addEventListener("click", function() {
            window.location.href = "Halaman3.html"; 
        });
    }

    // === Efek Menulis Kapur ===
    if (chalkText && kapur) {
        const text = "Selamat datang di EcoQuest!\nMari kita belajar menjaga bumi bersama-sama 🌱";
        let index = 0;

        function writeChalk() {
            if (index < text.length) {
                chalkText.textContent += text[index];
                kapur.style.display = "block";

                try {
                    // Ambil posisi huruf terakhir yang baru ditulis
                    const range = document.createRange();
                    range.setStart(chalkText.firstChild, index);
                    range.setEnd(chalkText.firstChild, index + 1);
                    const rects = range.getBoundingClientRect();

                    // Geser kapur ke huruf terakhir
                    kapur.style.top = rects.top + window.scrollY - 20 + "px";
                    kapur.style.left = rects.right + window.scrollX + "px";
                } catch (e) {
                    // fallback kalau error (misalnya di huruf pertama)
                    kapur.style.top = chalkText.offsetTop + "px";
                    kapur.style.left = chalkText.offsetLeft + "px";
                }

                index++;
                setTimeout(writeChalk, 80); // kecepatan menulis
            } else {
                kapur.style.display = "none"; // sembunyikan setelah selesai
            }
        }

        writeChalk();
    }
});
