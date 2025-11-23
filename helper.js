let clickCount = 0;
const maxClicks = 8;
const clickHistory = []; // będzie przechowywać referencje do elementów

// Helper: pobierz NodeList elementów i przerób na tablicę
const items = Array.from(document.querySelectorAll('.circle .item'));

// ---- ODCZYT DANYCH Z localStorage ----
function loadFromStorage() {
  const saved = JSON.parse(localStorage.getItem('clickData'));
  if (!saved) {
    // zainicjalizuj clickNumbers dla każdego item
    items.forEach(item => item.clickNumbers = []);
    return;
  }

  clickCount = saved.clickCount || 0;

  // Przywróć clickNumbers dla każdego elementu
  items.forEach((item, index) => {
    item.clickNumbers = Array.isArray(saved.items[index]) ? saved.items[index].slice() : [];
    if (item.clickNumbers.length > 0) {
      updateItemDisplay(item);
    }
  });

  // Odtwórz clickHistory — saved.history to tablica indeksów elementów (np. [0,2,0,1,...])
  if (Array.isArray(saved.history)) {
    saved.history.forEach(idx => {
      if (typeof idx === 'number' && items[idx]) {
        clickHistory.push(items[idx]);
      }
    });
  }
}

// ---- ZAPIS DO localStorage ----
function saveToStorage() {
  const itemsData = items.map(item => item.clickNumbers || []);
  const historyData = clickHistory.map(el => items.indexOf(el)); // zapisujemy indeksy
  const data = {
    clickCount,
    items: itemsData,
    history: historyData
  };
  localStorage.setItem('clickData', JSON.stringify(data));
}

// ---- OBSŁUGA KLIKNIĘĆ ----
items.forEach((item) => {
  item.clickNumbers = item.clickNumbers || [];

  item.addEventListener('click', () => {
    if (clickCount >= maxClicks) return;

    clickCount++;
    item.clickNumbers.push(clickCount);
    clickHistory.push(item);

    updateItemDisplay(item);
    saveToStorage();
  });
});

// ---- AKTUALIZACJA WYŚWIETLANIA ----
function updateItemDisplay(item) {
  item.innerHTML = '';

  const arrow = document.createElement('div');
  arrow.classList.add('arrow-number');

  let icon = '';

  if (item.classList.contains('item-top')) {
    icon = '<i class="bi bi-arrow-down-short"></i>';
    arrow.innerHTML = item.clickNumbers.join(',') + '<br>' + icon;
  } else if (item.classList.contains('item-bottom')) {
    icon = '<i class="bi bi-arrow-up-short"></i>';
    arrow.innerHTML = icon + '<br>' + item.clickNumbers.join(',');
  } else if (item.classList.contains('item-left')) {
    icon = '<i class="bi bi-arrow-right-short"></i>';
    arrow.innerHTML = item.clickNumbers.join(',') + icon;
  } else {
    icon = '<i class="bi bi-arrow-left-short"></i>';
    arrow.innerHTML = icon + item.clickNumbers.join(',') + '<br>';
  }

  item.appendChild(arrow);
}

// ---- COFNIĘCIE OSTATNIEGO KLIKNIĘCIA ----
function undoLastClick() {
  if (clickHistory.length === 0) return;

  const lastItem = clickHistory.pop();
  const popped = lastItem.clickNumbers.pop(); // usuwamy ostatni numer
  // Jeżeli z różnych powodów pop zwrócił undefined, upewnij się, że clickCount > 0
  if (clickCount > 0) clickCount--;

  if (lastItem.clickNumbers.length === 0) {
    lastItem.innerHTML = '';
  } else {
    updateItemDisplay(lastItem);
  }

  saveToStorage();
}

// ---- RESET KLIKNIĘĆ ----
function resetClicks() {
  clickCount = 0;
  clickHistory.length = 0;
  items.forEach(item => {
    item.clickNumbers = [];
    item.innerHTML = '';
  });

  localStorage.removeItem('clickData');
}

// ---- Uruchom wczytanie danych przy starcie ----
loadFromStorage();
