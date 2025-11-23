let clickCount = 0;
const maxClicks = 8; // maksymalna liczba kliknięć
const clickHistory = []; // historia kliknięć w kolejności

document.querySelectorAll('.circle .item').forEach((item) => {
  item.clickNumbers = [];

  item.addEventListener('click', () => {
    if (clickCount >= maxClicks) return;

    clickCount++;
    item.clickNumbers.push(clickCount);
    clickHistory.push(item); // zapisujemy, który element był kliknięty

    updateItemDisplay(item);
  });
});

// Funkcja aktualizująca wyświetlanie numerów + ikon
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

// Cofnięcie ostatniego kliknięcia
function undoLastClick() {
  if (clickHistory.length === 0) return;

  const lastItem = clickHistory.pop();
  lastItem.clickNumbers.pop(); // usuwamy ostatni numer
  clickCount--;

  if (lastItem.clickNumbers.length === 0) {
    lastItem.innerHTML = '';
  } else {
    updateItemDisplay(lastItem);
  }
}

// Reset wszystkich kliknięć
function resetClicks() {
  clickCount = 0;
  clickHistory.length = 0;
  document.querySelectorAll('.circle .item').forEach(item => {
    item.clickNumbers = [];
    item.innerHTML = '';
  });
}

