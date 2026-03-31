// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname))); // لخدمة ملفات HTML والفيديو

// 🔑 ضع هنا مفتاح API و CX الصحيحين
const API_KEY = 'AIzaSyB9yFmhBDxE7o1_VIKu57ijGHnMUFhvP6c';
const CX = '012345678901234567890:abcdefg1234'; // CX الصحيح

// نقطة نهاية البحث
app.get('/search', async (req, res) => {
  const query = req.query.q;
  if(!query) return res.status(400).json({ error: 'Empty query' });

  try{
    const response = await fetch(`https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${API_KEY}&cx=${CX}`);
    const data = await response.json();
    res.json(data);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
});

// تشغيل السيرفر
const PORT = 3000;
app.listen(PORT, ()=> console.log(`Server running on http://localhost:${PORT}`));
