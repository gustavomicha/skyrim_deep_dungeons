const cardNames = {
    'en': {
        'caves': [
            'Haafingar -  Broken Oar Grotto',
            'The Reach - Rebel\'s Cairn',
            'Winterhold - Hobb\'s Fall Cave',
            'Falkreath - Glenmoril Coven',
            'The Rift - Tolvald\'s Cave',
            'Hjaalmarch - Forbears Holdout',
            'Witherun Hold - Swindler\'s Den',
            'The Pale - Dimhollow Crypt',
            'Eastmarch - Cragslane Cavern'
        ],
        'dwemer_cities': [
            'The Reach - Bthardamz',
            'The Rift - Avanchnzel',
            'The Pale (South) - Raldbthar',
            'Eastmarch - Mzulft',
            'The Pale (North) - Irkngthand'
        ],
        'mines': [
            'Falkreath - Bilegulch Mine',
            'Hjaalmarch - Robber\'s Gorge',
            'Winterhold - Whistling Mine',
            'The Reach (North) - Cidhna Mine',
            'White Hold (East) - Embershard Mine',
            'Haafingar - Sanuarch Mine',
            'The Reach (South) - Left Hand Mine',
            'Whiterun Hold (West) - Halted Stream Camp',
            'The Pale - Quicksilver Mine'
        ],
        'ruins': [
            'Whiterun Hold - Mouldering Ruins',
            'Hjaalmarch - Labyrinthian',
            'Eastmarch (North) - Ansilvund',
            'Eastmarch (South) - Skuldafn',
            'Falkreath - Shriekwind Bastion'
        ],
        'tombs': [
            'Falkreath - Bleak Falls Barrow',
            'Winterhold - Saarthal',
            'Hjaalmarch - Ustengrav',
            'The Reach - Deepwood Vale',
            'Haafingar - Kilkreath Ruins',
            'The Pale - Volunruud',
            'Whiterun Hold - Hillgrund\'s Tomb',
            'The Rift - Forelhost'
        ]
    },
    'es': {
        'caves': [
            'Haafingar - Gruta del Remero Roto',
            'La Cuenca - Cairn del Rebelde',
            'Hibernalia - Cueva de la Caída de Hob',
            'Falkreath - Coven de Glenmoril',
            'La Grieta - Cueva de Tolvald',
            'Hjaalmarch - Refugio de Forbears',
            'Cuarentena Blanca - Guarida del Estafador',
            'El Pálido - Cripta de Dimhollow',
            'Este de Marcha - Caverna Cragslane'
        ],
        'dwemer_cities': [
            'La Cuenca - Bthardamz',
            'La Grieta - Avanchnzel',
            'El Pálido (Sur) - Raldbthar',
            'Este de Marcha - Mzulft',
            'El Pálido (Norte) - Irkngthand'
        ],
        'mines': [
            'Falkreath - Mina de Bilegulch',
            'Hjaalmarch - Garganta del Ladrón',
            'Hibernalia - Mina de Silbido',
            'La Cuenca (Norte) - Mina de Cidhna',
            'Sostener Blanco (Este) - Mina de Embershard',
            'Haafingar - Mina de Sanuarch',
            'La Cuenca (Sur) - Mina de Mano Izquierda',
            'Sostener de la Parada Blanca (Oeste) - Campamento de Corriente Detenida',
            'El Pálido - Mina de Plata Rápida'
        ],
        'ruins': [
            'Sostener de la Parada Blanca - Ruinas de Mouldering',
            'Hjaalmarch - Laberintia',
            'Este de Marcha (Norte) - Ansilvund',
            'Este de Marcha (Sur) - Skuldafn',
            'Falkreath - Bastión de Shriekwind'
        ],
        'tombs': [
            'Falkreath - Tumba de Bleak Falls',
            'Hibernalia - Saarthal',
            'Hjaalmarch - Ustengrav',
            'La Cuenca - Valle de Deepwood',
            'Haafingar - Ruinas de Kilkreath',
            'El Pálido - Volunruud',
            'Sostener de la Parada Blanca - Tumba de Hillgrund',
            'La Grieta - Forelhost'
        ]
    }
};
const languageSwitch = document.querySelector('.language-switch');
const helpButtonContainer = document.querySelector('.help-button-container');

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.card-button').forEach(button => {
        button.addEventListener('click', function() {
            const folderName = this.getAttribute('data-folder');
            document.querySelector('.card-button.selected')?.classList.remove('selected');
            button.classList.add('selected');
            loadCardNames(folderName);
            showCardDisplay(folderName);
            document.getElementById('main-title').classList.add('hidden'); // Hide title when navigating to card display
        });
    });

    document.getElementById('back-button').addEventListener('click', function() {
        document.querySelector('.button-container').classList.remove('hidden');
        document.getElementById('card-display').classList.add('hidden');
        document.getElementById('back-button').classList.add('hidden');
        document.getElementById('rotate-button').classList.add('hidden');
        document.getElementById('card-selector').classList.add('hidden');
        document.getElementById('selected-image').classList.add('hidden');
        document.getElementById('selected-image').style.transform = 'rotate(0deg)';
        document.getElementById('main-title').classList.remove('hidden'); // Show title again when returning to main menu
        languageSwitch.style.display = 'block';
        helpButtonContainer.style.display = 'block';
    });

    document.getElementById('language-button').addEventListener('click', function() {
        const currentLanguage = this.getAttribute('data-language');
        const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
    
        this.setAttribute('data-language', newLanguage);
        document.getElementById('language-icon').src = newLanguage === 'en' ? 'assets/icons/ENG.png' : 'assets/icons/ESP.png';
    
        const selectedButton = document.querySelector('.card-button.selected');
        if (selectedButton) {
            const folderName = selectedButton.getAttribute('data-folder');
            loadCardNames(folderName); // Reload with the new language
        }
    });
    
    document.getElementById('help-button').addEventListener('click', function() {
        // Create the content for the help menu
        const helpContent = `
        <div style="text-align: center; padding: 20px;">
            <img src="assets/misc/rules_mix.png" alt="Help Image" style="max-width: 80%; height: auto;">
            <ul style="margin-top: 20px; list-style-type: disc; padding-left: 40px; text-align: left;">
                <li>Deep Dungeons is a fanmade expansion for "The Elder Scrolls V: Skyrim – The Adventure Game" by user Joe J. (@GKANG)</li>
                <li><a href="https://boardgamegeek.com/thread/3023877/deep-dungeons-an-unofficial-expansion-v111-release" target="_blank">Link to BGG post here</a></li>
                <li>Webapp by @Relhit</li>
            </ul>
        </div>
        `;
        
        // Open the help content in a new window and include the main stylesheet
        const helpWindow = window.open("", "Help", "width=800,height=600");
        helpWindow.document.write(`
            <html lang="en">
            <head>
                <title>Help - Deep Dungeons</title>
                <link rel="stylesheet" href="src/css/style.css"> <!-- Link to your main CSS file -->
            </head>
            <body>
                ${helpContent}
            </body>
            </html>
        `);
        helpWindow.document.close(); // Close the document to finish rendering
    });

    document.getElementById('rotate-button').addEventListener('click', function() {
        const image = document.getElementById('selected-image');
        const currentRotation = image.style.transform.match(/rotate\((\d+)deg\)/);
        const currentDegree = currentRotation ? parseInt(currentRotation[1]) : 0;
        const newDegree = currentDegree === 0 ? 90 : 0;
        image.style.transform = `rotate(${newDegree}deg)`;
    });

    function loadCardNames(folderName) {
    const cardSelector = document.getElementById('card-selector');
    const language = document.getElementById('language-button').getAttribute('data-language'); // Get the current language
    cardSelector.innerHTML = ''; // Clear previous options

    // Add the empty selection as the first option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = language === 'en' ? 'Select Dungeon Card' : 'Seleccionar Dungeon';
    defaultOption.disabled = true; // Disable this option
    defaultOption.selected = true; // Make it the selected option by default
    cardSelector.appendChild(defaultOption);

    // Add the actual card options (text in selected language)
    const names = cardNames[language][folderName]; // Get card names in the current language
    names.forEach((name, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.textContent = name; // Set option text based on the current language
        cardSelector.appendChild(option);
    });

    // Set up change event to load English image filenames
    cardSelector.addEventListener('change', function() {
        const selectedValue = this.value;
        const filename = cardNames['en'][folderName][selectedValue - 1]; // Always use English filenames
        document.getElementById('selected-image').src = `assets/cards/${folderName}/${selectedValue} - ${filename}.png`;
    });
}

    

    function showCardDisplay(folderName) {
        const cardSelector = document.getElementById('card-selector');
        const selectedImage = document.getElementById('selected-image');
    
        languageSwitch.style.display = 'none';
        helpButtonContainer.style.display = 'none';
    
        selectedImage.src = `assets/cards/${folderName}/0 Card Back.png`;
    
        cardSelector.addEventListener('change', function() {
            const selectedValue = this.value;
            const filename = cardNames['en'][folderName][selectedValue - 1]; // Always use English filenames
            selectedImage.src = `assets/cards/${folderName}/${selectedValue} - ${filename}.png`;
        });
    
        document.querySelector('.button-container').classList.add('hidden');
        document.getElementById('card-display').classList.remove('hidden');
        document.getElementById('back-button').classList.remove('hidden');
        document.getElementById('rotate-button').classList.remove('hidden');
        cardSelector.classList.remove('hidden');
        selectedImage.classList.remove('hidden');
    }
    
    
});
