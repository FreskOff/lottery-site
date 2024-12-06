// server/app.js
const express = require('express');
const path = require('path');

const app = express();

// Статические файлы - раздача фронтенда
app.use(express.static(path.join(__dirname, '../frontend')));

// Подключаем роуты (пример):
// const authRoutes = require('./routes/auth');
// app.use('/auth', authRoutes);

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
