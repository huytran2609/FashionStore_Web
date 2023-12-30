const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: { type: mongoose.Types.ObjectId, ref: 'Product' },
                quantity: Number,
                color: String,
            },
        ],
        status: {
            type: String,
            default: 'Processing',
            enum: ['Cancelled', 'Processing', 'Succeed'],
        },
        orderBy: {
            userId: {type: mongoose.Types.ObjectId, ref: 'User'},
            name: String,
            address: String,
        },
        coupon: {
            type: mongoose.Types.ObjectId,
            ref: 'Coupon',
        },
        totalPrice: Number,
    },
    {
        timestamps: true,
    },
);

//Export the model
module.exports = mongoose.model('Order', orderSchema);
