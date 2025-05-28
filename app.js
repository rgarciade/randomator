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
const randomizeBtnContainer = randomizeBtn.parentElement;

// State
let options = [];

// Event Listeners
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
        optionElement.className = 'flex items-center gap-4 px-4 min-h-14';
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
    
    // Actualiza el texto del ganador
    winnerText.textContent = winner;

    // Efecto mágico: destello y partículas
    showMagicEffect();

    mainView.classList.add('hidden');
    resultView.classList.remove('hidden');
    randomizeBtnContainer.style.display = 'none';

    setTimeout(() => {
        winnerText.className = 'hp-winner-title';
    }, 3000);
}

// Efecto mágico visual
function showMagicEffect() {
    // Destello dorado
    winnerText.style.boxShadow = '0 0 40px 10px #ffd70088, 0 0 120px 40px #ffd70044';
    winnerText.style.transition = 'box-shadow 0.7s';
    setTimeout(() => {
        winnerText.style.boxShadow = '';
    }, 1200);

    // Partículas mágicas
    const container = winnerText.parentElement;
    for (let i = 0; i < 18; i++) {
        const particle = document.createElement('span');
        particle.style.position = 'absolute';
        particle.style.left = (50 + 40 * Math.cos((i / 18) * 2 * Math.PI)) + '%';
        particle.style.top = (50 + 40 * Math.sin((i / 18) * 2 * Math.PI)) + '%';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.borderRadius = '50%';
        particle.style.background = i % 2 === 0 ? '#ffd700' : '#fffbe6';
        particle.style.opacity = '0.85';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10';
        particle.style.transform = 'translate(-50%, -50%) scale(0.5)';
        particle.style.boxShadow = '0 0 16px 4px #ffd70088';
        particle.style.animation = `magic-pop 1s cubic-bezier(.4,2,.6,1) forwards`;
        particle.style.animationDelay = (i * 0.03) + 's';
        container.appendChild(particle);
        setTimeout(() => {
            particle.remove();
        }, 1200);
    }
}

// Animación de partículas mágicas
const style = document.createElement('style');
style.innerHTML = `
@keyframes magic-pop {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.2); }
  60% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
  100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
}`;
document.head.appendChild(style);

function showMainView() {
    resultView.classList.add('hidden');
    mainView.classList.remove('hidden');
    randomizeBtnContainer.style.display = '';
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

// Add hp-btn class to buttons
clearOptionsBtn.classList.add('hp-btn');
randomizeBtn.classList.add('hp-btn'); 