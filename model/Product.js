const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = Schema({
    // sku(Stock Keeping Unit): 재고 관리 코드
    sku: {
        type:String,
        required:true,
        unique:true
    },
    name: {
        type:String,
        required:true
    },
    image: {
        // 이미지 주소만 저장할거기에 String
        type:String,
        required:true
    },
    category: {
        type:Array,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    stock: {
        type:Object,
        required:true
    },
    status: {
        type:String,
        default:"active"
    },
    isDelete: {
        type:Boolean,
        default:false
    },
}, {timestamps: true});

// response를 반환할 때 자동으로 실행되는 메소드
productSchema.methods.toJSON = function () {
    const obj = this._doc
    delete obj.__v;
    delete obj.updateAt;
    delete obj.createAt;
    return obj;
}

const Product = mongoose.model("Product", productSchema);

module.exports = Product;