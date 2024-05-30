const express = require('express');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

const userController = {};

userController.createUser = async (req, res) => {
    try {
        const { email, password, name, level } = await req.body;
        console.log(email, password, name);
        const user = await User.findOne({email});

        if(user) {
            throw new Error("이미 존재하는 유저 이메일입니다!");
        }

        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            level: level ? level:'customer'
        });
        await newUser.save();

        return res.status(200).json({
            status: 'success',
            user: newUser  
        });

    } catch(error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        });
    }
}

userController.sayhello = async (req, res) => {
    console.log('HI!!!');
}

module.exports = userController;