console.log("client side js file is loaded") //개발자 도구의 console에 출력


const weatherForm = document.querySelector('form')  //html 문서 중에서 파라미터에 해당하는 컴포넌트 중에 가장 첫번쨰 컴포넌트를 핸들링 할 수 있게 됨. 이를 통해 form tag를 핸들링 가능 
const search = document.querySelector('input')
const mesg1 = document.querySelector('#mesg1')
const mesg2 = document.querySelector('#mesg2')
//document.querySelector('.classname')

mesg1.textContent = "from javascript" //해당하는 컴포넌트에 텍스트를 삽입함
mesg2.textContent = ""

weatherForm.addEventListener('submit', (e) =>{  //1st param : 이벤트 이름 , 2nd param : 이벤트 마다 실행될 콜백 
    e.preventDefault() //html form태그는 submit하면 페이지가 바로 refresh됨 이렇게 되면 기존의 정보도 다 지워지는것이 default behavior임 따라서 콜백함수에서 preventDefault 함수를 이용해서 리프레시 방지
    const location = search.value //인풋에 들어있는 값을 반환
    if(location)
    {
        mesg1.textContent = "로딩중입니다"
        mesg2.textContent = ""
        fetch("/weather?location="+location).then((response)=>{ //사용자가 인풋으로 입력한 값을 fetch에 호출할 API의 URL에 넣어주면서 결과를 얻어냄, url은 로컬로 호스팅할 떄랑 헤로쿠로 서버 배포할 떄랑 달라야하니까 현재 url을 기준으로 뒤에 것만 concate할 수 있도록 /~~ 형식으로 써줌   
        response.json().then(({error, location, forcast})=>{   //fetch에서 가져온 것을 json형식에서 js object의 형태로 파싱해서 다음 콜백 함수를 실행함
            if(error){
                mesg1.textContent = error
            }else
            {
                mesg1.textContent = location
                mesg2.textContent = forcast
            }
        })
        })
    }
})

