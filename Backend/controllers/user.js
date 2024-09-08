const { default: axios } = require("axios");
const { validateAccountId } = require("../helpers/validation");
const User = require("../models/User");
const crypto = require("crypto");


exports.registerNumber = async (req, res) => {
  try {
    
    const accountId = crypto.randomBytes(19).toString('hex').slice(0, 25); // 25 characters long


    const checkAccountId = await User.findOne({ accountId });

    if (checkAccountId) {
      return res.status(400).json({
        message: "False",
      });
    } else {
      res.status(200).json({
        accountId: accountId,
      });
    }
  } catch (error) {
    console.error("Error registering number:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



exports.register = async (req, res) => {
  try {
    const accountId = req.body.AccountNum;
    console.log(accountId);

    if (!validateAccountId(accountId)) {
      return res.status(400).json({
        message: "Invalid Account.",
      });
    }

    const checkAccountId = await User.findOne({ accountId });

    if (checkAccountId) {
      return res.status(400).json({
        message: "Error",
      });
    } else {
      const token = 0;
      const user = new User({
        accountId,
        token,
        currentPayment: "0",
      });

      await user.save();

      res.send({
        accountId: user.accountId,
        token: user.token,
        createdAt: user.createdAt,
        message: "Success Registration",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





  exports.login = async (req, res) => {
    try {
     const accountId = req.body.accountNumber;
     const user = await User.findOne({accountId});
     if(!user){
      return res.status(400).json({message:"Bad Request"});
     } 
     res.send({
        accountId: user.accountId,
        token: user.token,
       createdAt: user.createdAt,
     });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };





  exports.getnewinvoice = async (req, res) => {
    const amount = req.body.amount;
    const user = req.body.finaluser;


if (amount === 15 || amount === 29 || amount === 59 || amount === 99 || amount === 199 && user) {
      const data = JSON.stringify({
        "price_amount": amount,
        "price_currency": "usd",
        "order_id": user,
        "order_description": "KitPat Balance" + amount,
        "success_url": "http://localhost:5173/search",
        "cancel_url": "http://localhost:5173/"
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.nowpayments.io/v1/invoice',
        headers: {
          'x-api-key': 'D3ZCGW6-X0SMXPX-GSQDC64-PEPJWTS',
          'Content-Type': 'application/json'
        },
        data: data
      };

      try {
        const response = await axios(config);
        console.log(response.data.id);
        
        await User.findOneAndUpdate({ accountId: user}, { currentPayment: response.data.id });
        res.json(response.data.invoice_url);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    }
  };