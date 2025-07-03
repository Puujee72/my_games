document.addEventListener('DOMContentLoaded', () => {
    const guessImageForm = document.getElementById('guessImageForm');
    const userImageGuessInput = document.getElementById('userImageGuess');
    const imageResultParagraph = document.getElementById('imageResult');
    const gameImage = document.getElementById('gameImage');
    const nextImageBtn = document.getElementById('nextImageBtn');

    if (guessImageForm) {
        guessImageForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userGuess = userImageGuessInput.value;

            const response = await fetch('/guess_image/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `guess=${userGuess}`
            });

            const data = await response.json();
            imageResultParagraph.textContent = data.message;

            if (data.is_correct) {
                imageResultParagraph.style.color = 'green';
                guessImageForm.style.display = 'none';
                nextImageBtn.style.display = 'block';
            } else {
                imageResultParagraph.style.color = 'red';
            }
        });
    }

    if (nextImageBtn) {
        nextImageBtn.addEventListener('click', () => {
            // Шинэ зураг ачаалахын тулд хуудсыг дахин ачаална
            window.location.reload();
        });
    }
});