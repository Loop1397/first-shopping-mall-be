const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');
const Schema = mongoose.Schema;
const OrderSchema = Schema({
    shipTo: {
        type:Object,
        required: true
    },
    contact: {
        type:Object,
        required: true
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: User,
        required:true
    },
    totalPrice: {
        type:Number,
        required: true,
        default: 0
    },
    status: {
        type:String,
        require: true
    },
    orderItems: [
        {
            productId: {
                type:mongoose.Schema.Types.ObjectId,
                ref: Product,
                required:true
            },
            // qty(quantity) : 구매 수량
            qty: {
                type:Number,
                default: 1
            },
            size: {
                type:String,
                required:true
            }, 
            price: {
                type:Number,
                required: true
            },
        }
    ],
}, {timestamps: true});

// response를 반환할 때 자동으로 실행되는 메소드
OrderSchema.methods.toJSON = function () {
    const obj = this._doc
    delete obj.__v;
    delete obj.updateAt;
    delete obj.createAt;
    return obj;
}

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;