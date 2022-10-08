import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Navigation from '../component/Navigation'
import { Routes, Route, Link } from "react-router-dom";

//datepicker 불러오기
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

//editer 불러오기
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//부트스트랩
import { Container, Form, Row, Col} from 'react-bootstrap';

//1. datePicker 기능 찾아서 넣기 ✅
//2. 날짜, editer data(텍스트, 이미지) 값이 잘 있는지 확인필요 -> 이미지 업로드는 아직 잘 모르겠음.
//3. 값 받아서 제목, 날짜, 내용 상세내용에 나타내기 -> 
//4. 백엔드 부분 연결 시키기

const DiaryCreate = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [diaryContent, setDiaryContent] = useState({
      title:'',
      content:''
    })
    
    const[viewContent, setViewContent] = useState([]);


    //event가 생기면 값을 받아오는 것
    const getValue =(event)=>{
      const {name, value} = event.target;
      setDiaryContent({
        ...diaryContent,
        [name]:value
      })
    }

    const onSubmit =(event)=> {
      event.preventDefault();
      // setViewContent(viewContent.concat({...diaryContent}))
      setViewContent((viewContent)=> [diaryContent, ...viewContent]);
      console.log(viewContent)
    }
  
    return (
    <div>
      <Navigation />
      <Container>
        <Col>
          <Row className="mt-3"> <h2>일기 작성</h2></Row>

          <Row>
            <Col lg={1}>일기날짜</Col>
            <Col lg={9}><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></Col>
            </Row>

          <Row>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="diaryCreateTitle">
              <Form.Control name='title' type="text" placeholder="제목" onChange={getValue}/>
            </Form.Group>

            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: "내용을 입력하세요.",
            }}
              onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);

              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDiaryContent({
                  ...diaryContent,
                  content:data
                }) 

              }}
              onBlur={(event, editor) => {
              //   console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
              //   console.log('Focus.', editor);
              }}
            />
            <div className='mt-3'>
            <Link to="/diary-detail"><Button type="submit" variant="info">저장</Button></Link>
            {/* <Button type="submit" variant="info">저장</Button> */}
            <Link to="/diary-list"><Button variant="info">취소</Button></Link>
            </div>
          </Form>
          </Row>
        </Col>

      </Container>
    </div>

  )
}

export default DiaryCreate