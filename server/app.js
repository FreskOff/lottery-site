const express = require('express');
const path = require('path');

const app = express();

// Раздача статических файлов frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Для всех не найденных API маршрутов отдать index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
