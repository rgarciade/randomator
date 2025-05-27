// DOM Elements
const mainView = document.getElementById('mainView');
const resultView = document.getElementById('resultView');
const newOptionInput = document.getElementById('newOption');
const addOptionBtn = document.getElementById('addOptionBtn');
const clearOptionsBtn = document.getElementById('clearOptionsBtn');
const optionsList = document.getElementById('optionsList');
const randomizeBtn = document.getElementById('randomizeBtn');
const backBtn = document.getElementById('backBtn');
const winnerText = document.getElementById('winnerText');

// State
let options = [];

// Event Listeners
addOptionBtn.addEventListener('click', addOption);
clearOptionsBtn.addEventListener('click', () => {
    console.log('Clear button clicked');
    clearOptions();
});
randomizeBtn.addEventListener('click', showRandomResult);
backBtn.addEventListener('click', showMainView);
newOptionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addOption();
    }
});

// Functions
function addOption() {
    const optionText = newOptionInput.value.trim();
    if (optionText) {
        options.push(optionText);
        console.log('Option added:', optionText);
        console.log('Current options:', options);
        renderOptions();
        newOptionInput.value = '';
        updateClearButtonVisibility();
    }
}

function clearOptions() {
    console.log('Clearing options. Current options:', options);
    // Clear the JavaScript array
    options = [];
    console.log('Options array cleared');
    
    // Clear the HTML list
    while (optionsList.firstChild) {
        optionsList.removeChild(optionsList.firstChild);
    }
    console.log('HTML list cleared');
    
    // Clear the input field
    newOptionInput.value = '';
    
    // If we're in the result view, go back to main view
    if (!mainView.classList.contains('hidden')) {
        showMainView();
    }
    
    updateClearButtonVisibility();
    console.log('Clear operation completed');
}

function renderOptions() {
    console.log('Rendering options:', options);
    // Clear the list first
    optionsList.innerHTML = '';
    
    // Add each option to the list
    options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'flex items-center gap-4 bg-white px-4 min-h-14';
        optionElement.innerHTML = `
            <p class="text-[#181811] text-base font-normal leading-normal flex-1 truncate">${option}</p>
        `;
        optionsList.appendChild(optionElement);
    });
    updateClearButtonVisibility();
    console.log('Options rendered');
}

function showRandomResult() {
    if (options.length === 0) {
        alert('Por favor agrega al menos una opci\u00F3n');
        return;
    }

    const randomIndex = Math.floor(Math.random() * options.length);
    const winner = options[randomIndex];
    
    // Remove any existing animation classes
    winnerText.className = 'text-[#181811] text-[48px] font-bold leading-tight tracking-[-0.015em] text-center';
    
    // Select a random animation
    const animations = [
        'animate-bounce-custom',
        'animate-spin-custom',
        'animate-shake-custom',
        'animate-rainbow-custom',
        'animate-zoom-custom'
    ];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    
    // Apply the animation
    winnerText.classList.add(randomAnimation);
    winnerText.textContent = winner;
    
    mainView.classList.add('hidden');
    resultView.classList.remove('hidden');

    // Remove animation class after 3 seconds
    setTimeout(() => {
        winnerText.className = 'text-[#181811] text-[48px] font-bold leading-tight tracking-[-0.015em] text-center';
    }, 3000);
}

function showMainView() {
    resultView.classList.add('hidden');
    mainView.classList.remove('hidden');
    // Remove animation when going back
    winnerText.className = 'text-[#181811] text-[48px] font-bold leading-tight tracking-[-0.015em] text-center';
}

function updateClearButtonVisibility() {
    if (options.length > 0) {
        clearOptionsBtn.style.display = '';
    } else {
        clearOptionsBtn.style.display = 'none';
    }
}

// Inicializar visibilidad al cargar
updateClearButtonVisibility(); 