const db = require("../models");
const Payment = db.payment;
const User = db.users;
const crypto = require('crypto');
const razorpay = require('../service/razorpay');


exports.payment = async (req, res) => {
    try {
        const { amount, currency } = req.body
        const options = {
            amount: amount * 100,
            currency: currency,
            receipt: 'order_receipt_' + Date.now(),
        };

        const order = await razorpay.orders.create(options);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.validateOrder = async (req, res) => {
    try {
        const { id,full_name } = req.user;
        const {razorpay_order_id, razorpay_signature, razorpay_payment_id,amount } = req.body;

        const alreadyVerified = await Payment.findOne({
            where: { razorpay_order_id, razorpay_payment_id }
        });

        if (alreadyVerified) {
            throw new Error("Payment already verified successfully");
        }

        // const subscriptionDurationMs = getSubscriptionDurationInMilliseconds(planDesc);

        // const updatedUserData = {
        //     subscriptionStart: new Date(),
        //     subscriptionEnd: new Date(Date.now() + subscriptionDurationMs),
        //     trialStart: null
        // };

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            throw new Error("razorpay_signature, razorpay_payment_id, and razorpay_order_id are required");
        }

        const userData = await User.findByPk(id);

        if (!userData) {
            return res.status(404).json({ error: "User not found" });
        }


        const sha = crypto.createHmac("sha256", process.env.ROZAYERPAY_SECRETE_KEY);
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");

        let newPaymentRef;

        if (digest !== razorpay_signature) {
            newPaymentRef = await Payment.create({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                user_name:full_name,
                user_id:id,
                status: "failed",
                amount
            });

            return res.status(400).send({ message: "Transaction is not legit" });
        }

        newPaymentRef = await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            user_name:full_name,
            user_id:id,
            status: "success",
            amount
        });

        // const updatedUserDetails = await User.update(updatedUserData, {
        //     where: { id},
        //     returning: true
        // });

        // if (!updatedUserDetails[1][0]) {
        //     return res.status(500).json({ error: "Failed to update user details" });
        // }

        res.status(200).send({
            message: "success",
            newPaymentRef
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getTransactionList = async (req, res) => {
    try {
        const transactionsList = await Payment.findAll();
        res.status(200).json(transactionsList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getSuccessfulTransactions = async (req, res) => {
    try {
        const successfulTransactions = await Payment.findAll({
            where: { status: 'success' },
        });
        res.status(200).json({ success: true, data: successfulTransactions });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getFailedTransactions = async (req, res) => {
    try {
        const failedTransactions = await Payment.findAll({
            where: { status: 'failed' },
        });
        res.status(200).json({ success: true, data: failedTransactions });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getTransactionByID = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const paymentData = await Payment.findByPk(paymentId);

        if (!paymentData) {
            return res.status(404).json({ error: "Transaction info not found" });
        }

        res.status(200).json({ transactionInfo: paymentData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
