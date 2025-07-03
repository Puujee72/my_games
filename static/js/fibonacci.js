document.addEventListener('DOMContentLoaded', () => {
    const fibonacciForm = document.getElementById('fibonacciForm');
    const userFibGuessInput = document.getElementById('userFibGuess');
    const fibResultParagraph = document.getElementById('fibResult');
    const newFibGameBtn = document.getElementById('newFibGameBtn');

    if (fibonacciForm) {
        fibonacciForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userGuess = userFibGuessInput.value;

            const response = await fetch('/fibonacci/check', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `guess=${userGuess}`
            });

            const data = await response.json();
            fibResultParagraph.textContent = data.message;

            if (data.is_correct) {
                fibResultParagraph.style.color = 'green';
                fibonacciForm.style.display = 'none';
                newFibGameBtn.style.display = 'block';
            } else {
                fibResultParagraph.style.color = 'red';
            }
        });
    }

    if (newFibGameBtn) {
        newFibGameBtn.addEventListener('click', () => {
            window.location.reload(); // Хуудсыг дахин ачаалах
        });
    }
});