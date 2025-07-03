document.addEventListener('DOMContentLoaded', () => {
    const rpsButtons = document.querySelectorAll('.rps-button');
    const playerChoiceSpan = document.getElementById('playerChoice');
    const computerChoiceSpan = document.getElementById('computerChoice');
    const gameResultH3 = document.getElementById('gameResult');

    rpsButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const playerChoice = e.target.dataset.choice;

            const response = await fetch('/rps/play', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `choice=${playerChoice}`
            });

            const data = await response.json();
            playerChoiceSpan.textContent = data.player_choice;
            computerChoiceSpan.textContent = data.computer_choice;
            gameResultH3.textContent = data.result;

            if (data.result === "Та яллаа!") {
                gameResultH3.style.color = 'green';
            } else if (data.result === "Та ялагдлаа!") {
                gameResultH3.style.color = 'red';
            } else {
                gameResultH3.style.color = '#333'; // Default
            }
        });
    });
});