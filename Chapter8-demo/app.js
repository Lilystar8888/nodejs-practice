//引入套件
const express = require('express');
const session = require('express-session');
const path = require('path');

//express server
const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());   

//Middleware

//掛上ejs樣板
app.set("view engine", "ejs");


//掛上靜態資源
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname, "public")));

app.use(
    session({
        secret: 'loginpracticetest',
        resave: true,
        saveUninitialized: true,
        name: "login",
        cookie: {
            maxAge: 10 * 60 * 1000 //十分鐘
        }
    })
);

//啟動server
app.listen(3000, ()=>{
    console.log(`Sever is listening on part: 3000`);
});

//login渲染
app.get('/', (req,res)=>{
    //預設session
    const user = 'Guest';
    req.session.account = user;
    res.render("login.ejs", {
        title: "TMC 商城",
        userName: user
    });
});

//登入post api
app.post('/login', (req,res)=>{
    //取得帳號密碼
    const account = req.body.account;
    const password = req.body.password;

    //帳號密碼的驗證
    if(account === 'michael' && password === '123'){
        req.session.account = account;
        res.render("index.ejs", {
            title: "TMC 商城",
            userName: req.session.account
        });
    }else{
        res.send('登入失敗,請重新登入!')
    }
});

//登出get api
app.get('/logout',(req,res)=>{
    delete req.session.account;
    res.redirect('/');
});