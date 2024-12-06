// ui.js

/**
 * Показать уведомление на экране.
 * @param {string} message - Текст сообщения.
 * @param {string} type - Тип уведомления: 'success', 'error', 'info'
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
  
    document.body.appendChild(notification);
  
    // Автоматически скрываем уведомление через 3 секунды
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  
  /**
   * Показать список лотерей на главной странице.
   * @param {Array} lotteries - массив лотерей [{id, name, jackpot, timeLeft}, ...]
   * Предполагается, что у вас есть контейнер .cards для отображения карточек лотерей.
   */
  function renderLottoList(lotteries) {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = ''; // очистим предыдущий список, если был
  
    lotteries.forEach(lotto => {
      const card = document.createElement('div');
      card.className = 'card';
      
      const title = document.createElement('h3');
      title.textContent = lotto.name;
      card.appendChild(title);
      
      const jackpot = document.createElement('p');
      jackpot.textContent = `Джекпот: ${lotto.jackpot}`;
      card.appendChild(jackpot);
      
      const timeLeft = document.createElement('p');
      timeLeft.textContent = `До розыгрыша: ${lotto.timeLeft}`;
      card.appendChild(timeLeft);
  
      const buyBtn = document.createElement('button');
      buyBtn.textContent = 'Купить билет';
      buyBtn.addEventListener('click', () => {
        // Логика покупки билета будет в main.js, но можно просто вызвать некую функцию
        // buyLottoTicket(lotto.id, 1) - здесь нельзя напрямую, так как это часть логики.
        // Мы можем сделать событие и потом обработать его в main.js
        const event = new CustomEvent('buyLottoTicket', { detail: { lotteryId: lotto.id }});
        document.dispatchEvent(event);
      });
      card.appendChild(buyBtn);
  
      cardsContainer.appendChild(card);
    });
  }
  
  /**
   * Обновить информацию о пользователе на странице профиля.
   * @param {Object} userProfile - объект с данными пользователя {name, balance, ticketsCount,...}
   */
  function updateUserProfileUI(userProfile) {
    const profileContainer = document.querySelector('.profile-section');
    if (!profileContainer) return; // если страница профиля отсутствует
    
    // Предположим, что у нас есть элементы с классами .user-name и .user-balance
    const userNameEl = profileContainer.querySelector('.user-name');
    const userBalanceEl = profileContainer.querySelector('.user-balance');
  
    if (userNameEl) userNameEl.textContent = userProfile.name;
    if (userBalanceEl) userBalanceEl.textContent = `Баланс: $${userProfile.balance}`;
  }
  
  /**
   * Показать индикатор загрузки.
   */
  function showLoader() {
    let loader = document.querySelector('.loader');
    if (!loader) {
      loader = document.createElement('div');
      loader.className = 'loader';
      loader.textContent = 'Загрузка...';
      document.body.appendChild(loader);
    }
  }
  
  /**
   * Скрыть индикатор загрузки.
   */
  function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) loader.remove();
  }
  
  export { showNotification, renderLottoList, updateUserProfileUI, showLoader, hideLoader };
  