
import {React,useState} from 'react'
import Navigation from '../component/Navigation'
import { Routes, Route ,Link} from "react-router-dom";
import {useLocalStorage,getStorageItem}  from '../utils/useLocalStorage';
import { Container, Row, Col, Button } from 'react-bootstrap';

import ReactApexChart from "react-apexcharts"; 

const Main = () => {
  const [k,setK]= useState("");
  const [value, onChange] = useState(new Date());

  //오늘 날짜 가져오기
  let now = new Date();
  let todayYear = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let todayDate = now.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let dayOfweek = week[now.getDay()];


  //현재 날짜 기준으로 근 7일간
  const donutData = {
    series: [2, 1, 2, 1, 1, 0],
    options: {
      chart: {
        type: 'donut',
      },
      legend: {
        position: 'right'
      },
      // responsive: [{
      //   breakpoint: 480,
      // }],
      // plotOptions: {
      //   pie: {
      //     donut: {
      //       // hollow: {  
      //       //   margin: 15,
      //       //   size: '70%',
      //       //   image: '../../css/images/a-icon.jpg',
      //       //   imageWidth: 64,
      //       //   imageHeight: 64,
      //       //   imageClipped: false
      //       // },
      //     }
      //   }
      // },
      labels: ["기쁨", "슬픔", "화남", "상처", "불안" ,"당황"]
      // title: {
      //   text: '이벤트별 통계',
      //   align: 'center'
      // },
    },
  }


  return (
    <div>
      <Navigation />
      <Container>
        <Col className="body">
          <Row>
            <p>{todayYear}년 {todayMonth}월 {todayDate}일 {dayOfweek}요일
              | 서울 18.0 대체로 청명함</p>
            {/* 사용자가 설정한 위치로 날씨 보여주기 */}
          </Row>

          <Row className='box'>
            <Col>
              <h4>이딘두님, 오늘 하루 어떠셨나요? 일상을 기록하고 근사한 밤을 보내세요</h4>
              <Button>일기 쓰러가기</Button>
            </Col>
            <Col className='bannerImage'>
              <img src="" />
            </Col>
          </Row>

          <Row>
            {/* 프롤로그 내용 누르면 상세페이지로 이동*/}
            <Col>
              <h3>Prologue✨</h3>
              <Row className='box'>
                <Col>
                  <h5>제목부분</h5>
                  <p>상세내용 미리보기</p>
                  <p>날짜</p>
                </Col>
                <Col>
                  <h5>제목부분</h5>
                  <p>상세내용 미리보기</p>
                  <p>날짜</p>
                </Col>
                <Col>
                  <h5>제목부분</h5>
                  <p>상세내용 미리보기</p>
                  <p>날짜</p>
                </Col>
              </Row>
            </Col>

            <Col>
              <h3>최근 나의 흔적</h3>
                <Col className='box'>
                  <Row>
                    <Col>        
                    <ReactApexChart
                      options={donutData.options}
                      series={donutData.series}
                      type="donut"
                      width="400"
                    />
                    </Col>
                    <Col>퍼센테이지</Col>
                  </Row>
                </Col>
              </Col>
            </Row>
          <Col>


          </Col>

        </Col>

      </Container>
    </div>
  )
}


export default Main