require('dotenv').config();
const express = require('express');
const contactRouter = require('./routes/contact');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(contactRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
