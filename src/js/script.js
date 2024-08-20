document.querySelectorAll('.card-button').forEach(button => {
    button.addEventListener('click', function() {
        const folderName = this.getAttribute('data-folder');
        showCardDisplay(folderName);
    });
});

document.getElementById('back-button').addEventListener('click', function() {
    document.querySelector('.button-container').classList.remove('hidden');
    document.getElementById('card-display').classList.add('hidden');
    document.getElementById('back-button').classList.add('hidden'); // Hide Back button
    document.getElementById('card-selector').classList.add('hidden'); // Hide card selector
    document.getElementById('selected-image').classList.add('hidden'); // Hide card image
});

function showCardDisplay(folderName) {
    const cardSelector = document.getElementById('card-selector');
    const cardDisplay = document.getElementById('card-display');
    const selectedImage = document.getElementById('selected-image');

    // Hide elements initially
    cardSelector.innerHTML = '';
    selectedImage.src = '';

    for (let i = 1; i <= 9; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Card ${i}`;
        cardSelector.appendChild(option);
    }

    cardSelector.addEventListener('change', function() {
        selectedImage.src = `assets/cards/${folderName}/${this.value} - ${this.options[this.selectedIndex].textContent}.png`;
    });

    // Hide the main menu buttons
    document.querySelector('.button-container').classList.add('hidden');

    // Show the secondary menu
    cardDisplay.classList.remove('hidden');
    document.getElementById('back-button').classList.remove('hidden'); // Show Back button
    cardSelector.classList.remove('hidden'); // Show card selector
    selectedImage.classList.remove('hidden'); // Show card image
}
