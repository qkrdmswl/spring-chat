import React, { useState } from 'react'
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
import { Container, Form, Row, Col } from 'react-bootstrap';

//antd
import { UploadOutlined } from '@ant-design/icons';
import { Space, Upload } from 'antd';

const DiaryCreate = () => {
  //다이어리 날짜  
  const [startDate, setStartDate] = useState(new Date());

  //다이어리 title과 content
  const [diaryContent, setDiaryContent] = useState({
    title: '',
    content: ''
  })

  //다이어리 어레이 값으로 넘겨주기
  const [viewContent, setViewContent] = useState([]);


  //event가 생기면 값을 받아오는 것
  const getValue = (event) => {
    const { name, value } = event.target;
    setDiaryContent({
      ...diaryContent,
      [name]: value
    })
  }


  const onSubmit = (event) => {
    event.preventDefault();
    // setViewContent(viewContent.concat({...diaryContent}))
    setViewContent((viewContent) => [diaryContent, ...viewContent]);
    console.log(viewContent)
  }







  return (
    <div>
      <Container>
        <Col>
          <Row className="mt-3"> <h2>일기 작성</h2></Row>

          <Row>
            <Col lg={9}><DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /></Col>
            {/* <DatePicker defaultValue={moment({startDate}, dateFormat)} format={dateFormat} /> */}
          
          </Row>

          <Row>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="diaryCreateTitle">
                <Form.Control name='title' type="text" placeholder="제목" onChange={getValue} />
              </Form.Group>

              <CKEditor
                editor={ClassicEditor}
                // config={{editorConfiguration,
                // placeholder: "내용을 입력하세요."}}
                config={{
                  removePlugins: ["EasyImage", "ImageUpload", "MediaEmbed", "Table", "TableToolbar", "BlockQuote"],
                  placeholder: "내용을 입력하세요."
                }}

                onReady={editor => {
                  console.log('Editor is ready to use!', editor);

                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setDiaryContent({
                    ...diaryContent,
                    content: data
                  })

                }}
                onBlur={(event, editor) => {
                  //   console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  //   console.log('Focus.', editor);
                }}
              />
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
              </Upload>

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