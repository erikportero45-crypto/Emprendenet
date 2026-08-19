// =============================================
// BIENVENIDA AL CARGAR
// =============================================
window.onload = function () {
  alert("¡Bienvenido al sistema EmprendeMás! Tu plataforma de comercio local.");
};

// =============================================
// TEMA OSCURO / CLARO
// =============================================
function aplicarTemaGuardado() {
  const temaGuardado = localStorage.getItem("tema") || "light";
  document.documentElement.setAttribute("data-theme", temaGuardado);
  actualizarIconoTema(temaGuardado);
}

function toggleTema() {
  const actual = document.documentElement.getAttribute("data-theme");
  const nuevo = actual === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nuevo);
  localStorage.setItem("tema", nuevo);
  actualizarIconoTema(nuevo);
}

function actualizarIconoTema(tema) {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.textContent = tema === "dark" ? "☀️" : "🌙";
  btn.setAttribute(
    "aria-label",
    tema === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
    }
  );
}

document.addEventListener("DOMContentLoaded", aplicarTemaGuardado);
}

// =============================================
// MODIFICACIÓN DEL DOM
// =============================================
function actualizarMensaje() {
  document.getElementById("mensaje").innerHTML =
    "¡Información actualizada correctamente! 🎉";
}

// =============================================
// CONFIRMACIÓN DE ACCIÓN
// =============================================
function confirmarAccion() {
  let confirmado = confirm("¿Deseas ir al panel de tu tienda?");
  if (confirmado) {
    alert("Redirigiendo a tu tienda... ¡Bienvenido de vuelta!");
  } else {
    alert("De acuerdo, permanece aquí cuando quieras.");
  }
}

// =============================================
// BIENVENIDA DESDE NAV
// =============================================
function mostrarBienvenida() {
  alert("¡Bienvenido al sistema EmprendeMás!\nInicia sesión para gestionar tu tienda.");
}

// =============================================
// VALIDACIÓN DEL FORMULARIO
// =============================================
function validarFormulario() {
  let campo = document.getElementById("nombre").value;
  if (campo === "") {
    alert("Debe completar el campo Nombre.");
    return false;
  }

  let email = document.getElementById("email").value;
  if (email === "") {
    alert("El correo electrónico es obligatorio.");
    document.getElementById("email").focus();
    return false;
  }

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor ingresa un correo electrónico válido.");
    document.getElementById("email").focus();
    return false;
  }

  let categoria = document.getElementById("categoria").value;
  if (categoria === "") {
    alert("Por favor selecciona una categoría para tu negocio.");
    document.getElementById("categoria").focus();
    return false;
  }

  let descripcion = document.getElementById("descripcion").value;
  if (descripcion.trim() === "") {
    alert("Por favor describe brevemente tu emprendimiento.");
    document.getElementById("descripcion").focus();
    return false;
  }

  if (descripcion.trim().length < 20) {
    alert("La descripción debe tener al menos 20 caracteres.");
    document.getElementById("descripcion").focus();
    return false;
  }

  alert("¡Información guardada! Tu emprendimiento ha sido registrado exitosamente en EmprendeMás. ¡Bienvenido!");
  document.getElementById("mensaje").innerHTML = "¡Registro completado con éxito! 🎉";
  document.getElementById("miFormulario").reset();
  return false;
}

// =============================================
// CARRITO DE COMPRAS
// =============================================
function agregarCarrito(producto) {
  let confirmado = confirm('¿Deseas agregar "' + producto + '" a tu carrito de compras?');
  if (confirmado) {
    alert('✅ "' + producto + '" fue agregado a tu carrito correctamente.');
  }
}

// =============================================
// JUEGO: MEMORY MATCH
// Usa emojis como cartas — sin dependencias externas
// =============================================

// Emojis para los 8 pares
const CARD_EMOJIS = ['💄', '🎂', '☕', '🍺', '👜', '🧴', '🍫', '💐'];

let selectedTime = 60;
let timeRemaining = 60;
let timerInterval = null;
let revealedCards = [];
let matchedPairs = [];
let isProcessing = false;
const TOTAL_PAIRS = 8;

// Seleccionar tiempo
function selectTime(time, btn) {
  selectedTime = time;
  document.querySelectorAll('.time-option').forEach(b => {
    b.classList.remove('selected');
    b.setAttribute('aria-checked', 'false');
  });
  btn.classList.add('selected');
  btn.setAttribute('aria-checked', 'true');
}

