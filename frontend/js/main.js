// Указываем, что это модульный скрипт!
// В index.html должно быть: <script type="module" src="./js/main.js"></script>

// Импортируем API и UI функции
import { getLottoList, buyLottoTicket } from './api.js';
import { showNotification, renderLottoList, showLoader, hideLoader } from './ui.js';

// Кастомный курсор (логика не зависит от DOMContentLoaded, можем сделать сразу)
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

// Параллакс hero
const heroBefore = document.querySelector('.hero');
document.addEventListener('mousemove', (e) => {
  if (!heroBefore) return;
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  heroBefore.style.setProperty('--hero-translate-x', x + 'px');
  heroBefore.style.setProperty('--hero-translate-y', y + 'px');
});

// Теперь один раз после загрузки DOM
document.addEventListener('DOMContentLoaded', async () => {
  // Логика для кнопки "Войти через Telegram"
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      // Логика авторизации
      alert('Здесь будет логика авторизации через Telegram');
    });
  }

  // Логика для бургер-меню
  const burger = document.querySelector('.burger');
  const navUl = document.querySelector('nav ul');
  if (burger && navUl) {
    burger.addEventListener('click', () => {
      navUl.classList.toggle('show');
    });
  }

  // Загружаем лотереи
  showLoader();
  try {
    const lotteries = await getLottoList();
    // renderLottoList(lotteries) - если реализуете эту функцию в ui.js и она выдаст кнопки "Купить билет"
    // убедитесь, что при их клике генерируется событие или вызывается функция
    // Например, можно в ui.js при создании кнопок "Купить билет" сделать addEventListener, 
    // и внутри dispatchEvent(new CustomEvent('buyLottoTicket', { detail: { lotteryId: ... } }));
    renderLottoList(lotteries);
  } catch (err) {
    showNotification('Ошибка при загрузке лотерей', 'error');
  } finally {
    hideLoader();
  }
});

// Слушаем пользовательское событие "buyLottoTicket" (если ui.js его генерирует)
document.addEventListener('buyLottoTicket', async (e) => {
  const { lotteryId } = e.detail;
  showLoader();
  try {
    await buyLottoTicket(lotteryId, 1);
    showNotification('Билет успешно куплен!', 'success');
    // Можно заново обновить список лотерей, если надо
    const lotteries = await getLottoList();
    renderLottoList(lotteries);
  } catch (err) {
    showNotification(`Ошибка: ${err.message}`, 'error');
  } finally {
    hideLoader();
  }
});

