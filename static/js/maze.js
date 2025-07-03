document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('mazeCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startMazeBtn');
    const resetButton = document.getElementById('resetMazeBtn');
    const messageDisplay = document.getElementById('mazeMessage');

    const CELL_SIZE = 30;
    let maze = [];
    let player = { x: 0, y: 0 };
    let end = { x: 0, y: 0 };
    let gameStarted = false;

    // Лабиринт үүсгэх энгийн функц (жишээ)
    function generateMaze(rows, cols) {
        maze = Array(rows).fill(0).map(() => Array(cols).fill(1)); // 1 = хана, 0 = зам
        canvas.width = cols * CELL_SIZE;
        canvas.height = rows * CELL_SIZE;

        // Энгийн төөрдөг байшингийн логик: Эхлэхээс төгсгөл хүртэл зам үүсгэх
        // Энэ бол зүгээр л жишээ. Жинхэнэ лабиринт үүсгэх алгоритм илүү нарийн байдаг.
        // Энд зүгээр л нэг хялбар зам үүсгэе.
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                maze[i][j] = 1; // Бүх нүдийг хана болгоно
            }
        }

        // Эхлэх цэгээс төгсгөл хүртэл шулуун зам үүсгэнэ (Энгийн жишээ)
        let currentRow = 0;
        let currentCol = 0;
        maze[currentRow][currentCol] = 0; // Эхлэх цэг

        while (currentRow < rows - 1 || currentCol < cols - 1) {
            if (currentCol < cols - 1 && Math.random() < 0.6) { // Баруун тийш явах магадлал
                currentCol++;
            } else if (currentRow < rows - 1) { // Доош явах
                currentRow++;
            }
            maze[currentRow][currentCol] = 0;
        }

        player = { x: 0, y: 0 }; // Эхлэх цэг
        end = { x: cols - 1, y: rows - 1 }; // Төгсгөл цэг
        maze[end.y][end.x] = 0; // Төгсгөл цэгийг зам болгох
    }

    // Лабиринтийг зурах функц
    function drawMaze() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let r = 0; r < maze.length; r++) {
            for (let c = 0; c < maze[r].length; c++) {
                ctx.beginPath();
                ctx.rect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
                if (maze[r][c] === 1) {
                    ctx.fillStyle = '#333'; // Хана
                } else {
                    ctx.fillStyle = '#eee'; // Зам
                }
                ctx.fill();
                ctx.stroke();
            }
        }

        // Тоглогчийг зурах
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x * CELL_SIZE + CELL_SIZE / 4, player.y * CELL_SIZE + CELL_SIZE / 4, CELL_SIZE / 2, CELL_SIZE / 2);

        // Төгсгөлийн цэгийг зурах
        ctx.fillStyle = 'green';
        ctx.fillRect(end.x * CELL_SIZE + CELL_SIZE / 4, end.y * CELL_SIZE + CELL_SIZE / 4, CELL_SIZE / 2, CELL_SIZE / 2);
    }

    // Тоглогчийн хөдөлгөөн
    function movePlayer(dx, dy) {
        let newX = player.x + dx;
        let newY = player.y + dy;

        if (newX >= 0 && newX < maze[0].length &&
            newY >= 0 && newY < maze.length &&
            maze[newY][newX] === 0) { // Хана мөргөхгүй бол
            player.x = newX;
            player.y = newY;
            drawMaze();
        }
        checkWin();
    }

    // Ялалтыг шалгах
    function checkWin() {
        if (player.x === end.x && player.y === end.y) {
            messageDisplay.textContent = "Баяр хүргэе! Та төөрдөг байшингаас гарлаа!";
            messageDisplay.style.color = 'green';
            gameStarted = false;
            document.removeEventListener('keydown', handleKeyPress);
            resetButton.style.display = 'block';
            startButton.style.display = 'none';
        }
    }

    function handleKeyPress(e) {
        if (!gameStarted) return;
        switch (e.key) {
            case 'ArrowUp':
                movePlayer(0, -1);
                break;
            case 'ArrowDown':
                movePlayer(0, 1);
                break;
            case 'ArrowLeft':
                movePlayer(-1, 0);
                break;
            case 'ArrowRight':
                movePlayer(1, 0);
                break;
        }
    }

    function startGame() {
        generateMaze(10, 10); // 10x10 хэмжээтэй лабиринт үүсгэх
        drawMaze();
        messageDisplay.textContent = "";
        messageDisplay.style.color = '#333';
        gameStarted = true;
        startButton.style.display = 'none';
        resetButton.style.display = 'none'; // Эхлэх үед reset товчийг нуух
        document.addEventListener('keydown', handleKeyPress);
    }

    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', () => {
        window.location.reload(); // Хуудсыг дахин ачаалах
    });

    // Эхний ачаалтаар лабиринтыг бэлдэх
    generateMaze(10, 10); // Эхний хуудсыг харуулахын тулд
    drawMaze();
});