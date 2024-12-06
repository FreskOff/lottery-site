document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        // Логика авторизации
        alert('Здесь будет логика авторизации через Telegram');
      });
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const navUl = document.querySelector('nav ul');
    if (burger && navUl) {
      burger.addEventListener('click', () => {
        navUl.classList.toggle('show');
      });
    }
  });
  // Кастомный курсор
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Меняем курсор при наведении на кликабельные элементы
document.querySelectorAll('a, button, .card button, .auth-btn button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    document.body.classList.add('clickable');
  });
  el.addEventListener('mouseleave', () => {
    document.body.classList.remove('clickable');
  });
});

// Параллакс hero по движению мыши
const hero = document.querySelector('.hero');
const heroBg = hero ? hero.querySelector('::before') : null; 
// Псевдоэлементы нельзя получить напрямую через querySelector,
// поэтому мы сделаем другой трюк: будем двигать сам hero
// или используем переменные CSS.

let heroBefore = document.querySelector('.hero');
document.addEventListener('mousemove', (e) => {
  if (!heroBefore) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  // Вместо псевдоэлемента, сместим фон через transform hero::before с помощью CSS custom properties

  heroBefore.style.setProperty('--hero-translate-x', x + 'px');
  heroBefore.style.setProperty('--hero-translate-y', y + 'px');
});
