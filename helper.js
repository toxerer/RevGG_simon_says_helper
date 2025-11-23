let clickCount = 0;
const maxClicks = 8; // maksymalna liczba kliknięć

document.querySelectorAll('.circle .item').forEach((item) => {
  // Każdy kwadrat przechowuje własną tablicę kliknięć
  item.clickNumbers = [];

  item.addEventListener('click', () => {
    // Jeśli przekroczono maksymalną liczbę kliknięć, przerywamy
    if (clickCount >= maxClicks) return;

    clickCount++;
    item.clickNumbers.push(clickCount);

    // Czyścimy poprzednie wyświetlenia numerów
    item.innerHTML = '';

    // Tworzymy div z numerami, oddzielone przecinkami
    const arrow = document.createElement('div');
    arrow.classList.add('arrow-number');

    var icon = '';

    if (item.classList.contains('item-top')) {
      icon = '<i class="bi bi-arrow-down-short"></i>';
      arrow.innerHTML = item.clickNumbers.join(', ') + '<br>' + icon;
    }
    else if (item.classList.contains('item-bottom')) {
      icon = '<i class="bi bi-arrow-up-short"></i>';
      arrow.innerHTML = icon + '<br>' + item.clickNumbers.join(', ');
    }
    else if (item.classList.contains('item-left')) {
      icon = '<i class="bi bi-arrow-right-short"></i>';
      arrow.innerHTML = item.clickNumbers.join(', ') + icon;
    }
    else {
      icon = '<i class="bi bi-arrow-left-short"></i>';
      arrow.innerHTML = icon + item.clickNumbers.join(', ') + '<br>';
    }

    item.appendChild(arrow);
  });
});

// Funkcja resetująca
function resetClicks() {
  clickCount = 0;
  document.querySelectorAll('.circle .item').forEach(item => {
    item.clickNumbers = [];
    item.innerHTML = '';
  });
}