// Mostrar pantalla del juego
function showGamePanel(id) {
  document.querySelectorAll('.game-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Iniciar juego
function startGame() {
  timeRemaining = selectedTime;
  matchedPairs = [];
  revealedCards = [];
  isProcessing = false;
  buildGrid();
  showGamePanel('game-screen');
  updateTimerDisplay();
  startTimer();
}

// Mezclar array (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Construir cuadrícula de cartas
function buildGrid() {
  const grid = document.getElementById('card-grid');
  grid.innerHTML = '';

  // Crear pares: dos de cada emoji
  let pairs = [];
  for (let i = 0; i < TOTAL_PAIRS; i++) {
    pairs.push({ pairId: i, emoji: CARD_EMOJIS[i], uid: i + '-a' });
    pairs.push({ pairId: i, emoji: CARD_EMOJIS[i], uid: i + '-b' });
  }
  const shuffled = shuffle(pairs);

  shuffled.forEach((card, index) => {
    const cardEl = document.createElement('div');
    cardEl.className = 'memory-card';
    cardEl.tabIndex = 0;
    cardEl.role = 'gridcell';
    cardEl.setAttribute('aria-label', 'Carta boca abajo');
    cardEl.dataset.pairId = card.pairId;
    cardEl.dataset.uid = card.uid;

    cardEl.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-back">${index + 1}</div>
        <div class="card-face card-front">${card.emoji}</div>
      </div>
    `;

    cardEl.addEventListener('click', () => flipCard(cardEl));
    cardEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flipCard(cardEl);
      }
    });

    grid.appendChild(cardEl);
  });
}

// Voltear carta
function flipCard(cardEl) {
  if (cardEl.classList.contains('matched')) return;
  if (isProcessing) return;
  if (cardEl.classList.contains('flipped')) return;
  if (revealedCards.length >= 2) return;

  cardEl.classList.add('flipped');
  cardEl.setAttribute('aria-label', 'Carta revelada');
  revealedCards.push(cardEl);

  if (revealedCards.length === 2) {
    isProcessing = true;
    const [first, second] = revealedCards;

    if (first.dataset.pairId === second.dataset.pairId) {
      // ¡Par encontrado!
      setTimeout(() => {
        first.classList.add('matched');
        second.classList.add('matched');
        first.setAttribute('aria-label', 'Par encontrado');
        second.setAttribute('aria-label', 'Par encontrado');
        matchedPairs.push(first.dataset.pairId);
        revealedCards = [];
        isProcessing = false;

        if (matchedPairs.length === TOTAL_PAIRS) {
          endGame(true);
        }
      }, 400);
    } else {
      // No coinciden — voltear de vuelta
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        first.setAttribute('aria-label', 'Carta boca abajo');
        second.setAttribute('aria-label', 'Carta boca abajo');
        revealedCards = [];
        isProcessing = false;
      }, 800);
    }
  }
}

// Iniciar temporizador
function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      endGame(false);
    }
  }, 1000);
}

// Actualizar display del tiempo
function updateTimerDisplay() {
  const el = document.getElementById('timer-display');
  if (!el) return;
  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;
  el.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

  if (timeRemaining <= 10 && timeRemaining > 0) {
    el.classList.add('timer-warning', 'timer-pulse');
  } else {
    el.classList.remove('timer-warning', 'timer-pulse');
  }
}

// Fin del juego
function endGame(won) {
  clearInterval(timerInterval);
  isProcessing = true;

  if (won) {
    const mins = Math.floor(timeRemaining / 60);
    const secs = timeRemaining % 60;
    const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    document.getElementById('win-detail').textContent = `Tiempo restante: ${timeStr}`;
    document.getElementById('win-modal').classList.add('active');
  } else {
    document.getElementById('lose-detail').textContent =
      `Encontraste ${matchedPairs.length} de ${TOTAL_PAIRS} pares.`;
    document.getElementById('lose-modal').classList.add('active');
  }
}

// Cerrar modales
function closeModals() {
  document.getElementById('win-modal').classList.remove('active');
  document.getElementById('lose-modal').classList.remove('active');
}

// Reiniciar
function restartGame() {
  closeModals();
  startGame();
}

// Volver al inicio del juego
function goHome() {
  closeModals();
  clearInterval(timerInterval);
  showGamePanel('home-screen');
}
