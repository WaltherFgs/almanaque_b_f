// Script para el Almanaque de Benjamin Franklin - Ventanas Separadas

// Función para mostrar la fecha actual en la página principal
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.getElementById('dateText');
    if(dateElement) {
        dateElement.textContent = today.toLocaleDateString('es-ES', options);
    }
});

// Función para mezclar contenido (usada en varias secciones)
function shuffleContent(sectionId) {
    const cards = document.querySelectorAll('.entry-card');
    const cardsArray = Array.from(cards);
    for (let i = cardsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
    }
    cardsArray.forEach(card => {
        card.parentNode.appendChild(card);
    });
}

// Función para alternar tipo de consejos
function toggleAdviceType() {
    alert("Mostrando diferentes tipos de consejos prácticos según la sabiduría de Benjamin Franklin.");
}

// Función para actualizar el clima
function updateWeather() {
    alert("Predicción actualizada según los métodos tradicionales del Almanaque de Benjamin Franklin.");
}

// Función para mostrar próxima cita
function randomQuote() {
    const quotes = document.querySelectorAll('.quote-card');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    
    // Destacar la cita aleatoria
    quotes.forEach(quote => quote.classList.remove('highlight'));
    quotes[randomIndex].classList.add('highlight');
    
    setTimeout(() => {
        quotes[randomIndex].classList.remove('highlight');
    }, 2000);
}

// Función para mostrar próximo evento
function showNextEvent() {
    alert("Mostrando el próximo evento histórico según los registros del Almanaque de Benjamin Franklin.");
}

// Función para abrir ventanas de secciones
function openSectionWindow(sectionName) {
    window.open(`secciones/${sectionName}.html`, `_blank`, 
        `width=1000,height=700,resizable=yes,scrollbars=yes`);
}

// Manejar el menú móvil si existe
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.getElementById('nav-menu');

if(menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });
}

// Botón de volver arriba
const backToTopButton = document.querySelector('.back-to-top');

if(backToTopButton) {
    window.addEventListener('scroll', function() {
        if(window.pageYOffset > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Función para agregar nuevas tareas
function addNewTask() {
    const input = document.getElementById('newTaskInput');
    const taskText = input.value.trim();
    
    if(taskText) {
        const taskList = document.getElementById('taskList');
        const newTaskId = 'task' + (taskList.children.length + 1);
        
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <input type="checkbox" id="${newTaskId}">
            <label for="${newTaskId}">${taskText}</label>
            <span class="task-time">Día</span>
        `;
        
        taskList.appendChild(li);
        input.value = '';
    }
}

// Permitir agregar tarea con Enter
if(document.getElementById('newTaskInput')) {
    document.getElementById('newTaskInput').addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            addNewTask();
        }
    });
}