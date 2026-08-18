const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Error:', err));

const buyerSchema = new mongoose.Schema({
  username: String,         
  lucifer_username: String 
});

const Buyer = mongoose.model('buyer_sc', buyerSchema, 'buyer_sc');

app.get('/api/verify-license', async (req, res) => {
  const { username, lucifer_username } = req.query;

  try {
    const user = await Buyer.findOne({ username: username });

    if (!user) {
      return res.send("username not found");
    }
    
    if (user.lucifer_username !== lucifer_username) {
      return res.send("lucifer wrong");
    }

    res.send("success");

  } catch (error) {
    res.send("error");
  }
});

module.exports = app;