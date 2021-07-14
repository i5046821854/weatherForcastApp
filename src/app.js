const path = require('path') 
const express = require('express')
const hbs = require('hbs')

const app = express() //express는 함수 형식이므로 변수에 할당해줌으로써 사용

//동적으로 웹페이지 만들때
const viewsPath = path.join(__dirname, '../phony/views') //hbs 파일들이 들어있는 폴더 이름을 views라고 말고 다른 값으로 변경하고 싶을 때, (default는 views폴더여서 views를 계속 쓸 경우에는 path.join이랑 app set 두번째 구문 써줄 필요 x)
app.set('view engine','hbs')  //handlebar setup
app.set('views', viewsPath) //views의 경로를 viewPaht의 주소로 지정하겠다

//페이지마다 반복되는 헤더, 푸터 등의 요소를 정의하기 위한 코드
const partialsPath = path.join(__dirname, '../phony/partials')
hbs.registerPartials(partialsPath)


// //정적으로 웹페이지 만들 떄
// console.log(__dirname) //현재 디렉토리 path
// console.log(path.join(__dirname, '../public')) //path 여러개를 병합해서 표현가능
// //console.log(__filename) //현재 파일의 path
// /*indexhtml.html에 접근하기 위해서는 절대 경로가 필요함
// 이때 우리는 __dirname을 이용해서 접근 가능하거나 "path" core module사용*/
app.use(express.static(path.join(__dirname, '../public'))) //express.static: 나타내고 싶은 파일이 들어있는 폴더의 경로를 받고, 이를 app.use에서 사용할 수 있도록 반환해줌 

app.get('', (req, res)=>{
    res.render('index', {
        title: 'weather app',
        name: 'lee'
    })  //view를 render해줌 , 확장자 써줄 필요 없음, 1st param: 랜더링할 뷰의 이름 / 2nd param: 뷰에 전달할 값  
})

/*app.get('', (req,res )=>{      //얘는 위에 app.use(express.static(path.join(__dirname, '../public')))에 의해 접근되므로 사용되지 않음 (express는 route에 맞는 것을 찾으면 더이상 탐색 안하기 때문)
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
})*/

app.get('/help', (req,res) =>{
    res.render("help", {
        title: 'help',
        name: 'lee'
    })
})

app.get('/help/*', (req,res) =>{  //help페이지의 하위 페이지에서 404띄우는 법
    res.render("error", {
        title: 'help',
        name: 'lee',
        errorName: 'help article'
    })
})


app.get('/about', (req, res) =>{
    res.render('about', {
        title:"about",
        content: 'this is about page',
        name: 'lee'
    })
})

app.get('/weather', (req, res) =>{
    res.send([{
        name: 'andrew',
        age : 29
    }] , {
        name : "lee",
        age: 24
    })  //json데이터도 전달할 수 있음. 익스프레스가 이를 자동적으로 stringify하여 전달, json은 배열의 형식으로도 표현 가능 

})

app.get('*', (req, res) =>{ //1st  param => *으로 하면 모든 라우트를 핸들
    res.render("error", {
        title: 'help',
        name: 'lee',
        errorName: 'Page'
    })
})

app.listen(3000, () => {
    console.log("server is up") //이 메시지는 서버 사이드에서만 보임 
}) //서버를 열어서 클라이언트를 기다림, 2nd의 콜백은 optional