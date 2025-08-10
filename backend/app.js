const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/uploads', express.static('uploads'));
app.use('/api/loan', require('./routes/loan'));
app.use('/api/loan', require('./routes/loan'));




mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);


app.listen(4000, () => console.log("Server running on http://localhost:4000"));
