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
            'Haafingar',
            'La Cuenca',
            'Hibernalia',
            'Falkreath',
            'La Grieta',
            'Marca de Hjaal',
            'Carrera Blanca',
            'El Pálido',
            'Marca Oriental'
        ],
        'dwemer_cities': [
            'La Cuenca',
            'La Grieta',
            'El Pálido (Sur)',
            'Marca Oriental',
            'El Pálido (Norte)'
        ],
        'mines': [
            'Falkreath',
            'Marca de Hjaal',
            'Hibernalia',
            'La Cuenca (Norte)',
            'Carrera Blanca (Este)',
            'Haafingar',
            'La Cuenca (Sur)',
            'Carrera Blanca (Oeste)',
            'El Pálido'
        ],
        'ruins': [
            'Carrera Blanca',
            'Marca de Hjaal',
            'Marca Oriental (Norte)',
            'Marca Oriental (Sur)',
            'Falkreath '
        ],
        'tombs': [
            'Falkreath',
            'Hibernalia',
            'Marca de Hjaal',
            'La Cuenca',
            'Haafingar',
            'El Pálido',
            'Carrera Blanca',
            'La Grieta'
        ]
    }
};

const languageSwitch = document.querySelector('.language-switch');
const helpButtonContainer = document.querySelector('.help-button-container');
const checkboxStates = {};

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.card-button').forEach(button => {
        button.addEventListener('click', function() {
            const folderName = this.getAttribute('data-folder');
            document.querySelector('.card-button.selected')?.classList.remove('selected');
            button.classList.add('selected');
            loadCardNames(folderName);
            showCardDisplay(folderName);
            document.getElementById('main-title').classList.add('hidden'); // Hide title when navigating to card display
            document.getElementById('checkboxes-container').classList.add('hidden'); // Hide checkboxes by default
        });
    });

    document.getElementById('back-button').addEventListener('click', function() {
        document.querySelector('.button-container').classList.remove('hidden');
        document.getElementById('card-display').classList.add('hidden');
        document.getElementById('back-button').classList.add('hidden');
        document.getElementById('rotate-button').classList.add('hidden');
        document.getElementById('card-selector').classList.add('hidden');
        document.getElementById('selected-image').classList.add('hidden');
        document.getElementById('checkboxes-container').classList.add('hidden'); // Hide checkboxes
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
        
        updateCheckboxLabels(newLanguage);

        const selectedButton = document.querySelector('.card-button.selected');
        if (selectedButton) {
            const folderName = selectedButton.getAttribute('data-folder');
            loadCardNames(folderName); // Reload with the new language
        }
    });

    function updateCheckboxLabels(language) {
        if (language === 'es') {
            document.getElementById('checkbox-1').nextSibling.textContent = 'Camino 1';
            document.getElementById('checkbox-2').nextSibling.textContent = 'Camino 2';
            document.getElementById('checkbox-3').nextSibling.textContent = 'Camino 3';
        } else {
            document.getElementById('checkbox-1').nextSibling.textContent = 'Path 1';
            document.getElementById('checkbox-2').nextSibling.textContent = 'Path 2';
            document.getElementById('checkbox-3').nextSibling.textContent = 'Path 3';
        }
    }

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
            option.textContent = language === 'en' ? name.split(' - ')[0] : name;
            cardSelector.appendChild(option);
        });
    
        // Set up change event to load English image filenames and show checkboxes only for selected cards
        cardSelector.addEventListener('change', function() {
            const selectedValue = this.value;
            const filename = cardNames['en'][folderName][selectedValue - 1]; // Always use English filenames
            document.getElementById('selected-image').src = `assets/cards/${folderName}/${selectedValue} - ${filename}.png`;

            if (selectedValue) {
                // Load checkbox states
                const checkboxState = checkboxStates[`${folderName}-${selectedValue}`] || [false, false, false];
                document.getElementById('checkbox-1').checked = checkboxState[0];
                document.getElementById('checkbox-2').checked = checkboxState[1];
                document.getElementById('checkbox-3').checked = checkboxState[2];
                
                // Display checkboxes only if a specific card is selected (not the default card back)
                document.getElementById('checkboxes-container').classList.remove('hidden');
            } else {
                // Hide checkboxes if no specific card is selected
                document.getElementById('checkboxes-container').classList.add('hidden');
            }
        });
    }

    function showCardDisplay(folderName) {
        const cardSelector = document.getElementById('card-selector');
        const selectedImage = document.getElementById('selected-image');
    
        languageSwitch.style.display = 'none';
        helpButtonContainer.style.display = 'none';
    
        selectedImage.src = `assets/cards/${folderName}/0 Card Back.png`;
    
        document.querySelector('.button-container').classList.add('hidden');
        document.getElementById('card-display').classList.remove('hidden');
        document.getElementById('back-button').classList.remove('hidden');
        document.getElementById('rotate-button').classList.remove('hidden');
        cardSelector.classList.remove('hidden');
        selectedImage.classList.remove('hidden');
        document.getElementById('checkboxes-container').classList.add('hidden'); // Hide checkboxes by default
    }

    // Event listeners for checkboxes to save their states
    document.getElementById('checkbox-1').addEventListener('change', function() {
        const selectedValue = document.getElementById('card-selector').value;
        const folderName = document.querySelector('.card-button.selected').getAttribute('data-folder');
        checkboxStates[`${folderName}-${selectedValue}`] = [
            this.checked,
            document.getElementById('checkbox-2').checked,
            document.getElementById('checkbox-3').checked
        ];
    });
    
    document.getElementById('checkbox-2').addEventListener('change', function() {
        const selectedValue = document.getElementById('card-selector').value;
        const folderName = document.querySelector('.card-button.selected').getAttribute('data-folder');
        checkboxStates[`${folderName}-${selectedValue}`] = [
            document.getElementById('checkbox-1').checked,
            this.checked,
            document.getElementById('checkbox-3').checked
        ];
    });
    
    document.getElementById('checkbox-3').addEventListener('change', function() {
        const selectedValue = document.getElementById('card-selector').value;
        const folderName = document.querySelector('.card-button.selected').getAttribute('data-folder');
        checkboxStates[`${folderName}-${selectedValue}`] = [
            document.getElementById('checkbox-1').checked,
            document.getElementById('checkbox-2').checked,
            this.checked
        ];
    });
});
