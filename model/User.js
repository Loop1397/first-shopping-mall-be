const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = Schema({
    email: {
        type:String,
        require:true,
        unique:true
    },
    password: {
        type:String,
        require:true
    },
    name: {
        type:String,
        require:true
    },
    // 유저 권한 컬럼
    level: {
        type:String,
        default:"customer" // 2types: customer, admin
    }
}, {timestamps: true});

// response를 반환할 때 자동으로 실행되는 메소드
userSchema.methods.toJSON = function () {
    const obj = this._doc
    delete obj.password;
    delete obj.__v;
    delete obj.updateAt;
    delete obj.createAt;
    return obj;
}

const User = mongoose.model("User", userSchema);

module.exports = User;