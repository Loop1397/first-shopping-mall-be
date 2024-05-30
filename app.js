const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const indexRouter = require('./routes/index');

require("dotenv").config()
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

// req.body를 json객체로 인식하게 만들기 위한 설정
app.use(bodyParser.json());

app.use('/api', indexRouter);

// 로컬 테스트용
// const mongoURI = process.env.LOCAL_DB_ADDRESS;

// 실사용 용
const mongoURI = process.env.MONGODB_URI_PROD;

mongoose.connect(mongoURI, {useNewUrlParser: true, dbName:'first-shopping-mall'})
    .then(() => console.log("mongoose connected!"))
    .catch((error) => console.log("#########################DB connection fail!!########################", error));

app.listen(process.env.PORT || 5000, () => {
    console.log('SERVER ON');
});