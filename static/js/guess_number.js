document.addEventListener('DOMContentLoaded', () => {
    const guessForm = document.getElementById('guessForm');
    const userGuessInput = document.getElementById('userGuess');
    const resultParagraph = document.getElementById('result');
    const resetGameButton = document.getElementById('resetGame');

    if (guessForm) {
        guessForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const guess = userGuessInput.value;

            const response = await fetch('/guess_number/play', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `guess=${guess}`
            });

            const data = await response.json();
            resultParagraph.textContent = data.message;
            resultParagraph.style.color = '#333'; // Default color

            if (data.status === "correct") {
                resultParagraph.style.color = 'green';
                guessForm.style.display = 'none'; // Нуух
                resetGameButton.style.display = 'block'; // Харуулах
            } else if (data.status === "low" || data.status === "high") {
                resultParagraph.style.color = 'orange';
            }
        });
    }

    if (resetGameButton) {
        resetGameButton.addEventListener('click', () => {
            window.location.reload(); // Хуудсыг дахин ачаалах
        });
    }
});