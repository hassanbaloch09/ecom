const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id:process.env.ROZAYERPAY_KEY_ID,
  key_secret: process.env.ROZAYERPAY_SECRETE_KEY,
});

module.exports = razorpay;
