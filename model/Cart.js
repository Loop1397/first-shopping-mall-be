const mongoose = require('mongoose');
const User = require('./User');
const Product = require('./Product');
const Schema = mongoose.Schema;
const CartSchema = Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: User,
        required:true
    },
    items: [
        {
            productId: {
                type:mongoose.Schema.Types.ObjectId,
                ref: Product,
                required:true
            },
            size: {
                type:String,
                required:true
            }, 
            // qty(quantity) : 구매 수량
            qty: {
                type:Number,
                default: 1
            },
        }
    ],
}, {timestamps: true});

// response를 반환할 때 자동으로 실행되는 메소드
CartSchema.methods.toJSON = function () {
    const obj = this._doc
    delete obj.__v;
    delete obj.updateAt;
    delete obj.createAt;
    return obj;
}

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;