const express = require('express')

const app = express() //express는 함수 형식이므로 변수에 할당해줌으로써 사용

app.get('', (req,res )=>{
    res.send("<h1>hello world</h1>") //클라이언트 (브라우저)에 전달됨, 익스프레스가 자동적으로 이를 html로 인식하여 전달
}) //1 param에 해당하는 곳에 유저가 들어온다면 2nd의 함수에서 처리

app.get('/help', (req,res) =>{
    res.send([{
        name: 'andrew',
        age : 29
    }] , {
        name : "lee",
        age: 24
    })  //json데이터도 전달할 수 있음. 익스프레스가 이를 자동적으로 stringify하여 전달, json은 배열의 형식으로도 표현 가능 
})

app.get('/about', (req, res) =>{
    res.send("<h1>about page</h1>")
})

app.get('/weather', (req, res) =>{
    res.send({
        forcast : 50,
        location : 'seoul'
    })
})

app.listen(3000, () => {
    console.log("server is up") //이 메시지는 서버 사이드에서만 보임 
}) //서버를 열어서 클라이언트를 기다림, 2nd의 콜백은 optional