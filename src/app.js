const express = require('express')

const app = express() //express는 함수 형식이므로 변수에 할당해줌으로써 사용

app.get('', (req,res )=>{
    res.send("hello world") //클라이언트 (브라우저)에 전달됨
}) //1 param에 해당하는 곳에 유저가 들어온다면 2nd의 함수에서 처리

app.get('/help', (req,res) =>{
    res.send("help page")
})

app.get('/about', (req, res) =>{
    res.send("about page")
})

app.get('/weather', (req, res) =>{
    res.send('weather page')
})

app.listen(3000, () => {
    console.log("server is up") //이 메시지는 서버 사이드에서만 보임 
}) //서버를 열어서 클라이언트를 기다림, 2nd의 콜백은 optional