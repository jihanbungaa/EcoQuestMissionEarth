document.addEventListener('DOMContentLoaded', () => {
    const lines = [
        "🏙️ Sampah yang kalian ambil di sungai!",
        "🗑️ dan sampah yang bertebaran sudah kalian tangkap.",
        "♻️ sekarang saatnya kalian kumpulkan semua sampahnya",
        "🚮 dan kalian pilah pilah sampah sesuai jenis nya!",
        "🌟 Siap jadi pahlawan lingkungan? Yuk mulai petualangan pilah sampah!"
    ];

    const container = document.getElementById('text-container');
    const nextButton = document.getElementById('btn-selanjutnya');
    const skipButton = document.getElementById('btn-skip');

    let currentLine = 0;
    let isSkipped = false;
    let typingInterval; // Tambah variable untuk menyimpan interval

    function typeLine(text, callback) {
        const p = document.createElement('p');
        p.className = 'text-line';
        container.appendChild(p);
        
        let i = 0;
        typingInterval = setInterval(() => { // Simpan interval ke variable
            if (isSkipped) {
                clearInterval(typingInterval); // Clear interval saat skip
                p.innerHTML = text;
                if (callback) callback();
                return;
            }
            if (i < text.length) {
                p.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                if (callback) callback();
            }
        }, 40);
    }

    function showNextLine() {
        if (currentLine < lines.length) {
            typeLine(lines[currentLine], () => {
                currentLine++;
                if (currentLine === lines.length) {
                    nextButton.style.display = 'block';
                } else {
                    setTimeout(showNextLine, 500);
                }
            });
        }
    }

    // Sembunyikan tombol selanjutnya di awal
    nextButton.style.display = 'none';

    // Jalankan animasi cutscene
    showNextLine();

    nextButton.addEventListener('click', () => {
        window.location.href = 'Penjelasan.html';
    });

    skipButton.addEventListener('click', () => {
        isSkipped = true;
        clearInterval(typingInterval); // Clear interval yang sedang berjalan
        container.innerHTML = '';
        lines.forEach(line => {
            const p = document.createElement('p');
            p.className = 'text-line';
            p.innerHTML = line;
            container.appendChild(p);
        });
        nextButton.style.display = 'block';
    });
});