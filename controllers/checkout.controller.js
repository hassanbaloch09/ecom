const db = require("../models");
const Checkout = db.checkout;


function calculateDeliveryCharge(productValue) {
    return productValue < 750
      ? 50
      : productValue < 1200
        ? 40
        : productValue < 1500
          ? 30
          : 0;
  }
 
exports.createCheckout = async (req, res) => {
    try {
        const {id}=req.user
        const user_id=id
        const {items, total_price,category} = req.body;
        const delivery_charge=calculateDeliveryCharge(total_price)
        const pay_able_amount=total_price+delivery_charge
        const newCheckout = await Checkout.create({
            user_id,
            items,
            total_price,
            delivery_charge,
            pay_able_amount,
        });
        res.status(201).json(newCheckout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllCheckouts = async (req, res) => {
    try {
        const user_id  = req.user.id;
        const checkouts = await Checkout.findAll({
            where: { user_id: user_id },
        });
        res.status(200).json(checkouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCheckoutById = async (req, res) => {
    try {
        const checkoutId = req.params.id;
        const checkout = await Checkout.findByPk(checkoutId);

        if (!checkout) {
            return res.status(404).json({ error: 'Checkout not found' });
        }

        res.status(200).json(checkout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a checkout by ID
exports.updateCheckoutById = async (req, res) => {
    try {
        const { checkoutId } = req.params;
        const { user_id, items, totalPrice, delivery_charge, pay_able_amount } = req.body;

        const existingCheckout = await Checkout.findByPk(checkoutId);

        if (!existingCheckout) {
            return res.status(404).json({ error: 'Checkout not found' });
        }

        // Update the checkout details
        existingCheckout.user_id = user_id;
        existingCheckout.items = items;
        existingCheckout.totalPrice = totalPrice;
        existingCheckout.delivery_charge = delivery_charge;
        existingCheckout.pay_able_amount = pay_able_amount;

        // Save the changes
        await existingCheckout.save();

        res.status(200).json(existingCheckout);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a checkout by ID
exports.deleteCheckoutById = async (req, res) => {
    try {
        const checkoutId= req.params.id;
        const deletedCheckout = await Checkout.destroy({ where: { id: checkoutId } });

        if (!deletedCheckout) {
            return res.status(404).json({ error: 'Checkout not found' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
