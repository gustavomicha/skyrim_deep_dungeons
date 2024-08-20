document.querySelectorAll('.card-button').forEach(button => {
    button.addEventListener('click', function() {
        const folderName = this.getAttribute('data-folder');
        loadCardNames(folderName);
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

function loadCardNames(folderName) {
    const cardSelector = document.getElementById('card-selector');
    cardSelector.innerHTML = ''; // Clear previous options

    // Example card names based on your current folder structure
    const cardNames = {
        'caves': [
            'Haafingar - Broken Oar Grotto',
            'The Reach - Rebel\'s Cairn',
            'Winterhold - Hob\'s Fall Cave',
            'Falkreath - Glenmoril Coven',
            'The Rift - Tolvald\'s Cave',
            'Hjaalmarch - Forsaken Cave',
            'Whiterun Hold - Swindler\'s Den',
            'The Pale - Dimhollow Crypt',
            'Eastmarch - Cragwallow Slope'
        ],
        'dwemer_cities': [
            'Card 1 Name',
            'Card 2 Name',
            // ... more card names
        ],
        // Define card names for other folders similarly
    };

    // Get the correct card names array based on the selected folder
    const names = cardNames[folderName];

    names.forEach((name, index) => {
        const option = document.createElement('option');
        option.value = index + 1; // Set value as the index + 1
        option.textContent = name; // Use the actual card name
        cardSelector.appendChild(option);
    });
}

function showCardDisplay(folderName) {
    const cardSelector = document.getElementById('card-selector');
    const selectedImage = document.getElementById('selected-image');

    cardSelector.addEventListener('change', function() {
        const selectedValue = this.value;
        selectedImage.src = `assets/cards/${folderName}/${selectedValue} - ${this.options[this.selectedIndex].textContent}.png`;
    });

    // Hide the main menu buttons
    document.querySelector('.button-container').classList.add('hidden');

    // Show the secondary menu
    document.getElementById('card-display').classList.remove('hidden');
    document.getElementById('back-button').classList.remove('hidden'); // Show Back button
    cardSelector.classList.remove('hidden'); // Show card selector
    selectedImage.classList.remove('hidden'); // Show card image
}
