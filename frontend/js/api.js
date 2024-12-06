// api.js

/**
 * Получить данные профиля текущего пользователя.
 * Предполагается, что пользователь уже авторизован (сессия, токен и т.д.).
 */
async function getUserProfile() {
    const response = await fetch('/api/user/profile', {
      method: 'GET',
      credentials: 'include' // если нужно передавать куки или сессионные данные
    });
    
    if (!response.ok) {
      throw new Error('Ошибка при получении профиля пользователя');
    }
    
    return response.json();
  }
  
  /**
   * Купить билет для конкретной лотереи.
   * @param {string} lotteryId - ID лотереи
   * @param {number} count - количество билетов
   */
  async function buyLottoTicket(lotteryId, count) {
    const response = await fetch('/api/lotto/buy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ lotteryId, count })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Не удалось купить билет');
    }
    
    return response.json();
  }
  
  /**
   * Получить список доступных лотерей.
   */
  async function getLottoList() {
    const response = await fetch('/api/lotto/list', {
      method: 'GET',
      credentials: 'include'
    });
    
    if (!response.ok) {
      throw new Error('Ошибка при получении списка лотерей');
    }
    
    return response.json();
  }
  
  // Экспортируем функции, чтобы использовать их в других файлах
  export { getUserProfile, buyLottoTicket, getLottoList };
  