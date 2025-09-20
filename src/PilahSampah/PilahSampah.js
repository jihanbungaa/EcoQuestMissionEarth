const trashItems = [
    { type: 'it', image: '../../Asset/sampah/cpu.png' },
    { type: 'teknik', image: '../../Asset/sampah/mesin.png' },
    { type: 'it', image: '../../Asset/sampah/pc2.png' },
    { type: 'it', image: '../../Asset/sampah/processor.png' },
    { type: 'teknik', image: '../../Asset/sampah/sampahteknik.png' },
    { type: 'tkp', image: '../../Asset/sampah/cat.png' },
    { type: 'tkp', image: '../../Asset/sampah/batu.png' },
    { type: 'it', image: '../../Asset/sampah/tkj.png' },
    { type: 'tkp', image: '../../Asset/sampah/serpihan.png' },
    { type: 'it', image: '../../Asset/sampah/batre.png' },
    { type: 'it', image: '../../Asset/sampah/komputer.png' },
    { type: 'tkp', image: '../../Asset/sampah/cangkir.png' },
    { type: 'teknik', image: '../../Asset/sampah/baut.png' },
    { type: 'tkp', image: '../../Asset/sampah/batako.png' },
    { type: 'teknik', image: '../../Asset/sampah/ban.png' }
];

let score = 0;
let lives = 3;
let timeLeft = 20;
let gameInterval;
let isGameOver = false;
let playerName = null;

/* ====================== GAME CORE ====================== */
function initGame() {
    updateUI();
    generateTrash(10); // spawn 10 sampah
    startTimer();
    setupDragAndDrop();
}

function updateUI() {
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    document.getElementById('time').textContent = timeLeft;
}

function generateTrash(count) {
    const gameArea = document.getElementById('game-area');
    const areaWidth = gameArea.offsetWidth - 60;
    const areaHeight = gameArea.offsetHeight;

    if (areaWidth <= 0 || areaHeight <= 0) {
        console.error("Game area belum punya ukuran!");
        return;
    }

    for (let i = 0; i < count; i++) {
        const trash = trashItems[Math.floor(Math.random() * trashItems.length)];
        const trashElement = document.createElement('img');
        trashElement.src = trash.image;
        trashElement.className = 'trash-item';
        trashElement.dataset.type = trash.type;

        const posX = Math.random() * areaWidth;
        const posY = Math.random() * (areaHeight - 100);

        trashElement.style.left = posX + 'px';
        trashElement.style.top = posY + 'px';

        gameArea.appendChild(trashElement);
    }
}

function setupDragAndDrop() {
    const trashElements = document.querySelectorAll('.trash-item');
    const bins = document.querySelectorAll('.bin');

    trashElements.forEach(trash => {
        trash.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', e.target.dataset.type);
            e.target.setAttribute('dragging', 'true');
        });

        trash.addEventListener('dragend', e => {
            e.target.removeAttribute('dragging');
        });

        trash.setAttribute('draggable', true);
    });

    bins.forEach(bin => {
        bin.addEventListener('dragover', e => e.preventDefault());
        bin.addEventListener('drop', handleDrop);
    });
}

function handleDrop(e) {
    e.preventDefault();
    const trashType = e.dataTransfer.getData('text/plain');
    const binType = e.target.closest('.bin').id.split('-')[0];
    const draggedElement = document.querySelector('.trash-item[dragging="true"]');

    if (draggedElement) {
        draggedElement.remove();

        if (trashType === binType) {
            score += 10;
            e.target.closest('.bin').style.transform = 'scale(1.1)';
            setTimeout(() => e.target.closest('.bin').style.transform = 'scale(1)', 200);
        } else {
            lives--;
            if (lives <= 0) {
                lives = 0;
                updateUI();
                endGame('lose');
                return;
            }
        }

        updateUI();
        checkWinCondition();
    }
}

function startTimer() {
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame('lose');
        }
    }, 1000);
}

function checkWinCondition() {
    const remainingTrash = document.querySelectorAll('.trash-item').length;
    if (remainingTrash === 0) {
        endGame('win');
    }
}

function endGame(result) {
    clearInterval(gameInterval);
    isGameOver = true;

    if (result === 'win') {
        document.getElementById('final-score').textContent = score;
        document.getElementById('victory-popup').classList.remove('hidden');
        saveToLeaderboard(playerName || "Anonim", score, 'Pilah Sampah');
    } else {
        document.getElementById('final-score-lose').textContent = score;
        document.getElementById('gameover-popup').classList.remove('hidden');
        saveToLeaderboard(playerName || "Anonim", score, 'Pilah Sampah');
    }
}

function saveToLeaderboard(name, score, game) {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name, score, game, date: new Date().toISOString() });
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function resetGame() {
    score = 0;
    lives = 3;
    timeLeft = 20;
    isGameOver = false;

    if (gameInterval) clearInterval(gameInterval);

    const trashItemsEl = document.querySelectorAll('.trash-item');
    trashItemsEl.forEach(item => item.remove());

    updateUI();
    document.getElementById('victory-popup').classList.add('hidden');
    document.getElementById('gameover-popup').classList.add('hidden');

    initGame();
}

/* ====================== START GAME ====================== */
window.addEventListener("DOMContentLoaded", () => {
    initGame(); // langsung mulai saat halaman siap
});
